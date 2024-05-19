import { View, Image, Text } from "react-native";
import { CustomButton } from "./CustomButton";
import { router } from "expo-router";
import { images } from "@/constants";

type EmptyStateProps = {
  title: string;
  subtitle: string;
  isShowButton?: boolean;
};

export const EmptyState = ({
  title,
  subtitle,
  isShowButton,
}: EmptyStateProps) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={images.empty}
        resizeMode="contain"
        style={{
          width: 270,
          height: 216,
        }}
      />

      <Text
        style={{
          fontSize: 14,
          color: "rgb(243 244 246)",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          color: "white",
          marginTop: 8,
        }}
      >
        {subtitle}
      </Text>

      {isShowButton && (
        <CustomButton
          title="返回"
          handlePress={() => router.push("/home")}
          containerStyles={{
            marginTop: 20,
            width: "100%",
          }}
        />
      )}
    </View>
  );
};
