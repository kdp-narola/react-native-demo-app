import { Categories, getCategoryByColor } from "@/data/Tasks";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

type Props = {
	visible: boolean;
	onClose: () => void;
	selectedCategory?: string;
	onCategorySelect: (category: string) => void;
};

const CategoryDrawer: React.FC<Props> = ({
	visible,
	onClose,
	selectedCategory,
	onCategorySelect,
}) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(0,0,0,0.5)",
					justifyContent: "flex-end",
				}}
			>
				<View
					style={{
						backgroundColor: "white",
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						maxHeight: "70%",
					}}
				>
					{/* Header */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							padding: 20,
						}}
					>
						<Text style={{ fontSize: 20, fontWeight: "600" }}>
							Select Category
						</Text>
						<TouchableOpacity onPress={onClose}>
							<Text style={{ fontSize: 18 }}>✕</Text>
						</TouchableOpacity>
					</View>

					{/* Category List */}
					<ScrollView style={{ padding: 20 }}>
						{Categories.map((category) => (
							<TouchableOpacity
								key={category.name}
								onPress={() => onCategorySelect(category.name)}
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									padding: 16,
									marginBottom: 8,
									borderRadius: 12,
									backgroundColor:
										selectedCategory === category.name ? "#EBF8FF" : "#F9FAFB",
									borderLeftWidth: selectedCategory === category.name ? 4 : 0,
									borderLeftColor: "#3B82F6",
								}}
							>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<View
										style={{
											width: 16,
											height: 16,
											borderRadius: 8,
											backgroundColor: getCategoryByColor(category.name),
											marginRight: 16,
										}}
									/>
									<Text>{category.name}</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

export default CategoryDrawer;
