import { StyleSheet, View } from "react-native";

import { Text } from "../components/Text";
import { NavButton } from "../components/NavButton";

export default function NewRelease() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como deseja lançar suas finanças?</Text>

      <NavButton href="/import" text="Importar PDF" />
      <NavButton
        type="secondary"
        style={styles.pdfButton}
        href="/create"
        text="Registrar manualmente"
      />
      <NavButton type="terciary" href=".." text="Cancelar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  contentContainer: {},
  title: {
    color: "#636363",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 64,
  },
  pdfButton: {
    marginVertical: 16,
  },
});
