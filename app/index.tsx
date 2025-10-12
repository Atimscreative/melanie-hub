import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import BottomNavigation from "../components/BottomNavigation";
import DashboardHeader from "../components/DashboardHeader";
import MetricCard from "../components/MetricCard";
import SalesExpensesChart from "../components/SalesExpensesChart";
import { colors } from "../constants/colors";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSettingsPress = () => {
    console.log("Settings pressed");
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader onSettingsPress={handleSettingsPress} />

        <View style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            <MetricCard
              title="Expenses"
              value="$2,500"
              subtitle="This Month"
              icon="trending-down-outline"
              trend="down"
            />
            <MetricCard
              title="Sales"
              value="$3,200"
              subtitle="This Month"
              icon="trending-up-outline"
              trend="up"
            />
          </View>
          <View style={styles.metricsRow}>
            <MetricCard
              title="Inventory"
              value="500"
              subtitle="Units"
              icon="cube-outline"
            />
            <MetricCard
              title="Pricing"
              value="$5.00"
              subtitle="Per Unit"
              icon="pricetag-outline"
            />
          </View>
        </View>

        <SalesExpensesChart />
      </ScrollView>

      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  metricsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
});
