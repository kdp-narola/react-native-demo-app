import { AddContext } from "@/app/Contexts/addContext";
import { AddType } from "@/app/Contexts/addType";
import { DeleteContext } from "@/app/Contexts/deleteContext";
import { DeleteType } from "@/app/Contexts/deleteType";
import AddModal from "@/components/AddModal";
import AddTask from "@/components/AddTask";
import DeleteModal from "@/components/DeleteModal";
import FilterTag from "@/components/FilterTag";
import TaskCard from "@/components/TaskCard";
import { getCategoryByColor, SampleData } from "@/data/Tasks";
import React, { useContext, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type ListFilter = "all" | "done" | "notDone";

type TasksScreenProps = {
	category?: any;
};

export default function TasksScreen({ category = "None" }: TasksScreenProps) {
	const [listToDisplay, setListToDisplay] = useState<ListFilter>("all");
	const { showDelete } = useContext(DeleteContext) as DeleteType;
	const { showAdd } = useContext(AddContext) as AddType;

	const allActive = listToDisplay === "all";
	const doneActive = listToDisplay === "done";
	const notDoneActive = listToDisplay === "notDone";

	const handleAll = () => setListToDisplay("all");
	const handleDone = () => setListToDisplay("done");
	const handleNotDone = () => setListToDisplay("notDone");

	const tasksInCategory =
		category === "None"
			? Object.values(SampleData)
					.flat()
					.map((task) => ({
						...task,
						categorie:
							task.categorie ||
							Object.keys(SampleData).find((key) =>
								SampleData[key].includes(task)
							) ||
							"None",
					}))
			: SampleData[category] || [];

	const filteredTasks = tasksInCategory.filter((task) => {
		if (listToDisplay === "done") return task.completed === true;
		if (listToDisplay === "notDone") return task.completed === false;
		return true;
	});

	return (
		<View style={styles.container}>
			<View style={styles.headerRow}>
				<Text style={styles.header}>Tasks - {category}</Text>
			</View>

			<View style={[styles.titleAndFilter, , { zIndex: 10 }]}>
				<View style={styles.filterField}>
					{[
						{ name: "All", onPress: handleAll, active: allActive },
						{ name: "Done", onPress: handleDone, active: doneActive },
						{ name: "Not done", onPress: handleNotDone, active: notDoneActive },
					].map((btn) => (
						<TouchableOpacity
							key={btn.name}
							onPress={btn.onPress}
							style={{ marginRight: 12 }}
						>
							<FilterTag
								name={btn.name}
								active={btn.active}
								onPress={btn.onPress}
							/>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<FlatList
				data={filteredTasks}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => {
					const taskCategory = item.categorie || category;
					return (
						<TaskCard
							id={item.id}
							name={item.title}
							list={taskCategory}
              				color={getCategoryByColor(taskCategory)}
							done={item.completed}
						/>
					);
				}}
			/>

			<AddTask />

			{showDelete && <DeleteModal />}
			{showAdd && <AddModal />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#fff", padding: 16 },
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	header: { fontSize: 20, fontWeight: "bold" },
	titleAndFilter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	title: { fontSize: 18, fontWeight: "600" },
	filterField: { flexDirection: "row", alignItems: "center" },
	filterIcon: { width: 20, height: 20, marginLeft: 8 },
});
