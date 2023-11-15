import { StyleSheet, View } from "react-native";

import { Text } from "../../Text";

export function Header() {
  return (
    <View style={styles.container}>
      <Text weight="black" style={styles.name}>
        Titulo
      </Text>
      <Text weight="black" style={styles.value}>
        Valor
      </Text>
      <Text weight="black" style={styles.date}>
        Data
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  name: {
    width: "40%",
    marginRight: 4,
    color: "#808080",
  },
  value: {
    width: "30%",
    marginRight: 4,
    textAlign: "center",
    color: "#808080",
  },
  date: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#808080",
  },
});
