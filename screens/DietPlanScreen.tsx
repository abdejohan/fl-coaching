import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import { useTheme, Card, IconButton, TouchableRipple } from "react-native-paper";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { useCallback, useEffect, useState } from "react";
import { Meal } from "../types/types";
import { Paragraph, Title } from "../typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import diet_workout_day from "../assets/images/diet_workout_day.jpg";
interface DietProps {
	navigation: any;
	route: any;
}

type DietPlan = {
	id: number;
	name: string;
	meals: Array<Meal>;
};

const calculateTotalNutrientValue = (ingredients: Array<any>, unit: string) => {
	const sumOfNutrient = ingredients.reduce((accumulator, ingredient) => {
		if (typeof ingredient[unit] === "number") {
			return accumulator + (ingredient[unit] / 100) * ingredient.gram;
		}
	}, 0);
	return Math.round(sumOfNutrient);
};

const DietPlanScreen: React.FC<DietProps> = ({ navigation, route }) => {
	const [refreshing, setRefreshing] = useState(false);
	const { useAxios } = useAxiosAuthenticated();
	const [dietPlanDays, setDietPlanDays] = useState<any>();
	const [allProducts, setAllProducts] = useState<Array<any>>([]);
	const { colors, roundness } = useTheme();

	// Fetches all diet plans
	const [{ data: dietPlansData, loading: dietPlansLoading, error: dietPlansError }] =
		useAxios({
			method: "GET",
			url: "/diet/list/get",
		});

	// Fetches diet plan with the help of id in data object
	const [
		{ data: dietPlanData, loading: dietPlanLoading, error: dietPlanError },
		fetchDietPlan,
	] = useAxios(
		{
			method: "POST",
			url: "/diet/get",
		},
		{ manual: true }
	);

	// This handles the first api response we get (url: "diet/list/get")
	useEffect(() => {
		if (dietPlansData) {
			dietPlansData[1] && fetchDietPlan({ data: { id: dietPlansData[1].id } });
		}
	}, [dietPlansData]);

	useEffect(() => {
		if (dietPlanData && dietPlanData.diet) {
			const parseDietDays = JSON.parse(dietPlanData.diet.days);
			setDietPlanDays(parseDietDays);
		}
	}, [dietPlanData, dietPlanError]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		if (dietPlansData[0]) {
			fetchDietPlan({ data: { id: dietPlansData[0].id } })
				.then(() => setRefreshing(false))
				.catch(() => {});
		} else {
			setRefreshing(false);
		}
	}, [dietPlansData]);

	useEffect(() => {
		if (dietPlanDays) {
			const allDays: Array<any> = [];
			dietPlanDays.map((day: any) => {
				const allProducts: Array<any> = [];
				day.meals.map((meal: Meal) => {
					meal.products.map((product) => allProducts.push(product));
				});
				allDays.push(allProducts);
			});
			setAllProducts(allDays);
		}
	}, [dietPlanDays]);

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: colors.background }]}
			refreshControl={
				<RefreshControl
					titleColor={colors.primary}
					colors={[colors.primary]}
					tintColor={colors.primary}
					progressBackgroundColor={colors.surface}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}>
			{dietPlanData &&
				!dietPlanLoading &&
				dietPlanDays?.map((day: DietPlan, index: number) => (
					<Card
						elevation={0}
						style={{ marginBottom: 40, borderRadius: roundness, overflow: "hidden" }}
						key={index}>
						<View style={{ borderRadius: roundness }}>
							<TouchableRipple
								style={{ borderRadius: roundness }}
								onPress={() =>
									navigation.navigate("Meals", { meals: day.meals, name: day.name })
								}>
								<View>
									<Card.Cover
										source={diet_workout_day}
										style={{
											borderTopEndRadius: roundness,
											borderTopStartRadius: roundness,
										}}
									/>
									<Card.Content style={{ padding: 20 }}>
										<View
											style={{ flexDirection: "row", justifyContent: "space-between" }}>
											<View>
												<Title style={{ marginBottom: 5 }}>{day?.name}</Title>
												{allProducts.length > 0 && (
													<Paragraph>
														P:{" "}
														{calculateTotalNutrientValue(allProducts[index], "protein")}g{" "}
														| K:{" "}
														{calculateTotalNutrientValue(allProducts[index], "carbs")}g |
														F: {calculateTotalNutrientValue(allProducts[index], "fat")}g |
														<Paragraph style={{ color: colors.primary }}>
															{" "}
															K: {calculateTotalNutrientValue(allProducts[index], "kcal")}
														</Paragraph>
													</Paragraph>
												)}
											</View>
											<View style={{ justifyContent: "center" }}>
												<View
													style={{
														backgroundColor: colors.onSurface,
														width: 40,
														height: 40,
														justifyContent: "center",
														alignItems: "center",
														borderRadius: roundness,
													}}>
													<IconButton
														icon='arrow-right'
														size={20}
														color={colors.primary}
													/>
												</View>
											</View>
										</View>
									</Card.Content>
								</View>
							</TouchableRipple>
						</View>
					</Card>
				))}
			{!dietPlanData && !dietPlanLoading && (
				<View style={{ paddingHorizontal: 50 }}>
					<Paragraph style={{ textAlign: "center" }}>
						Ojdå! Verkar som att du inte har något kostschema för tillfället. Kontakta din
						coach för mer information!{" "}
					</Paragraph>
					<MaterialCommunityIcons
						name='food-fork-drink'
						size={40}
						color={colors.text}
						style={{
							alignSelf: "center",
							margin: 10,
						}}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default DietPlanScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});

/**
 * 	const totalDailyCalories = (meals: Array<Meal>) => {
		let calorieCount = 0;
		meals?.forEach((meal: Meal) => {
			meal?.products?.forEach((product: Product) => {
				calorieCount += product.kcal;
			});
		});
		return calorieCount;
	};
 * 
 * 
 * 
 * 	const totalMealCalories = (products: Array<Product>) => {
		let mealCalorieCount = 0;
		products?.forEach((product: Product) => {
			mealCalorieCount += product.kcal;
		});
		if (isFinite(mealCalorieCount)) {
			return mealCalorieCount;
		}
		return 0;
	};

	const totalMealCaloriePercentage = (products: Array<Product>) => {
		let productCalorieCount = 0;
		products?.forEach((product: Product) => {
			productCalorieCount += product.kcal;
		});
		const perc = (productCalorieCount / totalDailyCalories) * 100; // calculate percentage
		const roundedPercentage = Math.round(perc * 10) / 10; // rounds to one decimal
		if (isFinite(roundedPercentage)) {
			return roundedPercentage;
		}
		return 0;
	};
 */
