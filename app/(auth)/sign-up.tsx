import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/api";
import { Link, router } from "expo-router";
import { bg_primary } from "@/constants/Colors";
import { images } from "@/constants";
import { FormField } from "@/components/FormField";
import { CustomButton } from "@/components/CustomButton";

export default function SignUp() {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("请填写完整信息");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
            minHeight: Dimensions.get("window").height,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />

          <Text style={{ fontSize: 24, color: "white", marginTop: 40 }}>
            注册 Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles={{
              marginTop: 40,
            }}
          />

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
            otherStyles={{ marginTop: 28 }}
          />

          <CustomButton
            title="注册"
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
            <Text style={{ fontSize: 18, color: "rgb(243 244 246)" }}>
              已经有账户?
            </Text>
            <Link
              href="/sign-in"
              style={{
                fontSize: 18,
                color: "rgb(243 244 246)",
              }}
            >
              登录
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
