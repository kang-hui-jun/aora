import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, Image, Alert } from "react-native";

export const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: "#1E1E2D",
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#232533",
      }}
    >
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="搜索视频主题"
        placeholderTextColor="#CDCDE0"
        style={{
          fontSize: 16,
          marginTop: 2,
          color: "white",
          flex: 1,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "") return Alert.alert("", "请输入一些内容进行搜索");

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          style={{
            width: 20,
            height: 20,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
