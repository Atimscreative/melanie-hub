import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#121212" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
