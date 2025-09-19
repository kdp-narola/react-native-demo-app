import TasksScreen from "@/components/TasksScreen";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

export default function IndexScreen() {
  const { width } = useWindowDimensions();
  const isMobileWeb = Platform.OS === "web" && width < 768;
  const isMobileNative = Platform.OS !== "web";

  if (!isMobileWeb && !isMobileNative) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <TasksScreen />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TasksScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  leftContainer: {
    width: "100%",
    height: "100%",
  },
  rightContainer: {
    width: "100%",
    height: "100%",
  },
});
