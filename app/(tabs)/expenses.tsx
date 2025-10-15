import ThemedCard from "@/components/shared/ThemedCard";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
// import type { FontSizeTokens, SelectProps } from "tamagui";
// import { Adapt, Select, Sheet, YStack, getFontSize } from "tamagui";
// import { LinearGradient } from "tamagui/linear-gradient";
// function SelectDemoContents(
//   props: SelectProps & { trigger?: React.ReactNode }
// ) {
//   const [val, setVal] = React.useState("Product Type");

//   return (
//     <Select
//       value={val}
//       onValueChange={setVal}
//       disablePreventBodyScroll
//       {...props}
//     >
//       {props?.trigger || (
//         <Select.Trigger maxWidth={220} iconAfter={ChevronDown}>
//           <Select.Value placeholder="Something" />
//         </Select.Trigger>
//       )}

//       <Adapt when="maxMd" platform="touch">
//         <Sheet
//           native={!!props.native}
//           modal
//           dismissOnSnapToBottom
//           animation="medium"
//         >
//           <Sheet.Frame>
//             <Sheet.ScrollView>
//               <Adapt.Contents />
//             </Sheet.ScrollView>
//           </Sheet.Frame>
//           <Sheet.Overlay
//             backgroundColor="$shadowColor"
//             animation="lazy"
//             enterStyle={{ opacity: 0 }}
//             exitStyle={{ opacity: 0 }}
//           />
//         </Sheet>
//       </Adapt>

//       <Select.Content zIndex={200000}>
//         <Select.ScrollUpButton
//           alignItems="center"
//           justifyContent="center"
//           position="relative"
//           width="100%"
//           height="$3"
//         >
//           <YStack zIndex={10}>
//             <ChevronUp size={20} />
//           </YStack>
//           <LinearGradient
//             start={[0, 0]}
//             end={[0, 1]}
//             fullscreen
//             colors={["$background", "transparent"]}
//             borderRadius="$4"
//           />
//         </Select.ScrollUpButton>

//         <Select.Viewport
//           // to do animations:
//           // animation="quick"
//           // animateOnly={['transform', 'opacity']}
//           // enterStyle={{ o: 0, y: -10 }}
//           // exitStyle={{ o: 0, y: 10 }}
//           minWidth={200}
//         >
//           <Select.Group>
//             <Select.Label>Fruits</Select.Label>
//             {/* for longer lists memoizing these is useful */}
//             {React.useMemo(
//               () =>
//                 items.map((item, i) => {
//                   return (
//                     <Select.Item
//                       index={i}
//                       key={item.name}
//                       value={item.name.toLowerCase()}
//                     >
//                       <Select.ItemText>{item.name}</Select.ItemText>
//                       <Select.ItemIndicator marginLeft="auto">
//                         <Check size={16} />
//                       </Select.ItemIndicator>
//                     </Select.Item>
//                   );
//                 }),
//               [items]
//             )}
//           </Select.Group>
//           {/* Native gets an extra icon */}
//           {props.native && (
//             <YStack
//               position="absolute"
//               right={0}
//               top={0}
//               bottom={0}
//               alignItems="center"
//               justifyContent="center"
//               width={"$4"}
//               pointerEvents="none"
//             >
//               <ChevronDown
//                 size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
//               />
//             </YStack>
//           )}
//         </Select.Viewport>

//         <Select.ScrollDownButton
//           alignItems="center"
//           justifyContent="center"
//           position="relative"
//           width="100%"
//           height="$3"
//         >
//           <YStack zIndex={10}>
//             <ChevronDown size={20} />
//           </YStack>
//           <LinearGradient
//             start={[0, 0]}
//             end={[0, 1]}
//             fullscreen
//             colors={["transparent", "$background"]}
//             borderRadius="$4"
//           />
//         </Select.ScrollDownButton>
//       </Select.Content>
//     </Select>
//   );
// }

// const products = [
//   {
//     category: "Economic Packs (Pouches)",
//     items: [
//       { label: "20g", value: "20g", price: 1500 },
//       { label: "50g", value: "50g", price: 2000 },
//       { label: "100g", value: "100g", price: 2500 },
//     ],
//   },
//   {
//     category: "Jar Packs (Plastic Bucket Jar)",
//     items: [
//       { label: "800g", value: "800g", price: 3500 },
//       { label: "1L", value: "1L", price: 4000 },
//       { label: "1.5L", value: "1.5L", price: 5500 },
//       { label: "2.5L", value: "2.5L", price: 8000 },
//     ],
//   },
// ];

import DropDownPicker from "react-native-dropdown-picker";

const items = [
  { name: "Apple" },
  { name: "Pear" },
  { name: "Blackberry" },
  { name: "Peach" },
  { name: "Apricot" },
  { name: "Melon" },
];

const Expenses = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ThemedView safe>
      <ScrollView className="pt-5" style={{ paddingHorizontal: 16 }}>
        <View className="flex justify-between items-center flex-row gap-11 mb-6 n">
          <ThemedText title className="text-2xl">
            Expenses
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
          <ThemedText>Quantity: 2</ThemedText>
          <ThemedText className="font-bold">Total: ₦2,500</ThemedText>
        </ThemedCard>

        <View className="mt-6">
          <Picker />
          {/* <SelectDemoContents id="select-demo-2" native /> */}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default Expenses;

const styles = StyleSheet.create({});

function Picker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
