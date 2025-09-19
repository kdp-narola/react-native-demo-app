import { Stack, Tabs, usePathname, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { HapticTab } from "@/components/HapticTab";
import Sidebar from "@/components/Sidebar";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext, { AuthType } from "../Contexts/authContext";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { userData } = useContext(AuthContext) as AuthType;
	const router = useRouter();
  const pathname = usePathname();
	const { width } = useWindowDimensions();

	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		if (!userData) router.replace("/login");
	}, [userData]);

	const isNative = Platform.OS !== "web";
	const isMobileWeb = !isNative && width < 768;
	const isDesktopWeb = !isNative && width >= 768;

	if (isDesktopWeb) {
		return (
			<View style={{ flex: 1, flexDirection: "row", backgroundColor: 'white' }}>
				<View style={{ width: "20%", height: "100%" }}>
					<Sidebar
						onNavigate={(route: any) => router.push(route)}
            active={pathname}
					/>
				</View>
				<View style={{ flex: 1, width: "80%" }}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="tasks" />
						<Stack.Screen name="categories" />
						<Stack.Screen name="settings" />
					</Stack>
				</View>
			</View>
		);
	}

	if (isMobileWeb) {
		return (
			<View style={{ flex: 1, flexDirection: "row", backgroundColor: 'white' }}>
				<View
					style={{
						width: "10%",
						height: "100%",
						alignItems: "center",
						borderRightWidth: 1,
						borderColor: "#ddd",
						paddingTop: 16,
					}}
				>
					<Pressable onPress={() => setSidebarOpen(!sidebarOpen)}>
						<Text style={{ fontSize: 20 }}>☰</Text>
					</Pressable>
				</View>

				{sidebarOpen && (
					<View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "70%",
							height: "100%",
							shadowColor: "#000",
							shadowOpacity: 0.2,
							shadowRadius: 5,
							elevation: 5,
							zIndex: 10,
						}}
					>
						<Sidebar
							onNavigate={(route: any) => {
								router.push(route);
								setSidebarOpen(false);
							}}
              active={pathname}
						/>
					</View>
				)}

				<View style={{ flex: 1, width: "90%" }}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="tasks" />
						<Stack.Screen name="categories" />
						<Stack.Screen name="settings" />
					</Stack>
				</View>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={["top", "left", "right"]}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
					tabBarButton: HapticTab,
					tabBarBackground: TabBarBackground,
				}}
			>
				<Tabs.Screen
					name="tasks"
					options={{
						title: "Tasks",
						tabBarIcon: ({ color }) => (
							<Ionicons 
								size={28}
								name="checkmark-circle"
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="categories"
					options={{
						title: "Categories",
						tabBarIcon: ({ color }) => (
							<Ionicons  size={28} name="folder" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<Ionicons  size={28} name="settings" color={color} />
						),
					}}
				/>
        <Tabs.Screen
					name="logout"
					options={{
						title: "Logout",
						tabBarIcon: ({ color }) => (
							<Ionicons  size={28} name="log-out" color={color} />
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}
