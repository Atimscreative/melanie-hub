import ThemedCard from "@/components/shared/ThemedCard";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const Sales = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [selectedItem, setSelectedItem] = useState("");
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
        <ThemedCard className="gap-4">
          <View className="flex flex-row justify-between items-center mb-6">
            <ThemedText title className="text-lg">
              ID: #MSW12083
            </ThemedText>
            <ThemedText className="text-primary">Date: 02-10-2025</ThemedText>
          </View>
          <ThemedText style={{ marginBottom: 10 }}>Size: 20g Pouch</ThemedText>
          <ThemedText>Quanity: 2</ThemedText>
          <ThemedText
            className="font-bold text-primary mt-10"
            style={{ marginTop: 10 }}
          >
            Total: ₦2,500
          </ThemedText>
        </ThemedCard>
        <View>
          <Text>Select a language:</Text>
          <Picker
            selectedValue={selectedItem}
            onValueChange={(itemValue) => setSelectedItem(itemValue as any)}
            // style={{
            //   backgroundColor: "#eee",
            //   borderRadius: 8,
            //   minHeight: 10,
            //   padding: 0,
            // }}
            className="bg-input-bg"
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>

        <View>
          <TextInput className="bg-input-bg placeholder:text-input-placeholder" placeholder="" />
        </View>

        <Text
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
        >
          {`The color scheme is ${colorScheme}`}
        </Text>
      </ScrollView>
    </ThemedView>
  );
};

export default Sales;
