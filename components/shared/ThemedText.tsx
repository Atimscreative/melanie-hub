import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type Props = {
  style?: StyleProp<TextStyle>;
  title?: boolean;
  children?: React.ReactNode;
};

const ThemedText = ({ style, title, ...props }: Props) => {
  return <Text style={[style]} {...props} />;
};

export default ThemedText;

const styles = StyleSheet.create({});
