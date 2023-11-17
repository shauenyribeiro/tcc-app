import { useCallback, useState } from "react";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

import { LINE_HEIGHT_MULTIPLIER, Text } from "@components/Text";
import { Button } from "@components/Button";
import { NavButton } from "@components/NavButton";
import { DocumentsList, type Document } from "@components/Import/DocumentsList";

export default function Import() {
  const [files, setFiles] = useState<Document[]>([]);

  const handleFileSelection = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: true,
    });
    if (!result.assets) return;
    setFiles((prev) => [...prev, ...result.assets]);
  }, []);

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
        disabled={!files.length}
      />
      <NavButton href=".." text="Voltar" type="terciary" />
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
