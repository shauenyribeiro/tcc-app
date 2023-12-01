import { useCallback, useState } from "react";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useRealm, useUser } from "@realm/react";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

import { LINE_HEIGHT_MULTIPLIER, Text } from "@components/Text";
import { Button } from "@components/Button";
import { NavButton } from "@components/NavButton";
import { DocumentsList, type Document } from "@components/Import/DocumentsList";
import { Release } from "@models/Release";

const monthNameToNumber = {
  JAN: 0,
  FEV: 1,
  MAR: 2,
  ABR: 3,
  MAI: 4,
  JUN: 5,
  JUL: 6,
  AGO: 7,
  SET: 8,
  OUT: 9,
  NOV: 10,
  DEZ: 11,
};

export default function Import() {
  const [files, setFiles] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const realm = useRealm();
  const user = useUser();
  const navigation = useNavigation();

  const handleFileSelection = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: true,
    });
    if (!result.assets) return;
    setFiles((prev) => [...prev, ...result.assets]);
  }, []);

  const handleFileUpload = useCallback(async () => {
    setLoading(true);
    const url = `${process.env.EXPO_PUBLIC_API_URL}/load/arquivo/upload`;

    const promises = files.map(async (file) => {
      return FileSystem.uploadAsync(url, file.uri, {
        fieldName: "file",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      });
    });
    const results = await Promise.allSettled(promises);
    const errors = [];
    const sucesses = [];
    results.forEach((r, index) => {
      if (r.status === "fulfilled") {
        sucesses.push(JSON.parse(r.value.body).payload);
      } else {
        errors.push({ erros: r.reason, index });
      }
    });

    const parsedData = sucesses.flat().map((s) => {
      const parsedMonth = Number.isNaN(+s.month)
        ? monthNameToNumber[s.month]
        : +s.month;
      let parsedDate = new Date();
      parsedDate.setDate(+s.day);
      parsedDate.setMonth(parsedMonth);
      const [integerValue, cents] = s.value.split(",");
      const parsedValue = +(integerValue.replaceAll(".", "") + "." + cents);

      return {
        value: -1 * parsedValue,
        title: s.title,
        date: parsedDate.toLocaleDateString(),
      };
    });

    realm.write(() => {
      for (const data of parsedData) {
        realm.create(Release, {
          value: data.value,
          name: data.title,
          date: data.date,
          userId: user.id,
        });
      }
    });

    setLoading(false);
    navigation.dispatch(StackActions.popToTop());
  }, [files]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Selecione o(s) PDF(s) que deseja importar
      </Text>
      <Pressable style={styles.importContainer} onPress={handleFileSelection}>
        <Text style={styles.importText}>Selecionar arquivos</Text>
      </Pressable>
      <DocumentsList documents={files} />
      <Button
        style={styles.confirmButton}
        text="Importar"
        disabled={!files.length || loading}
        onPress={handleFileUpload}
      />
      <NavButton href=".." text="Voltar" type="terciary" disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: (StatusBar.currentHeight || 42) + 48,
    paddingHorizontal: 32,
    paddingBottom: 48,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 24 * LINE_HEIGHT_MULTIPLIER,
    textAlign: "center",
  },
  importContainer: {
    marginTop: 64,
    marginBottom: 32,
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowRadius: 12,
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  importText: {
    color: "#8191E4",
  },
  confirmButton: {
    marginTop: "auto",
    marginBottom: 16,
  },
});
