import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./global.css";

import { TamaguiProvider } from "tamagui";
import { config } from "../tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="light" backgroundColor="#121212" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </TamaguiProvider>
  );
}
