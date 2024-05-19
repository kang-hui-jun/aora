import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";

import { icons } from "@/constants";
import { useState } from "react";

type VideoCardProps = {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
};

export const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
}: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 56,
      }}
    >
      <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#FF9C01",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Image
              source={{uri: avatar}}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              flex: 1,
              marginLeft: 12,
              rowGap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "white",
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "rgb(243 244 246)",
              }}
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingTop: 8,
          }}
        >
          <Image
            source={icons.menu}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
          source={{
            uri: video,
          }}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 8,
            marginTop: 12,
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
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{
            width: "100%",
            height: 240,
            borderRadius: 8,
            marginTop: 12,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{uri: thumbnail}}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 8,
              marginTop: 12,
            }}
            resizeMode="cover"
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
    </View>
  );
};
