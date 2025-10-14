import { cn } from "@/lib/utils";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  style?: StyleProp<ViewStyle>;
  safe?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const ThemedView = ({ style, safe = false, className, ...props }: Props) => {
  const insets = useSafeAreaInsets();

  if (safe)
    return (
      <View
        className={cn("bg-background", className)}
        style={[
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
          style,
        ]}
        {...props}
      />
    );

  return (
    <View
      style={[style]}
      className={cn("bg-background", className)}
      {...props}
    />
  );
};

export default ThemedView;

const styles = StyleSheet.create({});
