import { colors } from "@/constants/colors";
import { productOptions, ProductType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useColorScheme } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function ProductPicker({
  selectedProduct,
  setSelectedProduct,
}: {
  selectedProduct: ProductType | null;
  setSelectedProduct: (product: ProductType | null) => void;
}) {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme || "dark"];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={productOptions}
      setOpen={setOpen}
      setValue={setValue}
      // setValue={(value) => {
      //   if (typeof value === "string") {
      //     const product = productOptions.find((p) => p.value === value);
      //     setSelectedProduct(product || null);

      //     return product?.value;
      //   }
      // }}
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

export default ProductPicker;
