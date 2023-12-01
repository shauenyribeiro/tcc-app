import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "expo-router";
import { StackActions } from "@react-navigation/native";
import { useRealm, useUser } from "@realm/react";

import { TextInput } from "@components/TextInput";
import { MaskedInput, Masks } from "@components/MaskedInput";
import { RadioButton } from "@components/RadioButton";
import { NavButton } from "@components/NavButton";
import { Button } from "@components/Button";

import { useForm } from "@hooks/useForm";

import { Release } from "@models/Release";

type CheckboxOptions = "" | "expense" | "income";

type FormFields = {
  name: string;
  value: string;
  date: string;
};

export default function Create() {
  const navigation = useNavigation();
  const realm = useRealm();
  const user = useUser();
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

  const handleValueInput = useCallback(
    (_maskedValue: string, name: keyof FormFields, unmaskedValue: string) => {
      setValues(unmaskedValue, name);
    },
    []
  );

  const handleConfirmAction = () => {
    setLoading(true);
    realm.write(() => {
      const numericValue = +values.value.padEnd(3, "0") / 100;
      const value =
        checkedOption === "expense" ? -1 * numericValue : numericValue;
      return realm.create(Release, {
        value,
        date: values.date,
        name: values.name,
        userId: user.id,
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
      <TextInput
        value={values.name}
        name="name"
        onChangeText={setValues}
        label="Título do lançamento"
        placeholder="Ex: Netflix"
        maxLength={40}
      />
      <MaskedInput
        value={values.value}
        onChangeText={handleValueInput}
        name="value"
        label="Valor"
        placeholder="Ex: R$ 50,00"
        keyboardType="numeric"
        mask={Masks.BRL_CURRENCY}
        maxLength={12}
      />
      <MaskedInput
        value={values.date}
        onChangeText={setValues}
        name="date"
        label="Data"
        placeholder="Ex: DD/MM/AAAA"
        keyboardType="numeric"
        maxLength={10}
        mask={Masks.DATE_DDMMYYYY}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (StatusBar.currentHeight || 32) + 24,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    gap: 24,
    paddingBottom: 16,
  },
  confirmButton: {
    marginTop: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
