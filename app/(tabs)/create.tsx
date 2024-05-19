import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { bg_primary } from "@/constants/Colors";
import { FormField } from "@/components/FormField";
import { CustomButton } from "@/components/CustomButton";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { wait } from "@/utils";
import { router } from "expo-router";
import { uploadFile } from "@/utils/request";

export default function Create() {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("选择的文档", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      form.prompt === "" ||
      form.title === "" ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("请提供所有信息");
    }

    setUploading(true);

    try {
      await uploadFile(form.thumbnail);
      await uploadFile(form.video);
      Alert.alert("成功", "帖子上传成功");
      router.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bg_primary,
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: 16,
          marginVertical: 24,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "white",
          }}
        >
          上传
        </Text>

        <FormField
          title="视频标题"
          value={form.title}
          placeholder="给您的视频起一个吸引人的标题..."
          handleChangeText={(value) => setForm({ ...form, title: value })}
          otherStyles={{
            marginTop: 40,
          }}
        />

        <View
          style={{
            marginTop: 28,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "rgb(243 244 246)",
            }}
          >
            上传视频
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{
                  width: "100%",
                  height: 256,
                  borderRadius: 16,
                }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 160,
                  paddingHorizontal: 16,
                  backgroundColor: "#1E1E2D",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#232533",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#FF9001",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    style={{
                      width: 2,
                      height: 2,
                    }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 28,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#CDCDE0",
            }}
          >
            缩略图
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: 256,
                  borderRadius: 8,
                }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 64,
                  paddingHorizontal: 16,
                  backgroundColor: "#1E1E2D",
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: "#232533",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 8,
                }}
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#CDCDE0",
                  }}
                >
                  选择一个文件
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="人工智能提示"
          value={form.prompt}
          placeholder="你的视频的AI提示..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={{
            marginTop: 28,
          }}
        />

        <CustomButton
          title="提交并发布"
          handlePress={submit}
          containerStyles={{
            marginTop: 28,
          }}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
