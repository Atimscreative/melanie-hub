import ThemedCard from "@/components/shared/ThemedCard";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const Sales = () => {
  return (
    <ThemedView safe>
      <ScrollView className="pt-5" style={{ paddingHorizontal: 16 }}>
        <View className="flex justify-between items-center flex-row gap-11 mb-6 n">
          <ThemedText title className="text-2xl">
            Sales
          </ThemedText>
          <Pressable className="bg-primary rounded-lg px-3 py-2 flex flex-row items-center gap-3">
            <Ionicons name="add" size={20} />
            <Text className="font-medium text-base">New Sale</Text>
          </Pressable>
        </View>
        <ThemedCard>
          <ThemedText title>ID: #MSW12083</ThemedText>
          <ThemedText>Date: 02-10-2025</ThemedText>
          <ThemedText>Size: 20g Pouch</ThemedText>
          <ThemedText>Quanity: 2</ThemedText>
          <ThemedText className="font-bold">Total: ₦2,500</ThemedText>
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default Sales;

const styles = StyleSheet.create({});
