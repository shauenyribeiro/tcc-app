import { Text as RNText, TextProps, StyleSheet } from "react-native";

type FontWeight = "regular" | "medium" | "bold" | "black";

type Props = TextProps & { weight?: FontWeight };

export const LINE_HEIGHT_MULTIPLIER = 1.2;

export function Text({ style, weight = "medium", ...rest }: Props) {
  return <RNText style={[styles.generic, styles[weight], style]} {...rest} />;
}

const styles = StyleSheet.create({
  generic: {
    fontSize: 16,
    lineHeight: 16 * LINE_HEIGHT_MULTIPLIER,
    color: "#636363",
  },
  regular: {
    fontFamily: "Roboto_400Regular",
  },
  medium: {
    fontFamily: "Roboto_500Medium",
  },
  bold: {
    fontFamily: "Roboto_700Bold",
  },
  black: {
    fontFamily: "Roboto_900Black",
  },
});
