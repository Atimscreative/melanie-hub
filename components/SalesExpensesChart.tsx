import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
// import { LineChart } from "react-native-chart-kit";
import { colors } from "../constants/colors";

const screenWidth = Dimensions.get("window").width;

interface SalesExpensesChartProps {
  data?: {
    labels: string[];
    datasets: {
      data: number[];
      color: (opacity?: number) => string;
      strokeWidth: number;
    }[];
  };
}

export default function SalesExpensesChart({ data }: SalesExpensesChartProps) {
  const defaultData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [2500, 2800, 3200, 2900, 3500, 3200],
        color: (opacity = 1) => `rgba(244, 175, 37, ${opacity})`, // Sales color
        strokeWidth: 3,
      },
      {
        data: [2000, 2200, 2500, 2300, 2800, 2500],
        color: (opacity = 1) => `rgba(212, 165, 116, ${opacity})`, // Expenses color
        strokeWidth: 2,
      },
    ],
  };

  const chartData = data || defaultData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales vs. Expenses</Text>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: colors.chartSales }]}
            />
            <Text style={styles.legendText}>Sales</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: colors.chartExpenses },
              ]}
            />
            <Text style={styles.legendText}>Expenses</Text>
          </View>
        </View>
      </View>
      <Text style={styles.subtitle}>Last 6 Months</Text>

      <View style={styles.chartContainer}>
        {/* <LineChart
          data={chartData}
          width={screenWidth - 80}
          height={200}
          chartConfig={{
            backgroundColor: colors.cardBackground,
            backgroundGradientFrom: colors.cardBackground,
            backgroundGradientTo: colors.cardBackground,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: colors.primary,
            },
            propsForBackgroundLines: {
              strokeDasharray: "5,5",
              stroke: colors.surface,
            },
          }}
          bezier
          style={styles.chart}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: "center",
  },
  chart: {
    borderRadius: 16,
  },
});
