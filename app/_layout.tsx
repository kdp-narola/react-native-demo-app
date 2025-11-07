import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { AddContextProvider } from "./Contexts/addContext";
import { AuthProvider } from "./Contexts/authContext";
import { DeleteContextProvider } from "./Contexts/deleteContext";
import { TaskListContextProvider } from "./Contexts/taskListContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <TaskListContextProvider>
          <DeleteContextProvider>
            <AddContextProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="login" />
                <Stack.Screen name="+not-found" />
              </Stack>
            </AddContextProvider>
          </DeleteContextProvider>
        </TaskListContextProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
