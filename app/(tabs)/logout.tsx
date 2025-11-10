import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext, AuthContextType } from "../Contexts/authContext";

export default function LogoutScreen() {
  const { logout } = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        router.replace("/login");
      } catch (err) {
        console.error("Logout error:", err);
      }
    };

    performLogout();
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
