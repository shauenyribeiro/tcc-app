import { View, StyleSheet, StatusBar } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { AuthOperationName, useAuth, useEmailPasswordAuth } from "@realm/react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image } from "expo-image";

import { useForm } from "@hooks/useForm";

import { TextInput } from "@components/TextInput";
import { LINE_HEIGHT_MULTIPLIER, Text } from "@components/Text";
import { Button } from "@components/Button";

type AuthForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function LoginScreen() {
  const { result, logInWithEmailPassword } = useAuth();
  const { register } = useEmailPasswordAuth();
  const [registerMode, setRegisterMode] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useForm<AuthForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (
      result.error &&
      result.operation === AuthOperationName.LogInWithEmailPassword
    ) {
      setError("Usuário ou senha incorretos!");
    }
  }, [result]);

  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logInWithEmailPassword({
        email: values.email,
        password: values.password,
      });
    }
  }, [result]);

  const handleAuthButton = useCallback(() => {
    if (!registerMode) {
      return logInWithEmailPassword({
        email: values.email,
        password: values.password,
      });
    }
    if (values.confirmPassword !== values.password) {
      return setError("As senhas não conferem!");
    }
    return register({ email: values.email, password: values.password });
  }, [registerMode, values]);

  const handleSecondaryButton = useCallback(() => {
    setRegisterMode((prev) => !prev);
    setValues("", "confirmPassword");
  }, [registerMode]);

  return (
    <KeyboardAwareScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.logo}
        />
        <Text weight="black" style={styles.title}>
          FINANTROLE
        </Text>
        <View style={styles.formContainer}>
          <Text>Olá, seja bem-vindo!</Text>
          <TextInput
            value={values.email}
            onChangeText={setValues}
            label="E-mail"
            name="email"
            placeholder="exemplo@ex.com"
            keyboardType="email-address"
          />
          <TextInput
            value={values.password}
            onChangeText={setValues}
            label="Senha"
            name="password"
            placeholder="*********"
            secureTextEntry
          />
          {registerMode && (
            <TextInput
              value={values.confirmPassword}
              onChangeText={setValues}
              name="confirmPassword"
              label="Confirme sua senha"
              placeholder="*********"
              secureTextEntry
            />
          )}
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Button
            text={registerMode ? "Criar conta" : "Acessar conta"}
            onPress={handleAuthButton}
            disabled={
              !values.email ||
              !values.password ||
              Boolean(registerMode && !values.confirmPassword) ||
              result.pending
            }
          />
          <Button
            onPress={handleSecondaryButton}
            text={registerMode ? "Voltar" : "Quero me cadastrar"}
            type="secondary"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { backgroundColor: "#ffffff" },
  container: {
    paddingTop: (StatusBar.currentHeight || 48) + 24,
    gap: 24,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#8191e4",
  },
  title: {
    fontSize: 40,
    lineHeight: 40 * LINE_HEIGHT_MULTIPLIER,
    color: "#ffffff",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    gap: 16,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  logo: {
    width: 144,
    height: 144,
    marginBottom: 16,
  },
  error: {
    textAlign: "center",
    color: "#ff1a1a",
    fontSize: 12,
  },
});
