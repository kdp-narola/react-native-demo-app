import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please enter email and password");
        return;
      }
      await login(email, password);
      setError("");
      router.push("/tasks");
    } catch (err: any) {
      setError(`Login failed ${err.response?.data?.error || "Something went wrong"}`);
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
          Please, login to access your dashboard.
        </Text>

        {error ? (
          <Text className="text-red-600 mb-2">{error}</Text>
        ) : null}

        <Text className="text-gray-600 mb-1">Email</Text>
        <TextInput
          id="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Insert your email"
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg border border-gray-400 px-2 text-gray-700 mb-4"
        />

        <Text className="text-gray-600 mb-1">Password</Text>
        <TextInput
          id="password"
          value={password}
          onChangeText={setPassword}
          placeholder="Insert your password"
          secureTextEntry
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg border border-gray-400 px-2 text-gray-700 mb-4"
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg bg-[#7f56da] flex items-center justify-center"
        >
          <Text className="text-white text-base font-medium">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/signup')}
          className="text-gray-500 mt-3 text-center lg:text-left w-full"
        >
          <View className="flex w-full flex-row">
            <Text>Don't have an account?{" "}</Text>
            <Text className="text-purple-600 font-bold">Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
