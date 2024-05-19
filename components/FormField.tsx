import { icons } from "@/constants";
import { useState } from "react";
import {
  View,
  Text,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputProps,
} from "react-native";

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  otherStyles?: ViewStyle;
}

export const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={{
        marginTop: 8,
        ...otherStyles,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: "rgb(243 244 246)",
        }}
      >
        {title}
      </Text>

      <View
        style={{
          width: "100%",
          height: 64,
          paddingHorizontal: 16,
          backgroundColor: "#1E1E2D",
          borderRadius: 16,
          borderWidth: 2,
          borderColor: "#232533",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: "white",
            fontSize: 16,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
