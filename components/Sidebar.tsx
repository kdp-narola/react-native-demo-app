import { Categories, getCategoryByColor, getCategoryColor, Items } from "@/data/Tasks";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type SidebarProps = {
  active: string;
  onNavigate: (route: string) => void;
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
  setSidebarOpen: (open: boolean) => void;
};

const logoutItem = {
  name: "Logout",
  route: "/logout",
  icon: require("../Img/logout.svg"),
};

const CategoryDrawer = ({
  visible,
  onClose,
  selectedCategory,
  onCategorySelect,
  onNavigate,
}: {
  visible: boolean;
  onClose: () => void;
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
  onNavigate: (route: string) => void;
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "70%",
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#E5E7EB",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Select Category
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ fontSize: 18, color: "#6B7280" }}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ padding: 20 }}>
            {Categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  onCategorySelect?.(category.name);
                  onClose();
                  onNavigate(`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`)
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  marginBottom: 8,
                  borderRadius: 12,
                  backgroundColor:
                    selectedCategory === category.name ? "#EBF8FF" : "#F9FAFB",
                  borderLeftWidth: selectedCategory === category.name ? 4 : 0,
                  borderLeftColor: "#3B82F6",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: getCategoryByColor(category.name),
                      marginRight: 16,
                    }}
                  />
                  <Text style={{ fontSize: 16, color: "#374151", flex: 1 }}>
                    {category.name}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: "#9CA3AF" }}>
                  {category.count}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function Sidebar({
  active,
  onNavigate,
  selectedCategory = "Home",
  onCategorySelect,
  setSidebarOpen
}: SidebarProps) {
  const { width } = useWindowDimensions();
  const isNative = Platform.OS !== "web";
  const isMobileWeb = Platform.OS === "web" && width < 768;

  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [showCategoryDrawer, setShowCategoryDrawer] = useState(false);
  const isCategoryRoute = active.startsWith("/categories");

  const handleCategoriesPress = () => {
    if (isNative || isMobileWeb) {
      setShowCategoryDrawer(true);
    } else {
      if (active === "/categories") {
        setIsCategoriesExpanded(!isCategoriesExpanded);
      } else {
        onNavigate("/categories");
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        borderRightWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "white",
        height: "100%",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <CategoryDrawer
        visible={showCategoryDrawer}
        onClose={() => setShowCategoryDrawer(false)}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
        onNavigate={onNavigate}
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: !isNative && !isMobileWeb ? 'center' : 'space-between', flexDirection: 'row', alignContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginBottom: 32 }}>
          <Image
            source={require("../Img/Logo.png")}
            style={{
              width: 50,
              height: 50,
            }}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => setSidebarOpen?.(false)}>
            <Text style={{ fontSize: 26, color: "#6B7280", display: !isNative && !isMobileWeb ? 'none' : 'flex' }}>✕</Text>
          </TouchableOpacity>
        </View>

        {Items.map((item) => (
          <View key={item.route}>
            <TouchableOpacity
              onPress={() =>
                item.name === "Categories"
                  ? handleCategoriesPress()
                  : onNavigate(item.route)
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor:
                  active === item.route ? "#f3f0ff" : "transparent",
              }}
            >
              <Image
                source={item.icon}
                style={{
                  width: 22,
                  height: 22,
                  marginRight: 12,
                  tintColor: active === item.route ? "#7f56da" : "#888",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: active === item.route ? "#7f56da" : "#555",
                  flex: 1,
                }}
              >
                {item.name}
              </Text>
              {item.name === "Categories" && !isMobileWeb && !isNative && (
                <Text
                  style={{
                    fontSize: 14,
                    color: active === item.route ? "#7f56da" : "#888",
                    marginLeft: 8,
                  }}
                >
                  {isCategoriesExpanded ? "▼" : "▶"}
                </Text>
              )}
            </TouchableOpacity>

            {item.name === "Categories" &&
              isCategoryRoute &&
              isCategoriesExpanded &&
              !isMobileWeb &&
              !isNative && (
                <View style={{ paddingLeft: 16, paddingTop: 8 }}>
                  {Categories.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        onCategorySelect?.(category.name);
                        onNavigate(`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`)
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        marginBottom: 4,
                        borderRadius: 8,
                        backgroundColor:
                          selectedCategory === category.name
                            ? "#EBF8FF"
                            : "transparent",
                        borderLeftWidth: selectedCategory === category.name ? 3 : 0,
                        borderLeftColor: "#3B82F6",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: getCategoryColor(category.color),
                            marginRight: 12,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color:
                              selectedCategory === category.name
                                ? "#1E40AF"
                                : "#374151",
                            textTransform: 'capitalize'
                          }}
                        >
                          {category.name}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
                        {category.count}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => onNavigate(logoutItem.route)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor:
            active === logoutItem.route ? "#f3f0ff" : "transparent",
        }}
      >
        <Image
          source={logoutItem.icon}
          style={{
            width: 22,
            height: 22,
            marginRight: 12,
            tintColor: active === logoutItem.route ? "#7f56da" : "#888",
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: active === logoutItem.route ? "#7f56da" : "#555",
          }}
        >
          {logoutItem.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
