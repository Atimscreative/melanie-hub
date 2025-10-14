import { cn } from "@/lib/utils";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  className?: string;
};

const ThemedCard = ({ style, className, ...props }: Props) => {
  return (
    <View
      className={cn("border-border p-4 rounded-lg bg-card", className)}
      style={[style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({});
