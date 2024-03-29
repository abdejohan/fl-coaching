import { Image, ScrollView, View } from "react-native";
import { Divider, useTheme, List, IconButton } from "react-native-paper";
import ListItemBasic from "../components/common/ListItemBasic";
import TabBarView from "../components/common/TabBarView";
import { SceneMap } from "react-native-tab-view";
import { useEffect, useState } from "react";
import { Subheading, Text } from "../typography";
import { Ionicons } from "@expo/vector-icons";
import recipe_placeholder_image from "../assets/images/recipe_placeholder_image.jpg";

interface DietProps {
	navigation: any;
	route: any;
}

type Nutrients = {
	carbs: number;
	protein: number;
	fat: number;
};

type Ingredient = {
	id: number;
	name: string;
	comment: string;
	video: string;
	products: Array<any>;
	kcal: number;
	gram: string;
	carbs: number;
	protein: number;
	fat: number;
	created_at: string;
	updated_at: string;
	allergies: string;
	unitgram: string;
	unit: string;
	category: number;
	grams: string;
	uid: string;
};

const MealScreen: React.FC<DietProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const { meal } = route.params;
	const [ingredients, setIngredients] = useState<Array<Ingredient> | undefined>();
	const [numberOfRecipes, setNumberOfRecipes] = useState<number>(0);
	const [sumOfRecipeNutrients, setSumOfRecipeNutrients] = useState<Nutrients>({
		carbs: 0,
		protein: 0,
		fat: 0,
	});

	const calculateTotalNutrientValue = (ingredients: Array<any>, unit: string) => {
		const sumOfNutrient = ingredients.reduce((accumulator, ingredient) => {
			if (typeof ingredient[unit] === "number") {
				return accumulator + (ingredient[unit] / 100) * ingredient.gram;
			}
		}, 0);
		//@ts-ignore
		return Math.round(sumOfNutrient + sumOfRecipeNutrients[unit]);
	};

	useEffect(() => {
		const arrayOfIngredients: Array<Ingredient> = [];
		let recipeCount = 0;
		meal.products.forEach((product: any) => {
			if (product.description) {
				recipeCount += 1;
				setSumOfRecipeNutrients({
					carbs: sumOfRecipeNutrients.carbs + product.carbs,
					protein: sumOfRecipeNutrients.protein + product.protein,
					fat: sumOfRecipeNutrients.fat + product.fat,
				});
			} else {
				arrayOfIngredients.push(product);
			}
		});

		setIngredients(arrayOfIngredients);
		setNumberOfRecipes(recipeCount);
	}, []);

	const FirstRoute = () => (
		<View style={{ flex: 1 }}>
			<View style={{ backgroundColor: colors.surface, borderRadius: roundness }}>
				{meal?.products?.map(
					(product: any, index: string) =>
						!product?.description && (
							<View key={index}>
								<ListItemBasic
									style={{ padding: 10, marginRight: 10 }}
									title={product.name}
									descriptionLeft={`${product.gram}g`} // dot: \u00B7
									descriptionRight={`${(product.kcal / 100) * product.gram} kcal`}
								/>
								{meal?.products?.length !== index + 1 && (
									<Divider style={{ width: "93%", alignSelf: "center" }} />
								)}
							</View>
						)
				)}
			</View>
		</View>
	);

	const SecondRoute = () => (
		<View style={{ backgroundColor: colors.surface, borderRadius: roundness }}>
			{meal?.products?.map((dish: any, index: number) =>
				dish?.description ? (
					<View key={index}>
						<List.Item
							borderless
							style={{
								backgroundColor: colors.surface,
								borderTopRightRadius: index === 0 ? roundness : undefined,
								borderTopLeftRadius: index === 0 ? roundness : undefined,
								borderBottomRightRadius:
									numberOfRecipes === index + 1 ? roundness : undefined,
								borderBottomLeftRadius:
									numberOfRecipes === index + 1 ? roundness : undefined,
								padding: 10,
								height: 76,
								justifyContent: "center",
							}}
							title={dish.name}
							titleStyle={{
								marginLeft: 5,
								paddingRight: 10,
								fontSize: 16,
								color: colors.highlightText,
								fontFamily: "ubuntu-medium",
							}}
							onPress={() =>
								navigation.navigate("Recipe", {
									recipe: dish,
								})
							}
							description={() => (
								<View style={{ flexDirection: "row", marginLeft: 2 }}>
									<Ionicons
										size={13}
										name='barbell-outline'
										color={colors.primary}
										style={{ transform: [{ rotate: "135deg" }], marginRight: 9 }}
									/>
									<Text style={{ fontFamily: "ubuntu-light", marginTop: 5 }}>
										{typeof dish.kcal === "number" && Math.round(dish.kcal)} kcal
									</Text>
								</View>
							)}
							right={() => (
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
							)}
							left={() => (
								<Image
									source={dish.image ? { uri: dish.image } : recipe_placeholder_image}
									style={{
										height: 60,
										width: 60,
										borderRadius: roundness,
									}}
								/>
							)}
						/>
						{numberOfRecipes !== index + 1 && <Divider />}
					</View>
				) : null
			)}
		</View>
	);

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	const [routes] = useState([
		{ key: "first", title: "Ingredienser" },
		{ key: "second", title: "Recept" },
	]);

	return (
		<ScrollView
			style={{ backgroundColor: colors.background }}
			contentContainerStyle={{ flex: 1, padding: 20 }}>
			<TabBarView renderScene={renderScene} routes={routes} />
			<View style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}>
				<Subheading>
					{`${
						ingredients && calculateTotalNutrientValue(ingredients, "carbs")
					}g Kolhydrater \u00B7 `}
				</Subheading>
				<Subheading>
					{`${
						ingredients && calculateTotalNutrientValue(ingredients, "fat")
					}g Fett \u00B7 `}
				</Subheading>
				<Subheading>
					{`${
						ingredients && calculateTotalNutrientValue(ingredients, "protein")
					}g Protein`}
				</Subheading>
			</View>
		</ScrollView>
	);
};

export default MealScreen;
