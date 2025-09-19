import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TagProps {
  name: string;
  active: boolean;
  onPress?: () => void;
}

const FilterTag: React.FC<TagProps> = ({ name, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.activeContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.tagName, active && styles.activeText]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default FilterTag;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: "transparent",
  },
  activeContainer: {
    backgroundColor: "#fff",
    borderWidth: 0,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  tagName: {
    fontSize: 16,
    color: "#ccc",
  },
  activeText: {
    color: "#333",
  },
});
