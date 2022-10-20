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

const calculateTotalNutrientValue = (ingredients: Array<any>, unit: string) => {
	const sumOfNutrient = ingredients.reduce((accumulator, ingredient) => {
		if (typeof ingredient[unit] === "number") {
			return accumulator + (ingredient[unit] / 100) * ingredient.gram;
		}
	}, 0);
	return Math.round(sumOfNutrient);
};

const MealsScreen: React.FC<DietProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const { meals } = route.params;
	const [ingredients, setIngredients] = useState<Array<{}>>([]);

	useEffect(() => {
		meals.map((meal: any) => {
			!meal.products[0].description && setIngredients(meal.products);
		});
	}, [meals]);

	const FirstRoute = () => (
		<View style={{ flex: 1 }}>
			{meals?.map((meal: any, index: string) =>
				meal.products[0].description ? (
					<ListItem
						key={index}
						title={meal?.name}
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
			{meals?.map((meal: any, index: string) => (
				<View
					key={index}
					style={{ backgroundColor: colors.surface, borderRadius: roundness }}>
					{!meal.products[0].description
						? meal.products.map((dish: any, dishIndex: number) => (
								<>
									<ListItemBasic
										style={{ padding: 10, marginRight: 10 }}
										title={dish.name}
										descriptionLeft={`${dish.gram}g`} // dot: \u00B7
										descriptionRight={`${dish.kcal} kcal`}
									/>
									{meal?.products?.length !== dishIndex + 1 && (
										<Divider style={{ width: "93%", alignSelf: "center" }} />
									)}
								</>
						  ))
						: null}
				</View>
			))}
			<View style={{ flexDirection: "row", justifyContent: "center", padding: 20 }}>
				<Subheading>
					{`${calculateTotalNutrientValue(ingredients, "carbs")}g Kolhydrater \u00B7 `}
				</Subheading>
				<Subheading>
					{`${calculateTotalNutrientValue(ingredients, "fat")}g Fett \u00B7 `}
				</Subheading>
				<Subheading>
					{`${calculateTotalNutrientValue(ingredients, "protein")}g Protein`}
				</Subheading>
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
		</ScrollView>
	);
};

export default MealsScreen;
