import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import AuthContext, { AuthType } from "../Contexts/authContext";

export default function LogoutScreen() {
  const { setUserData } = useContext(AuthContext) as AuthType;
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("isLoggedIn");

        setUserData(null);

        router.replace("/login");
      } catch (err) {
        console.error("Logout error:", err);
      }
    };

    logout();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" color="#7f56da" />
    </View>
  );
}
