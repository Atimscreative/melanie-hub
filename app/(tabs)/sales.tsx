import ThemedCard from "@/components/shared/ThemedCard";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const Sales = () => {
  return (
    <ThemedView safe>
      <ScrollView className="px-5 " style={{ paddingHorizontal: 16 }}>
        <ThemedCard>
          <ThemedText title>ID: #MSW12083</ThemedText>
          <ThemedText>Size: 20g Pouch</ThemedText>
          <ThemedText>Quanity: 2</ThemedText>
          <ThemedText>Total: 2,500</ThemedText>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default Sales;

const styles = StyleSheet.create({});
