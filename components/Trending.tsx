import { useState } from "react";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import { icons } from "@/constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={{
        marginRight: 20,
      }}
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 208,
            height: 288,
            borderRadius: 33,
            marginTop: 12,
            backgroundColor: "#f5ecec",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            resizeMode="cover"
            style={{
              width: 208,
              height: 288,
              borderRadius: 33,
              marginVertical: 20,
              overflow: "hidden",
              elevation: 5,
              shadowColor: "#000000",
              shadowOpacity: 0.4,
              shadowRadius: 5,
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}
          />
          <Image
            source={icons.play}
            style={{
              width: 48,
              height: 48,
              position: "absolute",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

type TrendingProps = {
  posts: {
    id: string;
    title: string;
    creator: string;
    thumbnail: string;
    video: string;
  }[];
};

export const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};
