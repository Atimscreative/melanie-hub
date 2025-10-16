import ProductPicker from "@/components/ProductPicker";
import ThemedCard from "@/components/shared/ThemedCard";
import ThemedInput from "@/components/shared/ThemedInput";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { colors } from "@/constants/colors";
import { productOptions, ProductType, Sale, SaleItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";

const Sales = () => {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme || "dark"];
  // const { colorScheme, setColorScheme } = useColorScheme();
  const [sales, setSales] = useState(sampleSales);
  const [modalVisible, setModalVisible] = useState(false);
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [quantity, setQuantity] = useState("");

  const addProductToSale = () => {
    if (!selectedProduct || !quantity) {
      Alert.alert("Error", "Please select a product and enter quantity");
      return;
    }

    const newItem = {
      product: selectedProduct,
      quantity: parseInt(quantity),
      total: selectedProduct.price * parseInt(quantity),
    };

    setSaleItems([...saleItems, newItem] as any);
    setSelectedProduct(null);
    setQuantity("");
  };

  const removeProductFromSale = (index: number) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const handleNewSale = () => {
    if (saleItems?.length < 1) {
      Alert.alert("Error", "Please add atleast a product in sale");
      return;
    }

    const newSale = {
      id: `#MSE123`,
      items: saleItems,
      total: saleItems.reduce((sum, item) => sum + item.total, 0),
      quantity: saleItems.reduce((sum, item) => sum + item.quantity, 0),
      date: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    setSales([newSale, ...sales]);
    setModalVisible(false);
  };

  return (
    <ThemedView safe className="px-4 mt-8">
      <View className="flex justify-between items-center flex-row gap-11 mb-6 n">
        <ThemedText title className="text-2xl">
          Sales
        </ThemedText>

        <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-primary rounded-lg px-3 py-2 flex flex-row items-center gap-3"
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text className="font-medium text-base text-white">New Sale</Text>
        </Pressable>
      </View>

      {/* SALES LIST */}
      {sampleSales.length === 0 ? (
        <></>
      ) : (
        <FlatList
          data={sales}
          renderItem={({ item }) => <SaleCard item={item as any} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-card rounded-t-3xl p-6">
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-primary rounded-full justify-center items-center size-10 absolute right-4 top-4"
            >
              <Ionicons name="close" size={24} color="#fff" />
            </Pressable>
            <View className="space-y-4">
              {/* Add Product Section */}
              <View className="">
                <ThemedText className="text-lg font-semibold text-title mb-7">
                  Add Products to Sale
                </ThemedText>

                <View className="gap-3">
                  <ThemedInput
                    label="Product"
                    inputComponent={
                      <ProductPicker
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                      />
                    }
                  />

                  <ThemedInput
                    label="Quantity"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    inputMode="numeric"
                    keyboardType="numeric"
                  />
                </View>

                <Pressable
                  className="bg-primary/20 border mt-4 w-[40%] self-end border-primary rounded-lg py-3 flex-row items-center justify-center gap-2"
                  onPress={addProductToSale}
                >
                  <Ionicons name="add" size={20} color={theme.primary} />
                  <Text className="text-primary font-semibold">
                    Add Product
                  </Text>
                </Pressable>
              </View>

              {/* Products List */}
              {saleItems.length > 0 && (
                <View className="space-y-3 mt-6">
                  <ThemedText className="text-lg font-semibold text-title">
                    Products in Sale
                  </ThemedText>
                  <FlatList
                    data={saleItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                      <SaleProductItem
                        item={item}
                        index={index}
                        removeProductFromSale={removeProductFromSale}
                      />
                    )}
                    contentContainerStyle={{ gap: 0 }}
                  />

                  <View className="border-t border-border pt-3">
                    <View className="flex-row justify-between">
                      <ThemedText className="text-lg font-bold text-title">
                        Sale Total:
                      </ThemedText>
                      <ThemedText className="text-lg font-bold text-primary">
                        ₦
                        {saleItems
                          .reduce((sum, item) => sum + item.total, 0)
                          .toLocaleString()}
                      </ThemedText>
                    </View>
                    <Pressable
                      className="bg-primary mt-4 rounded-lg py-3 flex-row items-center justify-center gap-2"
                      onPress={handleNewSale}
                    >
                      <Text className="text-white font-semibold">
                        Add New Sale
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

export default Sales;

function SaleCard({ item }: { item: Sale }) {
  return (
    <ThemedCard className="mb-4">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <ThemedText className="text-lg font-semibold text-title">
            #{item.id}
          </ThemedText>
        </View>
        <View className={`px-3 py-1 rounded-full bg-primary/20 `}>
          <ThemedText className={`text-xs font-medium text-primary`}>
            {item.date}
          </ThemedText>
        </View>
      </View>

      <View className="space-y-3">
        <ThemedText className="text-base font-medium text-body mb-2">
          Products Sold:
        </ThemedText>
        <View className="gap-3 px-1">
          {Array.isArray(item.items) &&
            item.items.map((saleItem, index) => (
              <View key={index} className="bg-text/5 rounded-lg p-0 ">
                <View className="flex-row justify-between items-start mb-1">
                  <ThemedText className="font-medium text-title">
                    {saleItem.product.label.split(" - ")[0]}
                  </ThemedText>
                  <ThemedText className="text-sm text-body/70">
                    ₦{saleItem.product.price.toLocaleString()}
                  </ThemedText>
                </View>
                <View className="flex-row justify-between">
                  <ThemedText className="text-sm text-body/80">
                    Qty: {saleItem.quantity}
                  </ThemedText>
                  <ThemedText className="font-semibold text-primary">
                    ₦{saleItem.total.toLocaleString()}
                  </ThemedText>
                </View>
              </View>
            ))}
        </View>

        <View className="border-t border-border pt-2 mt-2">
          <View className="flex-row justify-between">
            <ThemedText className="text-lg font-bold text-title">
              Total:
            </ThemedText>
            <ThemedText className="text-lg font-bold text-primary">
              ₦{item.total.toLocaleString()}
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedCard>
  );
}

function SaleProductItem({
  item,
  removeProductFromSale,
  index,
}: {
  item: any;
  index: number;
  removeProductFromSale: (index: number) => void;
}) {
  return (
    <View className="bg-text/5 rounded-lg p-3">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <ThemedText className="font-medium text-title">
            {item.product.label.split(" - ")[0]}
          </ThemedText>
          <ThemedText className="text-sm text-text/70">
            ₦{item.unitPrice.toLocaleString()} × {item.quantity}
          </ThemedText>
        </View>
        <View className="flex-row items-center gap-3">
          <ThemedText className="font-semibold text-primary">
            ₦{item.total.toLocaleString()}
          </ThemedText>
          <Pressable
            onPress={() => removeProductFromSale(index)}
            className="w-6 h-6 rounded-full bg-red-100 items-center justify-center"
          >
            <Ionicons name="close" size={16} color="#EF4444" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const sampleSales = [
  {
    id: "MSW12083",
    date: "02-10-2025",
    items: [
      { product: productOptions[0], quantity: 2, total: 3000 },
      { product: productOptions[1], quantity: 1, total: 2000 },
    ],
    quantity: 3,
    total: 5000,
  },
  {
    id: "MSW12084",
    date: "01-10-2025",
    items: [{ product: productOptions[4], quantity: 1, total: 4000 }],
    quantity: 1,
    total: 4000,
  },
  {
    id: "MSW12085",
    date: "29-09-2025",
    items: [{ product: productOptions[1], quantity: 3, total: 6000 }],
    quantity: 3,
    total: 6000,
  },
  {
    id: "MSW12025",
    date: "29-09-2025",
    items: [{ product: productOptions[1], quantity: 3, total: 6000 }],
    quantity: 3,

    total: 6000,
  },
  {
    id: "MSW120s5",
    date: "29-09-2025",
    items: [{ product: productOptions[1], quantity: 3, total: 6000 }],
    quantity: 3,

    total: 6000,
  },
];
