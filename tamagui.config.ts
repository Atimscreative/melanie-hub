import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
import { colors } from "./constants/colors";

export const config = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media,
    // add your own media queries here, if wanted
  },
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      // Light theme colors
      primary: colors.light.primary,
      primaryHover: colors.light.primaryHover,
      background: colors.light.background,
      card: colors.light.card,
      title: colors.light.text,
      body: colors.light.subText,
      border: colors.light.border,
      inputBg: colors.light.inputBg,
      placeholder: colors.light.placeholder,
    },
  },
  themes: {
    light: {
      primary: colors.light.primary,
      primaryHover: colors.light.primaryHover,
      background: colors.light.background,
      card: colors.light.card,
      title: colors.light.text,
      body: colors.light.subText,
      border: colors.light.border,
      inputBg: colors.light.inputBg,
      placeholder: colors.light.placeholder,
    },
    dark: {
      primary: colors.dark.primary,
      primaryHover: colors.dark.primaryHover,
      background: colors.dark.background,
      card: colors.dark.card,
      title: colors.dark.text,
      body: colors.dark.subText,
      border: colors.dark.border,
      inputBg: colors.dark.inputBg,
      placeholder: colors.dark.placeholder,
    },
  },
});

type OurConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}
