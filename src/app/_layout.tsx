import "expo-dev-client";
import "react-native-get-random-values";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { RealmProvider } from "@realm/react";
import * as SystemUI from "expo-system-ui";

SystemUI.setBackgroundColorAsync("azure");

import { schemas } from "../models";

export default function Layout() {
  return (
    <RealmProvider schema={schemas}>
      <StatusBar style="auto" backgroundColor="#8191E4" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen
          name="new"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="create" />
        <Stack.Screen name="import" />
      </Stack>
    </RealmProvider>
  );
}
