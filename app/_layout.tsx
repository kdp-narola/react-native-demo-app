import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { AddContextProvider } from "./Contexts/addContext";
import { AuthContext, AuthContextType, AuthProvider } from "./Contexts/authContext";
import { DeleteContextProvider } from "./Contexts/deleteContext";
import { TaskListContextProvider } from "./Contexts/taskListContext";

function RootStackNavigator() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const handleRedirect = async () => {
      if (!loading && user) {
        if (pathname === "/login" || pathname === "/signup") {
          const last = await AsyncStorage.getItem("lastVisited") || "/tasks";
          router.replace(last as any);
        }
      }
    };
    handleRedirect();
  }, [user, loading, pathname]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <TaskListContextProvider>
        <DeleteContextProvider>
          <AddContextProvider>
            <Stack screenOptions={{ headerShown: false }}>
              {/* (tabs) = Private routes */}
              <Stack.Screen name="(tabs)" />
              {/* Public routes */}
              <Stack.Screen name="login" />
              <Stack.Screen name="signup" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </AddContextProvider>
        </DeleteContextProvider>
      </TaskListContextProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <RootStackNavigator />
    </AuthProvider>
  );
}
