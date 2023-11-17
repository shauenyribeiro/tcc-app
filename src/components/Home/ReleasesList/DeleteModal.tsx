import { Modal, View, StyleSheet, ModalProps } from "react-native";
import Realm from "realm";

import { Text } from "@components/Text";
import { Button } from "@components/Button";

import { Release } from "@models/Release";

type Props = Omit<ModalProps, "transparent" | "animationType"> & {
  release: Release & Realm.Object;
  onConfirm: (release: Release & Realm.Object) => void;
};

export function DeleteModal({
  release,
  onRequestClose,
  onConfirm,
  ...rest
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent
      onRequestClose={onRequestClose}
      {...rest}
    >
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <Text style={styles.text}>
            Tem certeza que deseja deletar esse item?
          </Text>
          <Button text="Confirmar" onPress={() => onConfirm(release)} />
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
