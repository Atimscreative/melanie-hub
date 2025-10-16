import { cn } from "@/lib/utils";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  label?: string;
  className?: string | undefined;
  inputClassName?: string | undefined;
  labelClassName?: string | undefined;
  inputComponent?: React.ReactNode;
};

export default function ThemedInput({
  label,
  className,
  inputClassName,
  labelClassName,
  inputComponent,
  ...props
}: Props) {
  return (
    <View className={cn("w-full", className)}>
      {label && (
        <Text
          className={cn("text-title font-medium text-base", labelClassName)}
        >
          {label}
        </Text>
      )}
      {inputComponent ? (
        <>{inputComponent}</>
      ) : (
        <TextInput
          className={cn(
            "bg-input-bg px-3 h-[40px] py-3 border text-title rounded-md focus:border-primary border-border mt-1 ",
            "placeholder:text-body",
            inputClassName
          )}
          {...props}
        />
      )}
    </View>
  );
}
