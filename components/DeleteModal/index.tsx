import { DeleteContext } from "@/app/Contexts/deleteContext";
import { DeleteType } from "@/app/Contexts/deleteType";
import { TaskListContext } from "@/app/Contexts/taskListContext";
import { TaskListType } from "@/app/Contexts/taskType";
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DeleteModal: React.FC = () => {
  const { setShowDelete, id, setId, showDelete } = useContext(
    DeleteContext
  ) as DeleteType;
  const { deleteTask } = useContext(TaskListContext) as TaskListType;

  function handleCancel() {
    setShowDelete(false);
  }

  function handleConfirm() {
    deleteTask(id);
    setId(0);
    setShowDelete(false);
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={showDelete}
      onRequestClose={handleCancel}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Are you sure you want to delete this task?
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleConfirm}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
    width: "70%",
    height: "30%",
    backgroundColor: "#fff",
    borderRadius: 16,
    opacity: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttons: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "blue",
    width: 120,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  cancelText: {
    color: "blue",
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "red",
    width: 120,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  deleteText: {
    color: "red",
    fontSize: 18,
  },
});
