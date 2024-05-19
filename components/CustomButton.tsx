import { bg_primary } from "@/constants/Colors";
import {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
  ActivityIndicator,
} from "react-native";

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: ViewStyle
  textStyles?: TextStyle
  isLoading?: boolean;
};

export const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      style={{
        backgroundColor: "#FF9C01",
        borderRadius: 12,
        minHeight: 62,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: isLoading ? 0.5 : 1,
        ...containerStyles,
      }}
    >
      <Text
        style={{
          color: bg_primary,
          fontSize: 18,
          ...textStyles,
        }}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#FFF"
          size="small"
          style={{
            marginLeft: 8,
          }}
        />
      )}
    </TouchableOpacity>
  );
};
