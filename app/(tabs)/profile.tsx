import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import AuthContext, { AuthType } from "../Contexts/authContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { userData, setUserData } = useContext(AuthContext) as AuthType;

  const handleLogout = async () => {
    await setUserData(null);
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello, welcome!</Text>
      {userData?.email && (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
}
