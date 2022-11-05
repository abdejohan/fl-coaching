import { ScrollView, View } from "react-native";
import { Divider, useTheme, List, IconButton } from "react-native-paper";
import { Text } from "../typography";
import { Ionicons } from "@expo/vector-icons";
import { Meal } from "../types/types";

interface MealProps {
	navigation: any;
	route: any;
}

const calculateTotalNutrientValue = (ingredients: Array<any>, unit: string) => {
	const sumOfNutrient = ingredients.reduce((accumulator, ingredient) => {
		if (typeof ingredient[unit] === "number") {
			return accumulator + (ingredient[unit] / 100) * ingredient.gram;
		}
	}, 0);
	return Math.round(sumOfNutrient);
};

const MealsScreen: React.FC<MealProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const { meals } = route.params;

	return (
		<ScrollView
			style={{ backgroundColor: colors.background }}
			contentContainerStyle={{ flex: 1, padding: 20 }}>
			<View
				style={{
					borderRadius: roundness,
					backgroundColor: colors.surface,
				}}>
				{meals.map((meal: Meal, index: number) => (
					<View key={index}>
						<List.Item
							key={index}
							borderless
							style={{
								backgroundColor: colors.surface,
								borderTopRightRadius: index === 0 ? roundness : undefined,
								borderTopLeftRadius: index === 0 ? roundness : undefined,
								borderBottomRightRadius:
									meals.length === index + 1 ? roundness : undefined,
								borderBottomLeftRadius:
									meals.length === index + 1 ? roundness : undefined,
								paddingHorizontal: 5,
								height: 76,
								justifyContent: "center",
								padding: 0,
							}}
							title={meal?.name}
							titleStyle={{
								fontSize: 16,
								color: colors.highlightText,
								fontFamily: "ubuntu-medium",
							}}
							onPress={() => navigation.navigate("Meal", { meal: meal, name: meal.name })}
							description={() => (
								<View style={{ flexDirection: "row", marginLeft: -3 }}>
									<Ionicons
										size={13}
										name='barbell-outline'
										color={colors.primary}
										style={{ transform: [{ rotate: "135deg" }], marginRight: 9 }}
									/>
									<Text style={{ fontFamily: "ubuntu-light", marginTop: 5 }}>
										{calculateTotalNutrientValue(meal.products, "kcal")} kcal
									</Text>
								</View>
							)}
							right={() => {
								return (
									<View style={{ justifyContent: "center" }}>
										<View
											style={{
												backgroundColor: colors.onSurface,
												width: 40,
												height: 40,
												justifyContent: "center",
												alignItems: "center",
												borderRadius: roundness,
												marginRight: 10,
											}}>
											<IconButton icon='arrow-right' size={20} color={colors.primary} />
										</View>
									</View>
								);
							}}
						/>
						{meals?.length !== index + 1 && <Divider />}
					</View>
				))}
			</View>
		</ScrollView>
	);
};

export default MealsScreen;
