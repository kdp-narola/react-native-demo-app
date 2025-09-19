import React, { useContext, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthContext, { AuthType } from "../Contexts/authContext";

const tabs = ["Profile", "Preferences", "Account", "About"];

export default function SettingsScreen() {
  const [activeTab, setActiveTab] = useState("Profile");
  const { userData, setUserData } = useContext(AuthContext) as AuthType;

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [username, setUsername] = useState(userData?.username || "");
  const [email, setEmail] = useState(userData?.username || "");

  const handleSaveProfile = () => {
    setUserData({ ...userData, username });
    alert("Profile updated!");
  };

  const handleLogout = async () => {
    await setUserData(null);
    alert("Logged out!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <View style={styles.section}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
            />
            <Button title="Save" onPress={handleSaveProfile} />
          </View>
        );

      case "Preferences":
        return (
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                thumbColor={darkMode ? "#7f56da" : "#ccc"}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                thumbColor={notifications ? "#7f56da" : "#ccc"}
              />
            </View>
          </View>
        );

      case "Account":
        return (
          <View style={styles.section}>
            <Text style={styles.infoText}>
              Manage your account and security settings.
            </Text>
            <Button title="Change Password" onPress={() => alert("Change Password flow")} />
            <View style={{ height: 12 }} />
            <Button title="Logout" onPress={handleLogout} color="red" />
          </View>
        );

      case "About":
        return (
          <View style={styles.section}>
            <Text style={styles.infoText}>📱 Todo App v1.0</Text>
            <Text style={styles.infoText}>Built with Expo & React Native</Text>
            <Text style={styles.infoText}>Developed by Your Team 🚀</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: "#7f56da",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#7f56da",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  section: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
});
