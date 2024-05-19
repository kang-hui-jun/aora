import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { bg_primary } from "@/constants/Colors";

function Bookmark() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: bg_primary,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
        }}
      >
        Bookmark
      </Text>
    </SafeAreaView>
  );
}
