import TaskCard from "@/components/TaskCard";
import { getCategoryByColor, SampleData } from "@/data/Tasks";
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
  const [selectedCategoryDataList, setSelectedCategoryDataList] = useState<any>([]);

  useEffect(() => {
    setSelectedCategory(currentSlug);
    const tasksInCategory =  selectedCategory in SampleData ? SampleData[selectedCategory] : Object.values(SampleData).flat();
    setSelectedCategoryDataList(tasksInCategory);
  }, [currentSlug]);

  console.log('selectedCategoryDataList', selectedCategory,selectedCategoryDataList, SampleData[selectedCategory])

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16, textTransform: 'capitalize' }}>
        Category: {selectedCategory}
      </Text>

      <FlatList
        data={selectedCategoryDataList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          console.log("item : ",item, currentSlug, selectedCategory);
          return (
          <TaskCard
            id={item.id}
            name={item.title}
            list={item.categorie || selectedCategory}
            color={getCategoryByColor(currentSlug)}
            done={item.completed}
          />
        )}}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}
