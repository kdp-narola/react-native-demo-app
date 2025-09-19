import AddModal from "@/components/AddModal";
import AddTask from "@/components/AddTask";
import DeleteModal from "@/components/DeleteModal";
import FilterTag from "@/components/FilterTag";
import TaskCard from "@/components/TaskCard";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const listOfLists = {
  all: [
    { id: 1, title: "Buy groceries", categorie: "Personal", color: "#ff9800", done: false },
    { id: 2, title: "Meeting with team", categorie: "Work", color: "#4caf50", done: true },
  ],
};

export default function TasksScreen() {
  const [listToDisplay, setListToDisplay] = useState<"all" | "done" | "notDone">("all");
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const allActive = listToDisplay === "all";
  const doneActive = listToDisplay === "done";
  const notDoneActive = listToDisplay === "notDone";

  const handleAll = () => setListToDisplay("all");
  const handleDone = () => setListToDisplay("done");
  const handleNotDone = () => setListToDisplay("notDone");

  const filteredTasks = listOfLists.all.filter((task) => {
    if (listToDisplay === "done") return task.done;
    if (listToDisplay === "notDone") return !task.done;
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>All your tasks</Text>
      </View>

      <View style={styles.titleAndFilter}>
        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.title}>Tasks</Text>
        </TouchableOpacity>

        <View style={styles.filterField}>
          <TouchableOpacity onPress={handleAll}>
            <FilterTag name="All" active={allActive} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDone}>
            <FilterTag name="Done" active={doneActive} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotDone}>
            <FilterTag name="Not done" active={notDoneActive} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard
            id={item.id}
            name={item.title}
            list={item.categorie}
            color={item.color}
            done={item.done}
          />
        )}
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
