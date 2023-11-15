import { useCallback, useEffect, useState } from "react";
import { Modal, View, StyleSheet, ModalProps } from "react-native";
import Realm from "realm";

import { Release } from "../../../models/Release";
import { useForm } from "../../../hooks/useForm";

import { TextInput } from "../../TextInput";
import { MaskedInput, Masks } from "../../MaskedInput";
import { Text } from "../../Text";
import { Button } from "../../Button";
import { RadioButton } from "../../RadioButton";

export type EditableData = { name: string; value: number; date: string };

type CheckboxOptions = "" | "expense" | "income";

type FormFields = {
  name: string;
  value: string;
  date: string;
};

type Props = Omit<ModalProps, "transparent" | "animationType"> & {
  release: Release & Realm.Object;
  onConfirm: (release: Release & Realm.Object, newData: EditableData) => void;
};

export function EditModal({
  release,
  onRequestClose,
  onConfirm,
  ...rest
}: Props) {
  const [checkedOption, setCheckedOption] = useState<CheckboxOptions>("");
  const [values, setValues] = useForm<FormFields>({
    name: "",
    value: "",
    date: "",
  });

  useEffect(() => {
    if (release) {
      setValues(release.name, "name");
      setValues((release.value * 100).toString(), "value");
      setValues(release.date, "date");
      setCheckedOption(release.value < 0 ? "expense" : "income");
    } else {
      setValues("", "name");
      setValues("", "value");
      setValues("", "date");
      setCheckedOption("");
    }
  }, [release]);

  const handleCheckIncome = useCallback(() => {
    setCheckedOption("income");
  }, []);

  const handleCheckExpense = useCallback(() => {
    setCheckedOption("expense");
  }, []);

  const handleValueInput = useCallback(
    (_maskedValue: string, name: string, unmaskedValue: string) => {
      setValues(unmaskedValue, name);
    },
    []
  );

  const handleConfirmButton = () => {
    const numericValue = +values.value.padEnd(3, "0") / 100;
    const value =
      checkedOption === "expense" ? -1 * numericValue : numericValue;
    const newData: EditableData = {
      date: values.date,
      name: values.name,
      value,
    };
    onConfirm(release, newData);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      onRequestClose={onRequestClose}
      {...rest}
    >
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <Text style={styles.text}>Edite as informaçõees como desejar:</Text>
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

          <Button text="Confirmar" onPress={handleConfirmButton} />
          <Button text="Cancelar" type="secondary" onPress={onRequestClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "80%",
    padding: 24,
    gap: 24,
    backgroundColor: "#ffffff",
    borderRadius: 24,
  },
  backdrop: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  text: {
    textAlign: "center",
  },
});
