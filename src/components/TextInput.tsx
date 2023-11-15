import { useCallback, useRef } from "react";
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from "react-native";

import { Text } from "./Text";

type Props = Omit<TextInputProps, "cursorColor" | "onChangeText"> & {
  label: string;
  name?: string;
  onChangeText: (text: string, name: string) => void;
};

export function TextInput({
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
  const input = useRef<RNTextInput>(null);

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
    (text: string) => {
      onChangeText(text, name);
    },
    [name]
  );

  return (
    <View style={styles.container}>
      <Text weight="regular" style={styles.label}>
        {label}
      </Text>
      <RNTextInput
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
