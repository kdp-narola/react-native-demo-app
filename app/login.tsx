import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import AuthContext, { AuthType } from "./Contexts/authContext";

const Login: React.FC = () => {
  const { setUserData, userData } = useContext(AuthContext) as AuthType;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userData) router.replace("/(tabs)/tasks");
  }, [userData]);

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    if (username === "admin" && password === "1234") {
      setUserData({ username });
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <View className="flex-1 flex-row p-6">
      <View className="w-1/2 h-full bg-gray-200 hidden lg:flex items-center justify-center">
        <Image
          source={require("../assets/Img/Logo.png")}
          className="w-1/2 h-1/2 lg:w-2/3 lg:h-2/3 resize-contain"
        />
      </View>

      <View className="w-full h-full flex flex-col justify-center items-start sm:min-w-[500px] sm:max-w-[500px] lg:min-w-[400px] lg:max-w-[400px] mx-auto">
        <Text className="text-4xl font-bold text-gray-800 mb-3">
          Welcome to Tasker
        </Text>
        <Text className="text-base text-gray-500 mb-6">
          Please, insert your information to access your tasks.
        </Text>

        {error ? (
          <Text className="text-red-600 mb-2">{error}</Text>
        ) : null}

        <Text className="text-gray-600 mb-1">Username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Insert your username"
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg border border-gray-400 px-2 text-gray-700 mb-4"
        />

        <Text className="text-gray-600 mb-1">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Insert your password"
          secureTextEntry
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg border border-gray-400 px-2 text-gray-700 mb-4"
        />

        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => setRemember(!remember)}
        >
          <View
            className={`w-4 h-4 border border-gray-700 mr-2 rounded ${
              remember ? "bg-[#7f56da]" : "bg-white"
            }`}
          />
          <Text className="text-gray-500">Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg bg-[#7f56da] flex items-center justify-center"
        >
          <Text className="text-white text-base font-medium">Sign In</Text>
        </TouchableOpacity>

        <Text className="text-gray-500 mt-3 text-center lg:text-left w-full">
          Don't have an account?{" "}
          <Text className="text-purple-600 font-bold">Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
