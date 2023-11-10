import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useRealm } from "@realm/react";

import { TextInput } from "../components/TextInput";
import { Text } from "../components/Text";
import { RadioButton } from "../components/RadioButton";
import { NavButton } from "../components/NavButton";
import { Button } from "../components/Button";

import { useForm } from "../hooks/useForm";
import { Release } from "../models/Release";

type CheckboxOptions = "" | "expense" | "income";

type FormFields = {
  name: string;
  value: string;
  date: string;
};

export default function Create() {
  const navigation = useNavigation();
  const realm = useRealm();
  const [checkedOption, setCheckedOption] = useState<CheckboxOptions>("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useForm<FormFields>({
    name: "",
    value: "",
    date: "",
  });

  const handleCheckIncome = useCallback(() => {
    setCheckedOption("income");
  }, []);

  const handleCheckExpense = useCallback(() => {
    setCheckedOption("expense");
  }, []);

  const handleConfirmAction = () => {
    setLoading(true);
    realm.write(() => {
      const numericValue = +values.value;
      const value =
        checkedOption === "expense" ? -1 * numericValue : numericValue;
      return realm.create(Release, {
        value,
        date: values.date,
        name: values.name,
      });
    });
    setLoading(false);
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({
        android: "height",
        ios: "padding",
      })}
    >
      <ScrollView
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <TextInput
          value={values.name}
          name="name"
          onChangeText={setValues}
          label="Título do lançamento"
          placeholder="Ex: Netflix"
          maxLength={40}
        />
        <TextInput
          value={values.value}
          onChangeText={setValues}
          name="value"
          label="Valor"
          placeholder="Ex: R$ 50,00"
          startAdornment="R$"
          keyboardType="numeric"
        />
        <TextInput
          value={values.date}
          onChangeText={setValues}
          name="date"
          label="Data"
          placeholder="Ex: DD/MM/AAAA"
          maxLength={10}
        />
        <RadioButton
          checked={checkedOption === "income"}
          label="Entrada de dinheiro"
          onPress={handleCheckIncome}
        />
        <RadioButton
          checked={checkedOption === "expense"}
          label="Saída de dinheiro"
          onPress={handleCheckExpense}
        />
        <Button
          text="Confirmar"
          style={styles.confirmButton}
          onPress={handleConfirmAction}
          disabled={
            loading ||
            !(values.date && values.name && values.value && checkedOption)
          }
        />
        <NavButton href=".." text="Voltar" type="terciary" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight || 32) + 24,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    gap: 24,
    paddingBottom: 16,
  },
  confirmButton: {
    // TODO: possivelmente vai bugar
    marginTop: "auto",
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
