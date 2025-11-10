import { Categories, getCategoryColor, Items } from "@/data/Tasks";
import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
	Image,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

type SidebarProps = {
	onNavigate: (route: string) => void;
	selectedCategory?: string;
	onCategorySelect?: (category: string) => void;
};

export default function Sidebar({
	selectedCategory = "none",
	onNavigate,
	onCategorySelect,
}: SidebarProps) {
	const { width } = useWindowDimensions();
	const pathname = usePathname();
	const router = useRouter();
	const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
	const isNative =
		Platform.OS !== "web" || (Platform.OS === "web" && width < 768);
	const isCategoryRoute = pathname.startsWith("/categories");
	const { user, logout } = useAuth();

	const handleCategoriesPress = useCallback(async () => {
		if (isCategoryRoute) {
			setIsCategoriesExpanded((prev) => !prev);
		} else {
			const lastCategory = await AsyncStorage.getItem("selectedCategory");
			router.push(lastCategory ? `/categories/${lastCategory}` : "/categories");
		}
	}, [isCategoryRoute]);

	const handleCategorySelect = useCallback(
		async (slug: string) => {
			await AsyncStorage.setItem("selectedCategory", slug);
			onCategorySelect?.(slug);
			router.push(`/categories/${slug}`);
		},
		[onCategorySelect]
	);

	const handleLogout = async () => {
		await logout();
		router.replace("/login");
	};

	return (
		<View
			style={{
				flex: 1,
				borderRightWidth: 1,
				borderColor: "#ddd",
				backgroundColor: "white",
				paddingVertical: 16,
			}}
		>
			<ScrollView style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 16,
						marginBottom: 32,
					}}
				>
					<Image
						source={require("../Img/Logo.png")}
						style={{ width: 50, height: 50 }}
						resizeMode="contain"
					/>
				</View>

				<Text
					style={{
						fontSize: 16,
						fontWeight: "600",
						color: "#444",
						paddingHorizontal: 16,
						marginBottom: 16,
					}}
				>
					Welcome, {user?.username || "User"}!
				</Text>

				{Items.map((item) => (
					<View key={item.route}>
						<TouchableOpacity
							onPress={async () => {
								if (item.name === "Categories") {
									await handleCategoriesPress();
								} else {
									onNavigate(item.route);
								}
							}}
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: 12,
								paddingHorizontal: 16,
								backgroundColor:
									pathname === item.route ? "#f3f0ff" : "transparent",
							}}
						>
							<Image
								source={item.icon}
								style={{
									width: 22,
									height: 22,
									marginRight: 12,
									tintColor: pathname === item.route ? "#7f56da" : "#888",
								}}
							/>
							<Text
								style={{
									fontSize: 16,
									color: pathname === item.route ? "#7f56da" : "#555",
									flex: 1,
								}}
							>
								{item.name}
							</Text>
							{item.name === "Categories" && !isNative && (
								<Text style={{ fontSize: 14, color: "#888", marginLeft: 8 }}>
									{isCategoriesExpanded ? "▼" : "▶"}
								</Text>
							)}
						</TouchableOpacity>

						{/* Category Drawer (Web only) */}
						{item.name === "Categories" &&
							isCategoryRoute &&
							isCategoriesExpanded &&
							!isNative && (
								<View style={{ paddingLeft: 16, paddingTop: 8 }}>
									{Categories.map((category, index) => (
										<TouchableOpacity
											key={index}
											onPress={() => handleCategorySelect(category.name)}
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
												paddingVertical: 8,
												paddingHorizontal: 16,
												marginBottom: 4,
												borderRadius: 8,
												backgroundColor:
													selectedCategory === category.name
														? "#EBF8FF"
														: "transparent",
												borderLeftWidth:
													selectedCategory === category.name ? 3 : 0,
												borderLeftColor:
													selectedCategory === category.name
														? "#3B82F6"
														: "transparent",
											}}
										>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													flex: 1,
												}}
											>
												<View
													style={{
														width: 12,
														height: 12,
														borderRadius: 6,
														backgroundColor: getCategoryColor(category.color),
														marginRight: 12,
													}}
												/>
												<Text
													style={{
														fontSize: 14,
														color:
															selectedCategory === category.name
																? "#1E40AF"
																: "#374151",
														textTransform: "capitalize",
													}}
												>
													{category.name}
												</Text>
											</View>
											<Text style={{ fontSize: 12, color: "#9CA3AF" }}>
												{category.count}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							)}
					</View>
				))}
			</ScrollView>

			<TouchableOpacity
				onPress={handleLogout}
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingVertical: 12,
					paddingHorizontal: 16,
				}}
			>
				<Image
					source={require("../Img/logout.svg")}
					style={{ width: 22, height: 22, marginRight: 12, tintColor: "#888" }}
				/>
				<Text style={{ fontSize: 16, color: "#555" }}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}
