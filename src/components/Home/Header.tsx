import { StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useAuth } from "@realm/react";

import { Text, LINE_HEIGHT_MULTIPLIER } from "@components/Text";

type HeaderProps = { value: number };

export function Header({ value = 0 }: HeaderProps) {
  const { logOut } = useAuth();

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
        <Text weight="bold" style={styles.title}>
          FINANTROLE
        </Text>
        <Pressable style={styles.helpButton} onPress={logOut}>
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
  title: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 24 * LINE_HEIGHT_MULTIPLIER,
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
