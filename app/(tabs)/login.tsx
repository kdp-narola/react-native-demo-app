import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable, Text, TextInput } from "react-native";

export default function LoginScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="chevron.left.forwardslash.chevron.right"
				/>
			}
		>
			<ThemedView>
				<ThemedText type="title">Login</ThemedText>
			</ThemedView>
			<ThemedView className="max-w-[400px] flex flex-col gap-5">
				<ThemedView className="w-full">
					<Text>UserName</Text>
					<TextInput className="mt-2 border border-gray-500 rounded h-10 px-2" />
				</ThemedView>
				<ThemedView className="w-full">
					<Text>Password</Text>
					<TextInput className="mt-2 border border-gray-500 rounded h-10 px-2" />
				</ThemedView>
				<ThemedView className="w-full">
					<Pressable className="bg-blue-500 rounded px-4 py-2 w-full">
						<Text className="text-white w-full text-center">Login</Text>
					</Pressable>
				</ThemedView>
			</ThemedView>
		</ParallaxScrollView>
	);
}
