import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Loader } from "@/components/Loader";

type TabBarIconProps = {
  icon: ImageSourcePropType;
  name: string;
  color: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabBarIconProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{
          width: 24,
          height: 24,
        }}
      />
      <Text
        style={{
          fontSize: 12,
          color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                name="首页"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="书签"
                focused={focused}
              />
            ),
          }}
        /> */}

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="创建"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="简介"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
