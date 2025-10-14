import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  style?: StyleProp<ViewStyle>;
  safe?: boolean;
  children?: React.ReactNode;
};

const ThemedView = ({ style, safe = false, ...props }: Props) => {
  const insets = useSafeAreaInsets();

  if (safe)
    return (
      <View
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

  return <View style={[style]} {...props} />;
};

export default ThemedView;

const styles = StyleSheet.create({});
