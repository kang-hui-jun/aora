import {
  View,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import { bg_primary } from "@/constants/Colors";

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: screenHeight,
        backgroundColor: bg_primary,
        zIndex: 10,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        size={osName === "ios" ? "large" : 50}
        color="white"
      />
    </View>
  );
};
