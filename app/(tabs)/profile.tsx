import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { bg_primary } from "@/constants/Colors";
import { useGlobalContext } from "@/context/GlobalProvider";
import { VideoCard } from "@/components/VideoCard";
import { EmptyState } from "@/components/EmptyState";
import { icons, images } from "@/constants";
import { InfoBox } from "@/components/InfoBox";
import { getAllPosts, signOut } from "@/api";
import { useAppWrite } from "@/utils/useAppWrite";

export default function Profile() {
  const { user, setUser, setIsLogged } = useGlobalContext();
    const { data: posts } = useAppWrite(getAllPosts);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bg_primary,
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              marginBottom: 48,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              onPress={logout}
              style={{
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 40,
              }}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                width: 62,
                height: 62,
                borderWidth: 1,
                borderColor: "#FF9C01",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: user?.avatar }}
                style={{
                  width: "90%",
                  height: "90%",
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles={{
                marginTop: 20,
              }}
              titleStyles={{
                fontSize: 18,
              }}
            />

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <InfoBox
                title={String(posts.length) || "0"}
                subtitle="帖子"
                titleStyles={{
                  fontSize: 20,
                }}
                containerStyles={{
                  marginRight: 40,
                }}
              />
              <InfoBox
                title="1.2k"
                subtitle="关注"
                titleStyles={{
                  fontSize: 20,
                }}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
