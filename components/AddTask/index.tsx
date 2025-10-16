import { AddContext } from "@/app/Contexts/addContext";
import { AddType } from "@/app/Contexts/addType";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AddTask: React.FC = () => {
  const { setShowAdd } = useContext(AddContext) as AddType;

  function handleClick() {
    setShowAdd(true);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick} activeOpacity={0.7}>
       <Ionicons  size={28} name="add-outline" />
      <Text style={styles.text}>Add a task</Text>
    </TouchableOpacity>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    flexDirection: "row",
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 16,
  },
});
