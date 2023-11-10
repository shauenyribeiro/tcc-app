import { Link } from "expo-router";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

type ButtonTypes = "primary" | "secondary" | "terciary";

type Props = {
  href: string;
  text: string;
  style?: ViewStyle;
  type?: ButtonTypes;
  replace?: boolean;
};

export function NavButton({
  href,
  text,
  style,
  replace = false,
  type = "primary",
}: Props) {
  const containerStyle = styles[type];
  const textStyle = styles[`${type}Text`];

  return (
    <Link href={href} asChild replace={replace}>
      <Pressable style={{ ...containerStyle, ...style }}>
        <Text style={textStyle}>{text}</Text>
      </Pressable>
    </Link>
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
  terciaryText: {
    color: "#8191e4",
  },
});
