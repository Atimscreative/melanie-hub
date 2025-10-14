import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { colors } from "../constants/colors";
import ThemedCard from "./shared/ThemedCard";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  trend?: "up" | "down" | "neutral";
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}: MetricCardProps) {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme ?? "dark"];

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "trending-up";
      case "down":
        return "trending-down";
      default:
        return null;
    }
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      flex: 1,
      margin: 4,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    title: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "500",
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    trendIcon: {
      marginLeft: 4,
    },
    value: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 12,
      color: theme.text,
    },
  });

  return (
    <ThemedCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconContainer}>
          {trend && (
            <Ionicons
              name={getTrendIcon() as keyof typeof Ionicons.glyphMap}
              size={16}
              color={theme.primary}
              style={styles.trendIcon}
            />
          )}
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </ThemedCard>
  );
}
