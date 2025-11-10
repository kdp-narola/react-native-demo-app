import CategoryDrawer from "@/components/CategoryDrawer";
import { HapticTab } from "@/components/HapticTab";
import Sidebar from "@/components/Sidebar";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route, Stack, Tabs, usePathname, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Platform, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext, AuthContextType } from "../Contexts/authContext";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { user } = useContext(AuthContext) as AuthContextType;
	const router = useRouter();
	const pathname = usePathname();
	const { width } = useWindowDimensions();
	const [selectedCategory, setSelectedCategory] = useState<string>("none");
	const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);

	const isNative =
		Platform.OS !== "web" || (Platform.OS === "web" && width < 768);

	useEffect(() => {
		if (!user && pathname !== "/login") {
			router.replace("/login");
		}
	}, [user]);

	useEffect(() => {
		const loadCategory = async () => {
			const saved = await AsyncStorage.getItem("selectedCategory");
			if (saved) {
				setSelectedCategory(saved);
			}
		};
		loadCategory();
	}, []);

	const handleNavigate = (route: string) => {
		if (route !== pathname) router.push(route as Route);
	};

	if (!isNative) {
		// 🖥️ Web layout: sidebar + content
		return (
			<View style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}>
				<View style={{ width: "20%", height: "100%" }}>
					<Sidebar
						onNavigate={handleNavigate}
						selectedCategory={selectedCategory}
						onCategorySelect={setSelectedCategory}
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

	// 📱 Native layout: Tabs + Drawer
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<CategoryDrawer
				visible={showCategoryDrawer}
				onClose={() => setShowCategoryDrawer(false)}
				selectedCategory={selectedCategory}
				onCategorySelect={async (cat) => {
					await AsyncStorage.setItem("selectedCategory", cat);
					setSelectedCategory(cat);
					setShowCategoryDrawer(false);
					if (!pathname.includes(`/categories/${cat}`)) {
						router.push(`/categories/${cat}`);
					}
				}}
			/>

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
							<Ionicons size={28} name="checkmark-circle" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="categories"
					options={{
						title: "Categories",
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name="folder" color={color} />
						),
					}}
					listeners={{
						tabPress: (e) => {
							// 🧱 Prevent default tab navigation
							e.preventDefault();

							if (isNative) {
								setShowCategoryDrawer(true);
							} else if (!pathname.startsWith("/categories")) {
								router.push("/categories");
							}
						},
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name="settings" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="logout"
					options={{
						title: "Logout",
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name="log-out" color={color} />
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}
