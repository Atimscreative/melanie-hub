import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const tabs: TabItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid-outline" },
  { id: "expenses", label: "Expenses", icon: "receipt-outline" },
  { id: "sales", label: "Sales", icon: "cart-outline" },
  { id: "inventory", label: "Inventory", icon: "clipboard-outline" },
];

export default function BottomNavigation({
  activeTab,
  onTabPress,
}: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? colors.navActive : colors.navInactive}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? colors.navActive : colors.navInactive },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.navBackground,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});
