import { CustomButton } from "@/components/CustomButton";
import { Loader } from "@/components/Loader";
import { images } from "@/constants";
import { bg_primary } from "@/constants/Colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, router } from "expo-router";
import { ScrollView, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView
      style={{
        backgroundColor: bg_primary,
        height: "100%",
      }}
    >
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{
              width: 130,
              height: 84,
            }}
          />

          <Image
            source={images.cards}
            resizeMode="contain"
            style={{
              maxWidth: 380,
              width: "100%",
              height: 298,
            }}
          />

          <View
            style={{
              position: "relative",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              探索无尽{"\n"}
              的可能性{" "}
              <Text
                style={{
                  color: "#FF8E01",
                }}
              >
                Aora
              </Text>
            </Text>

            <Image
              source={images.path}
              style={{
                width: 136,
                height: 15,
                position: "absolute",
                bottom: -8,
                right: -32,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontSize: 14,
              color: "rgb(243 244 246)",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            创意与创新相遇：踏上无限之旅与Aora一起探索
          </Text>

          <CustomButton
            title="使用邮箱继续"
            handlePress={() => router.push("/sign-in")}
            containerStyles={{
              width: "100%",
              marginTop: 28,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
