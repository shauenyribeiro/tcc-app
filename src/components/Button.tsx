import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type ButtonTypes = "primary" | "secondary" | "terciary";

type Props = {
  text: string;
  style?: ViewStyle;
  type?: ButtonTypes;
} & Omit<PressableProps, "style">;

export function Button({
  text,
  style,
  disabled,
  type = "primary",
  ...rest
}: Props) {
  const containerStyle = styles[`${type}${disabled ? "Disabled" : ""}`];
  const textStyle = styles[`${type}Text`];

  return (
    <Pressable style={[containerStyle, style]} {...rest}>
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: "#8191E4",
    padding: 16,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
  },
  primaryDisabled: {
    backgroundColor: "#c4c4c4",
    padding: 16,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
  },
  primaryText: {
    color: "#ffffff",
  },
  secondary: {
    padding: 16,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#8191E4",
    borderWidth: 1,
  },
  secondaryDisabled: {
    padding: 16,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#8191E4",
    borderWidth: 1,
  },
  secondaryText: {
    color: "#8191e4",
  },
  terciary: {
    padding: 16,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  terciaryDisabled: {
    padding: 16,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  terciaryText: {
    color: "#8191e4",
  },
});
