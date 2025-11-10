import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      if (!email || !password) {
        setError("Please enter a email and password");
        return;
      }
      await signup({ username, email, password });
      setError("");
      router.push("/tasks");
    } catch (err: any) {
      setError(`Signup failed ${err.response?.data?.error || "Something went wrong"}`);
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
          Create Your Account
        </Text>
        <Text className="text-base text-gray-500 mb-6">
          Fill in your details to get started with Tasker.
        </Text>

        {error ? (
          <Text className="text-red-600 mb-2">{error}</Text>
        ) : null}

        <Text className="text-gray-600 mb-1">Username</Text>
        <TextInput
          id="username"
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg border border-gray-400 px-2 text-gray-700 mb-4"
        />

        <Text className="text-gray-600 mb-1">Email</Text>
        <TextInput
          id="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg border border-gray-400 px-2 text-gray-700 mb-4"
        />

        <Text className="text-gray-600 mb-1">Password</Text>
        <TextInput
          id="password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg border border-gray-400 px-2 text-gray-700 mb-4"
        />

        <TouchableOpacity
          onPress={handleSignup}
          className="w-full sm:w-[500px] lg:w-72 h-12 rounded-lg bg-[#7f56da] flex items-center justify-center"
        >
          <Text className="text-white text-base font-medium">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="mt-3 w-full"
        >
          <View className="flex flex-row">
            <Text className="text-gray-600">Already have an account? </Text>
            <Text className="text-purple-600 font-bold">Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
