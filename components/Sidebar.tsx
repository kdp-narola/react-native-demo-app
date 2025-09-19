import React from "react";
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type SidebarProps = {
  active: string;
  onNavigate: (route: string) => void;
};

const items = [
  { name: "Tasks", route: "/tasks", icon: require("../Img/task.png") },
  { name: "Categories", route: "/categories", icon: require("../Img/folder.svg") },
  { name: "Settings", route: "/settings", icon: require("../Img/settings.svg") }
];

const logoutItem = {
  name: "Logout",
  route: "/logout",
  icon: require("../Img/logout.svg"),
};

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  const isNative = Platform.OS !== "web";

  if (isNative) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        borderRightWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "white",
        height: "100%",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <View>
        <Image
          source={require("../Img/Logo.png")}
          style={{
            width: 50,
            height: 50,
            marginBottom: 32,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
        {items.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => onNavigate(item.route)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor:
                active === item.route ? "#f3f0ff" : "transparent",
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 22,
                height: 22,
                marginRight: 12,
                tintColor: active === item.route ? "#7f56da" : "#888",
              }}
            />
            <Text
              style={{
                fontSize: 16,
                color: active === item.route ? "#7f56da" : "#555",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => onNavigate(logoutItem.route)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor:
            active === logoutItem.route ? "#f3f0ff" : "transparent",
        }}
      >
        <Image
          source={logoutItem.icon}
          style={{
            width: 22,
            height: 22,
            marginRight: 12,
            tintColor: active === logoutItem.route ? "#7f56da" : "#888",
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: active === logoutItem.route ? "#7f56da" : "#555",
          }}
        >
          {logoutItem.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
