import { StyleSheet, View } from "react-native";

import { Text } from "../../Text";

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text weight="regular" style={styles.text}>
        Você não possui nenhum lançamento!
      </Text>
      <Text weight="regular" style={styles.text}>
        Que tal fazer um agora?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#636363",
  },
});
