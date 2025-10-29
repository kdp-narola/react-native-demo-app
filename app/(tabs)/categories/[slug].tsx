import TaskCard from "@/components/TaskCard";
import { getCategoryByColor, SampleData } from "@/data/Tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function CategoryScreen() {
	const { slug } = useLocalSearchParams();
	let defaultCategory = "Home";

	const currentSlug =
		typeof slug === "string"
			? slug
			: Array.isArray(slug)
			? slug[0]
			: defaultCategory;

	const [selectedCategory, setSelectedCategory] = useState(currentSlug);
	const [selectedCategoryDataList, setSelectedCategoryDataList] = useState<any>(
		[]
	);

	useEffect(() => {
		const loadCategory = async () => {
			try {
				const stored = await AsyncStorage.getItem("selectedCategory");
				const category =
					typeof slug === "string"
						? slug
						: Array.isArray(slug)
						? slug[0]
						: stored || defaultCategory;

				setSelectedCategory(category);

				await AsyncStorage.setItem("selectedCategory", category);

				const tasks =
					category in SampleData
						? SampleData[category]
						: Object.values(SampleData).flat();

				setSelectedCategoryDataList(tasks);
			} catch (err) {
				console.error("Error loading category:", err);
			}
		};

		loadCategory();
	}, [slug]);

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<Text
				style={{
					fontSize: 22,
					fontWeight: "bold",
					marginBottom: 16,
					textTransform: "capitalize",
				}}
			>
				Category: {selectedCategory}
			</Text>

			<FlatList
				data={selectedCategoryDataList}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => {
					return (
						<TaskCard
							id={item.id}
							name={item.title}
							list={item.categorie || selectedCategory}
							color={getCategoryByColor(currentSlug)}
							done={item.completed}
						/>
					);
				}}
				ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
			/>
		</View>
	);
}
