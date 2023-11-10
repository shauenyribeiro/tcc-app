import { StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";

import { Text, LINE_HEIGHT_MULTIPLIER } from "../Text";

type HeaderProps = { value: number };

export function Header({ value = 0 }: HeaderProps) {
  const formattedValue = new Intl.NumberFormat("default", {
    currency: "BRL",
    style: "currency",
  }).format(value);
  return (
    <View style={styles.container}>
      <View style={styles.appInfoContainer}>
        <Image
          source={require("../../../assets/img/logo.png")}
          style={styles.logo}
        />
        <Pressable style={styles.helpButton}>
          <Text style={styles.help}>?</Text>
        </Pressable>
      </View>
      <Text style={styles.text}>Seu saldo:</Text>
      <Text weight="regular" style={styles.balance}>
        {formattedValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: "#ffffff",
  },
  balance: {
    textAlign: "center",
    width: "100%",
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    fontSize: 48,
    lineHeight: 48 * LINE_HEIGHT_MULTIPLIER,
    color: "#ffffff",
    paddingTop: 16,
  },
  appInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 56,
    height: 56,
    marginBottom: 16,
  },
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  help: {
    color: "#ffffff",
    fontSize: 14,
  },
});
