import ThemedCard from "@/components/shared/ThemedCard";
import ThemedInput from "@/components/shared/ThemedInput";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// Types
interface Product {
  label: string;
  value: string;
  price: number;
}

interface SaleItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Expense {
  id: string;
  date: string;
  items: SaleItem[] | string; // For sales: array of SaleItem, for expenses: string description
  quantity: number;
  unitPrice: number;
  total: number;
  type: "sale" | "expense";
}

// Product options for the dropdown
const productOptions: Product[] = [
  { label: "20g - ₦1,500 (Pouch)", value: "20g", price: 1500 },
  { label: "50g - ₦2,000 (Pouch)", value: "50g", price: 2000 },
  { label: "100g - ₦2,500 (Pouch)", value: "100g", price: 2500 },
  { label: "800g - ₦3,500 (Jar)", value: "800g", price: 3500 },
  { label: "1L - ₦4,000 (Jar)", value: "1L", price: 4000 },
  { label: "1.5L - ₦5,500 (Jar)", value: "1.5L", price: 5500 },
  { label: "2.5L - ₦8,000 (Jar)", value: "2.5L", price: 8000 },
];

// Sample expense data
const sampleExpenses: Expense[] = [
  {
    id: "MSW12083",
    date: "02-10-2025",
    items: [
      { product: productOptions[0], quantity: 2, unitPrice: 1500, total: 3000 },
      { product: productOptions[1], quantity: 1, unitPrice: 2000, total: 2000 },
    ],
    quantity: 3,
    unitPrice: 0,
    total: 5000,
    type: "sale",
  },
  {
    id: "MSW12084",
    date: "01-10-2025",
    items: [
      { product: productOptions[4], quantity: 1, unitPrice: 4000, total: 4000 },
    ],
    quantity: 1,
    unitPrice: 4000,
    total: 4000,
    type: "sale",
  },
  {
    id: "EXP001",
    date: "30-09-2025",
    items: "Marketing Materials",
    quantity: 1,
    unitPrice: 5000,
    total: 5000,
    type: "expense",
  },
  {
    id: "MSW12085",
    date: "29-09-2025",
    items: [
      { product: productOptions[1], quantity: 3, unitPrice: 2000, total: 6000 },
    ],
    quantity: 3,
    unitPrice: 2000,
    total: 6000,
    type: "sale",
  },
];

const Expenses = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState("");
  const [expenseType, setExpenseType] = useState("sale");
  const [customExpense, setCustomExpense] = useState("");
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);

  const colorScheme = useColorScheme();
  const theme = colors[colorScheme || "dark"];

  const addProductToSale = () => {
    if (!selectedProduct || !quantity) {
      Alert.alert("Error", "Please select a product and enter quantity");
      return;
    }

    const newItem: SaleItem = {
      product: selectedProduct,
      quantity: parseInt(quantity),
      unitPrice: selectedProduct.price,
      total: selectedProduct.price * parseInt(quantity),
    };

    setSaleItems([...saleItems, newItem]);
    setSelectedProduct(null);
    setQuantity("");
  };

  const removeProductFromSale = (index: number) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const handleAddExpense = () => {
    if (expenseType === "sale" && saleItems.length === 0) {
      Alert.alert("Error", "Please add at least one product to the sale");
      return;
    }

    if (expenseType === "expense" && (!customExpense || !quantity)) {
      Alert.alert("Error", "Please enter expense description and amount");
      return;
    }

    const totalQuantity =
      expenseType === "sale"
        ? saleItems.reduce((sum, item) => sum + item.quantity, 0)
        : parseInt(quantity);

    const totalAmount =
      expenseType === "sale"
        ? saleItems.reduce((sum, item) => sum + item.total, 0)
        : parseInt(quantity);

    const newExpense: Expense = {
      id: expenseType === "sale" ? `MSW${Date.now()}` : `EXP${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB"),
      items: expenseType === "sale" ? saleItems : customExpense,
      quantity: totalQuantity,
      unitPrice: expenseType === "sale" ? 0 : parseInt(quantity),
      total: totalAmount,
      type: expenseType as "sale" | "expense",
    };

    setExpenses([newExpense, ...expenses]);
    setSelectedProduct(null);
    setQuantity("");
    setCustomExpense("");
    setSaleItems([]);
    setModalVisible(false);
  };

  const renderExpenseCard = ({ item }: { item: Expense }) => (
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

      {item.type === "sale" ? (
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
                      ₦{saleItem.unitPrice.toLocaleString()}
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
      ) : (
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <ThemedText className="text-text/80">Description:</ThemedText>
            <ThemedText className="font-medium text-title">
              {typeof item.items === "string" ? item.items : ""}
            </ThemedText>
          </View>
          <View className="flex-row justify-between">
            <ThemedText className="text-text/80">Amount:</ThemedText>
            <ThemedText className="font-medium text-title">
              ₦{item.total.toLocaleString()}
            </ThemedText>
          </View>
        </View>
      )}
    </ThemedCard>
  );

  const EmptyState = () => (
    <ThemedCard className="items-center py-12">
      <Ionicons name="receipt-outline" size={64} color={theme.text} />
      <ThemedText className="text-xl font-semibold text-title mt-4 mb-2">
        No Expenses Yet
      </ThemedText>
      <ThemedText className="text-center text-text/70 mb-6">
        Start tracking your sales and expenses to see them here
      </ThemedText>
      <Pressable
        className="bg-primary rounded-lg px-6 py-3 flex-row items-center gap-2"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text className="text-white font-semibold">Add First Entry</Text>
      </Pressable>
    </ThemedCard>
  );

  return (
    <ThemedView safe>
      <View className="px-4 pt-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <ThemedText className="text-3xl font-bold text-title">
              Expenses
            </ThemedText>
            <ThemedText className="text-text/70 mt-1">
              Track sales and expenses
            </ThemedText>
          </View>
          <Pressable
            className="bg-primary rounded-xl px-4 py-3 flex-row items-center gap-2 shadow-lg"
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text className="text-white font-semibold">Add Entry</Text>
          </Pressable>
        </View>

        {/* Summary Cards */}
        <View className="flex-row gap-4 mb-6">
          <ThemedCard className="flex-1">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-green-100 rounded-xl items-center justify-center">
                <Ionicons name="trending-up" size={24} color="#10B981" />
              </View>
              <View>
                <ThemedText className="text-sm text-text/70">
                  Total Sales
                </ThemedText>
                <ThemedText className="text-xl font-bold text-green-600">
                  ₦
                  {expenses
                    .filter((e) => e.type === "sale")
                    .reduce((sum, e) => sum + e.total, 0)
                    .toLocaleString()}
                </ThemedText>
              </View>
            </View>
          </ThemedCard>

          <ThemedCard className="flex-1">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-red-100 rounded-xl items-center justify-center">
                <Ionicons name="trending-down" size={24} color="#EF4444" />
              </View>
              <View>
                <ThemedText className="text-sm text-text/70">
                  Total Expenses
                </ThemedText>
                <ThemedText className="text-xl font-bold text-red-600">
                  ₦
                  {expenses
                    .filter((e) => e.type === "expense")
                    .reduce((sum, e) => sum + e.total, 0)
                    .toLocaleString()}
                </ThemedText>
              </View>
            </View>
          </ThemedCard>
        </View>

        {/* Expenses List */}
        {expenses.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={expenses}
            renderItem={renderExpenseCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

      {/* Add Entry Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-card rounded-t-3xl p-6 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <ThemedText className="text-2xl font-bold text-title">
                Add Entry
              </ThemedText>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="w-8 h-8 rounded-full bg-text/10 items-center justify-center"
              >
                <Ionicons name="close" size={20} color={theme.text} />
              </Pressable>
            </View>

            {/* Entry Type Toggle */}
            <View className="flex-row bg-text/5 rounded-xl p-1 mb-6">
              <Pressable
                className={`flex-1 py-3 rounded-lg ${
                  expenseType === "sale" ? "bg-primary" : "bg-transparent"
                }`}
                onPress={() => setExpenseType("sale")}
              >
                <Text
                  className={`text-center font-semibold ${
                    expenseType === "sale" ? "text-white" : "text-text"
                  }`}
                >
                  Sale
                </Text>
              </Pressable>
              <Pressable
                className={`flex-1 py-3 rounded-lg ${
                  expenseType === "expense" ? "bg-primary" : "bg-transparent"
                }`}
                onPress={() => setExpenseType("expense")}
              >
                <Text
                  className={`text-center font-semibold ${
                    expenseType === "expense" ? "text-white" : "text-text"
                  }`}
                >
                  Expense
                </Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {expenseType === "sale" ? (
                <View className="space-y-4">
                  {/* Add Product Section */}
                  <View className="space-y-3">
                    <ThemedText className="text-lg font-semibold text-title">
                      Add Products to Sale
                    </ThemedText>

                    <View>
                      <ThemedText className="text-base font-medium text-title mb-2">
                        Product
                      </ThemedText>
                      <ProductPicker
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                      />
                    </View>

                    <ThemedInput
                      label="Quantity"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChangeText={setQuantity}
                      inputMode="numeric"
                      keyboardType="numeric"
                    />

                    <Pressable
                      className="bg-primary/20 border border-primary rounded-lg py-3 flex-row items-center justify-center gap-2"
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
                    <View className="space-y-3">
                      <ThemedText className="text-lg font-semibold text-title">
                        Products in Sale
                      </ThemedText>
                      {saleItems.map((item, index) => (
                        <View key={index} className="bg-text/5 rounded-lg p-3">
                          <View className="flex-row justify-between items-start">
                            <View className="flex-1">
                              <ThemedText className="font-medium text-title">
                                {item.product.label.split(" - ")[0]}
                              </ThemedText>
                              <ThemedText className="text-sm text-text/70">
                                ₦{item.unitPrice.toLocaleString()} ×{" "}
                                {item.quantity}
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
                                <Ionicons
                                  name="close"
                                  size={16}
                                  color="#EF4444"
                                />
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      ))}

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
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                <View className="space-y-4">
                  <ThemedInput
                    label="Expense Description"
                    placeholder="e.g., Marketing materials, Office supplies"
                    value={customExpense}
                    onChangeText={setCustomExpense}
                  />
                  <ThemedInput
                    label="Amount"
                    placeholder="Enter expense amount"
                    value={quantity}
                    onChangeText={setQuantity}
                    inputMode="numeric"
                    keyboardType="numeric"
                  />
                </View>
              )}

              <Pressable
                className="bg-primary rounded-xl py-4 mt-6"
                onPress={handleAddExpense}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {expenseType === "sale" ? "Complete Sale" : "Add Expense"}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

// Product Picker Component
function ProductPicker({
  selectedProduct,
  setSelectedProduct,
}: {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}) {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme || "dark"];
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={selectedProduct?.value || null}
      items={productOptions}
      setOpen={setOpen}
      setValue={(value) => {
        if (typeof value === "string") {
          const product = productOptions.find((p) => p.value === value);
          setSelectedProduct(product || null);
        }
      }}
      placeholder="Select a product"
      labelStyle={{ color: theme.title }}
      listMode="SCROLLVIEW"
      max={10}
      style={{
        backgroundColor: theme.inputBg,
        borderColor: open ? theme.primary : theme.border,
        borderRadius: 8,
        paddingVertical: 0,
        minHeight: 40,
        marginVertical: 0,
      }}
      dropDownContainerStyle={{
        backgroundColor: theme.inputBg,
        borderColor: theme.border,
        marginTop: 2,
        zIndex: 1000,
        borderRadius: 8,
      }}
      textStyle={{ color: theme.text }}
      ArrowUpIconComponent={() => (
        <Ionicons name="chevron-up" color={theme.text} size={16} />
      )}
      ArrowDownIconComponent={() => (
        <Ionicons name="chevron-down" color={theme.text} size={16} />
      )}
      autoScroll
    />
  );
}

export default Expenses;
