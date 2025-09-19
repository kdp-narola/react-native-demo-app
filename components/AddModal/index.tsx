import { AddContext } from "@/app/Contexts/addContext";
import { AddType } from "@/app/Contexts/addType";
import { CategoriesContext } from "@/app/Contexts/categoriesContext";
import { CategorieContextType } from "@/app/Contexts/categoriesType";
import { TaskListContext } from "@/app/Contexts/taskListContext";
import { TaskListType, TaskProps } from "@/app/Contexts/taskType";
import { Picker } from "@react-native-picker/picker";
import React, { useContext, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddModal: React.FC = () => {
  const { addTask } = useContext(TaskListContext) as TaskListType;
  const { categList } = useContext(CategoriesContext) as CategorieContextType;
  const { setShowAdd } = useContext(AddContext) as AddType;

  const [taskName, setTaskName] = useState("");
  const [taskCat, setTaskCat] = useState(
    categList.findIndex((cat) => cat.name === "None")
  );

  function handleCancel() {
    setShowAdd(false);
  }

  function handleAdd() {
    if (!taskName.trim()) return;

    const newTask: TaskProps = {
      id: Math.random(),
      title: taskName,
      categorie: categList[taskCat].name,
      color: categList[taskCat].color,
      done: false,
    };

    setShowAdd(false);
    addTask(newTask);
    setTaskName("");
  }

  return (
    <Modal transparent animationType="fade" visible={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.label}>Insert name</Text>
          <TextInput
            style={styles.input}
            placeholder="Task name"
            value={taskName}
            onChangeText={setTaskName}
          />

          <Text style={styles.label}>Select a category</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={taskCat}
              onValueChange={(value: any) => setTaskCat(value)}
              style={styles.picker}
            >
              {categList.map((cat, index) => (
                <Picker.Item
                  key={cat.id}
                  label={cat.name}
                  value={index}
                  color={cat.color}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    width: "80%",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  pickerWrapper: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#999",
    marginBottom: 16,
  },
  picker: {
    height: 44,
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "blue",
    width: 120,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "500",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "green",
    width: 120,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "green",
    fontSize: 16,
    fontWeight: "500",
  },
});
