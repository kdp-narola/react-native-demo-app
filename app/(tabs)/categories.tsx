import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ExploreScreen() {
	return (
		<View style={styles.container}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Explore 123</ThemedText>
			</ThemedView>

			<ThemedText style={styles.text}>
				This app includes example code to help you get started.
			</ThemedText>

			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.content}>
					<Collapsible title="File-based routing" style={styles.collapsible}>
						<ThemedText>
							This app has two screens:{" "}
							<ThemedText type="defaultSemiBold">
								app/(tabs)/index.tsx
							</ThemedText>{" "}
							and{" "}
							<ThemedText type="defaultSemiBold">
								app/(tabs)/explore.tsx
							</ThemedText>
						</ThemedText>
						<ThemedText>
							The layout file in{" "}
							<ThemedText type="defaultSemiBold">
								app/(tabs)/_layout.tsx
							</ThemedText>{" "}
							sets up the tab navigator.
						</ThemedText>
						<ExternalLink href="https://docs.expo.dev/router/introduction">
							<ThemedText type="link">Learn more</ThemedText>
						</ExternalLink>
					</Collapsible>

					<Collapsible
						title="Android, iOS, and web support"
						style={styles.collapsible}
					>
						<ThemedText>
							You can open this project on Android, iOS, and the web. To open
							the web version, press{" "}
							<ThemedText type="defaultSemiBold">w</ThemedText> in the terminal
							running this project.
						</ThemedText>
					</Collapsible>

					<Collapsible title="Images" style={styles.collapsible}>
						<ThemedText>
							For static images, you can use the{" "}
							<ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
							<ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
							provide files for different screen densities
						</ThemedText>
						<Image
							source={require("@/assets/images/react-logo.png")}
							style={{ alignSelf: "center", width: 100, height: 100 }}
						/>
						<ExternalLink href="https://reactnative.dev/docs/images">
							<ThemedText type="link">Learn more</ThemedText>
						</ExternalLink>
					</Collapsible>

					<Collapsible title="Custom fonts" style={styles.collapsible}>
						<ThemedText>
							Open{" "}
							<ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to
							see how to load{" "}
							<ThemedText style={{ fontFamily: "SpaceMono" }}>
								custom fonts such as this one.
							</ThemedText>
						</ThemedText>
						<ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
							<ThemedText type="link">Learn more</ThemedText>
						</ExternalLink>
					</Collapsible>

					<Collapsible
						title="Light and dark mode components"
						style={styles.collapsible}
					>
						<ThemedText>
							This template has light and dark mode support. The{" "}
							<ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>{" "}
							hook lets you inspect what the user&apos;s current color scheme
							is, and so you can adjust UI colors accordingly.
						</ThemedText>
						<ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
							<ThemedText type="link">Learn more</ThemedText>
						</ExternalLink>
					</Collapsible>

					<Collapsible title="Animations" style={styles.collapsible}>
						<ThemedText>
							This template includes an example of an animated component. The{" "}
							<ThemedText type="defaultSemiBold">
								components/HelloWave.tsx
							</ThemedText>{" "}
							component uses the powerful{" "}
							<ThemedText type="defaultSemiBold">
								react-native-reanimated
							</ThemedText>{" "}
							library to create a waving hand animation.
						</ThemedText>
						{Platform.select({
							ios: (
								<ThemedText>
									The{" "}
									<ThemedText type="defaultSemiBold">
										components/ParallaxScrollView.tsx
									</ThemedText>{" "}
									component provides a parallax effect for the header image.
								</ThemedText>
							),
						})}
					</Collapsible>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		padding: 16,
		alignItems: "center",
		backgroundColor: "#fff",
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#fff",
	},
	content: {
		width: "100%",
		maxWidth: 400,
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		justifyContent: "center",
	},
	text: {
		marginBottom: 16,
	},
	collapsible: {
		alignSelf: "stretch",
		marginBottom: 12,
	},
});
