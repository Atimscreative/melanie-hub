import { cn } from "@/lib/utils";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type Props = {
  style?: StyleProp<TextStyle>;
  title?: boolean;
  children: React.ReactNode;
  className?: string;
};

const ThemedText = ({ style, title, className, ...props }: Props) => {
  return (
    <Text
      className={cn(title ? "font-bold text-title" : "text-body", className)}
      style={[style]}
      {...props}
    />
  );
};

export default ThemedText;

const styles = StyleSheet.create({});
