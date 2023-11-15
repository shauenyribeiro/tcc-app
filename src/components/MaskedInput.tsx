import { useCallback, useRef } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import MaskInput, { MaskInputProps } from "react-native-mask-input";

import { Text } from "./Text";

type Props = Omit<MaskInputProps, "cursorColor" | "onChangeText"> & {
  label: string;
  name?: string;
  onChangeText: (
    text: string,
    name: string,
    unmasked: string,
    obfuscated: string
  ) => void;
};

export function MaskedInput({
  style,
  label,
  onFocus,
  onBlur,
  onChangeText,
  value,
  name = "",
  ...rest
}: Props) {
  // const [isFocused, setIsFocused] = useState(false);
  const input = useRef<TextInput>(null);

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      // setIsFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const handleOnBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      // setIsFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  const handleOnChangeText = useCallback(
    (text: string, unmasked: string, obfuscated: string) => {
      onChangeText(text, name, unmasked, obfuscated);
    },
    [name]
  );

  return (
    <View style={styles.container}>
      <Text weight="regular" style={styles.label}>
        {label}
      </Text>
      <MaskInput
        cursorColor="#8191e4"
        value={value}
        style={[styles.input, style]}
        ref={input}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChangeText={handleOnChangeText}
        {...rest}
      />
    </View>
  );
}

export { Masks } from "react-native-mask-input";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomColor: "#8191E4",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 10,
    color: "#8191E4",
  },
  input: {
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
    paddingBottom: 4,
    color: "#636363",
  },
});
