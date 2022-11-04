import { ScrollView, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import ListItemBasic from "../components/common/ListItemBasic";
import TabBarView from "../components/common/TabBarView";
import { SceneMap } from "react-native-tab-view";
import { useEffect, useState } from "react";
import { Subheading } from "../typography";

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
		meal.products.forEach((product: any) => {
			if (product.description) {
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
	}, []);

	const FirstRoute = () => (
		<View style={{ flex: 1 }}>
			{meal?.products?.map((product: any, index: string) =>
				product?.description ? (
					<ListItem
						key={index}
						title={product.name}
						icon='fire'
						onPress={() =>
							navigation.navigate("Recipe", {
								dish: meal,
							})
						}
					/>
				) : null
			)}
		</View>
	);

	const SecondRoute = () => (
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
									descriptionRight={`${product.kcal} kcal`}
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

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	const [routes] = useState([
		{ key: "first", title: "Recept" },
		{ key: "second", title: "Ingredienser" },
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
