import { DeleteContext } from "@/app/Contexts/deleteContext";
import { DeleteType } from "@/app/Contexts/deleteType";
import { TaskListContext } from "@/app/Contexts/taskListContext";
import { TaskListType } from "@/app/Contexts/taskType";
import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

interface TaskCardProps {
  id: number;
  name: string;
  list: string;
  color: string;
  done: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, name, list, color, done }) => {
  const { setShowDelete, setId } = useContext(DeleteContext) as DeleteType;
  const { checkTask } = useContext(TaskListContext) as TaskListType;
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isSmallMobile = width < 480;

  function handleCheck() {
    checkTask(id);
  }

  function handleDelete() {
    setShowDelete(true);
    setId(id);
  }

  function handleEdit() {
    console.log("Edit task:", id);
  }

  const getResponsiveStyles = () => {
    if (isSmallMobile) {
      return {
        nameFontSize: 14,
        listFontSize: 11,
        containerPadding: 10,
        containerWidth: "98%" as const,
        checkboxSize: 18,
        iconSize: 18,
        containerHeight: undefined,
      };
    } else if (isMobile) {
      return {
        nameFontSize: 16,
        listFontSize: 12,
        containerPadding: 12,
        containerWidth: "95%" as const,
        checkboxSize: 20,
        iconSize: 20,
        containerHeight: undefined,
      };
    } else if (isTablet) {
      return {
        nameFontSize: 20,
        listFontSize: 14,
        containerPadding: 14,
        containerWidth: "92%" as const,
        checkboxSize: 22,
        iconSize: 22,
        containerHeight: 70,
      };
    } else {
      return {
        nameFontSize: 22,
        listFontSize: 16,
        containerPadding: 16,
        containerWidth: "90%" as const,
        checkboxSize: 24,
        iconSize: 24,
        containerHeight: 80,
      };
    }
  };

  const responsive = getResponsiveStyles();

  return (
    <View
      style={[
        styles.container,
        {
          width: responsive.containerWidth,
          padding: responsive.containerPadding,
          ...(responsive.containerHeight && { height: responsive.containerHeight }),
          flexDirection: isMobile ? "column" : "row",
        },
      ]}
    >
      {isMobile ? (
        <>
          <View style={styles.mobileTopRow}>
            <TouchableOpacity onPress={handleCheck} style={styles.mobileCheckField}>
              <View style={[
                styles.checkboxRing,
                {
                  height: responsive.checkboxSize,
                  width: responsive.checkboxSize,
                  borderRadius: responsive.checkboxSize / 2,
                }
              ]}>
                {done && (
                  <View
                    style={[
                      styles.checkFill,
                      {
                        height: responsive.checkboxSize - 6,
                        width: responsive.checkboxSize - 6,
                        borderRadius: (responsive.checkboxSize - 6) / 2,
                      }
                    ]}
                  />
                )}
              </View>
            </TouchableOpacity>

            <View style={styles.mobileDescription}>
              <Text
                style={[
                  styles.name,
                  { fontSize: responsive.nameFontSize },
                  done && styles.nameDone,
                ]}
                numberOfLines={isSmallMobile ? 1 : 2}
              >
                {name}
              </Text>
              <View style={styles.listBelong}>
                <View style={[styles.colorTag, { backgroundColor: color }]} />
                <Text style={[styles.listName, { fontSize: responsive.listFontSize }]}>
                  {list}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.mobileBottomRow}>
            <TouchableOpacity onPress={handleEdit} style={styles.mobileIconButton}>
              <Image
                source={require("../../Img/edit.svg")}
                style={[
                  styles.icon,
                  {
                    width: responsive.iconSize,
                    height: responsive.iconSize,
                  }
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.mobileIconButton}>
              <Image
                source={require("../../Img/erase.svg")}
                style={[
                  styles.icon,
                  {
                    width: responsive.iconSize,
                    height: responsive.iconSize,
                  }
                ]}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleCheck} style={styles.checkField}>
            <View style={[
              styles.checkboxRing,
              {
                height: responsive.checkboxSize,
                width: responsive.checkboxSize,
                borderRadius: responsive.checkboxSize / 2,
              }
            ]}>
              {done && (
                <View
                  style={[
                    styles.checkFill,
                    {
                      height: responsive.checkboxSize - 6,
                      width: responsive.checkboxSize - 6,
                      borderRadius: (responsive.checkboxSize - 6) / 2,
                    }
                  ]}
                />
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.description}>
            <Text
              style={[
                styles.name,
                { fontSize: responsive.nameFontSize },
                done && styles.nameDone,
              ]}
              numberOfLines={1}
            >
              {name}
            </Text>
            <View style={styles.listBelong}>
              <View style={[styles.colorTag, { backgroundColor: color }]} />
              <Text style={[styles.listName, { fontSize: responsive.listFontSize }]}>
                {list}
              </Text>
            </View>
          </View>

          <View style={styles.icons}>
            <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
              <Image
                source={require("../../Img/edit.svg")}
                style={[
                  styles.icon,
                  {
                    width: responsive.iconSize,
                    height: responsive.iconSize,
                  }
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
              <Image
                source={require("../../Img/erase.svg")}
                style={[
                  styles.icon,
                  {
                    width: responsive.iconSize,
                    height: responsive.iconSize,
                  }
                ]}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
    marginVertical: 8,
    alignSelf: "center",
  },
  
  // Desktop/Tablet Styles
  checkField: {
    width: 60,
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  icons: {
    flexDirection: "row",
    paddingRight: 8,
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  
  // Mobile-specific Styles
  mobileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  mobileCheckField: {
    marginRight: 12,
    padding: 4,
  },
  mobileDescription: {
    flex: 1,
  },
  mobileBottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  mobileIconButton: {
    padding: 12,
    marginLeft: 8,
  },
  
  // Common Styles
  checkboxRing: {
    borderWidth: 2,
    borderColor: "#7f56da",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkFill: {
    backgroundColor: "#7f56da",
  },
  name: {
    color: "#555",
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 30,
  },
  nameDone: {
    color: "#bbb",
    fontWeight: "400",
    textDecorationLine: "line-through",
  },
  listBelong: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  colorTag: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  listName: {
    color: "#999",
    fontWeight: "400",
    flex: 1,
  },
  icon: {
    resizeMode: "contain",
    tintColor: "#666",
  },
});