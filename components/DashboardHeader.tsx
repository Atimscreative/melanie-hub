import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DashboardHeaderProps {
  onSettingsPress?: () => void;
}

export default function DashboardHeader({
  onSettingsPress,
}: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <Text className="text-primary font-bold text-2xl">Dashboard yfydj</Text>
      <TouchableOpacity onPress={onSettingsPress} style={styles.settingsButton}>
        <Ionicons
          name="settings-outline"
          size={24}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    // color: colors.textPrimary,
  },
  settingsButton: {
    padding: 8,
  },
});
