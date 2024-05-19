import { View, Image, Text, Alert, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getCurrentUser, signIn } from "@/api";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { bg_primary } from "@/constants/Colors";
import { images } from "@/constants";
import { CustomButton } from "@/components/CustomButton";
import { FormField } from "@/components/FormField";

export default function SignIn() {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "admin@example.com",
    password: "123456",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("请输入邮箱和密码");
      return;
    }
    setSubmitting(true);

    try {
      await signIn(form);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("登录成功");
      router.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg_primary }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            flex: 1,
            paddingHorizontal: 16,
            marginVertical: 24,
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: 115,
              height: 34,
            }}
          />

          <Text
            style={{
              fontSize: 24,
              color: "white",
              marginTop: 40,
            }}
          >
            登录 Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles={{
              marginTop: 28,
            }}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles={{
              marginTop: 28,
            }}
          />

          <CustomButton
            title="登录"
            handlePress={submit}
            containerStyles={{
              marginTop: 28,
            }}
            isLoading={isSubmitting}
          />

          <View
            style={{
              justifyContent: "center",
              paddingTop: 20,
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "rgb(243 244 246)",
              }}
            >
              没有帐户？
            </Text>
            <Link
              href="/sign-up"
              style={{
                fontSize: 18,
                color: "#FF9C01",
              }}
            >
              注册
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
