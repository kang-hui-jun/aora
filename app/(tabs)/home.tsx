import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { bg_primary } from "@/constants/Colors";
import { icons, images } from "@/constants";
import { SearchInput } from "@/components/SearchInput";
import { EmptyState } from "@/components/EmptyState";
import { VideoCard } from "@/components/VideoCard";
import { Trending } from "@/components/Trending";
import { useAppWrite } from "@/utils/useAppWrite";
import { getAllPosts } from "@/api";

export default function home() {
  const { data: posts, refetch } = useAppWrite(getAllPosts);
  const [latesPosts, setLatesPosts] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: bg_primary,
        flex: 1,
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.username}
            avatar={item.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 24,
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 24,
                alignItems: "flex-start",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: "rgb(243 244 246)",
                  }}
                >
                  欢迎回来
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    color: "white",
                  }}
                >
                  张三
                </Text>
              </View>

              <View style={{ marginTop: 6 }}>
                <Image
                  source={images.logoSmall}
                  style={{
                    width: 36,
                    height: 40,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View
              style={{
                width: "100%",
                flex: 1,
                paddingTop: 20,
                paddingBottom: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 12,
                  color: "rgb(243 244 246)",
                }}
              >
                最新视频
              </Text>

              <Trending posts={posts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="没有找到视频" subtitle="尚未创建视频" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
