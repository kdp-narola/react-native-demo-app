import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
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
      <Text style={styles.text}>Hello, welcome!</Text>
      {userData?.email && (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20
  },
});
