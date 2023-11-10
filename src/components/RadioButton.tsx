import {
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "./Text";

type Props = PressableProps & {
  label: string;
  checked: boolean;
};

export function RadioButton({ style, label, checked, ...rest }: Props) {
  return (
    <Pressable style={styles.container} {...rest}>
      <View style={[styles.radio, checked && styles.checkedRaadio]}>
        {checked && <Text style={styles.check}>{"\u2714"}</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 32,
    borderColor: "#636363",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedRaadio: {
    backgroundColor: "#8191E4",
    borderWidth: 0,
  },
  check: {
    fontSize: 14,
    color: "#ffffff",
  },
  label: {},
});
