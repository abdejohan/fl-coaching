import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";
import ListItem from "../components/common/ListItem";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { useCallback, useContext, useEffect, useState } from "react";
import { Meal } from "../types/types";
import { Paragraph } from "../typography";
import AuthContext from "../context/Auth";
import { Ionicons } from "@expo/vector-icons";

interface DietProps {
	navigation: any;
	route: any;
}

type DietPlan = {
	id: number;
	name: string;
	meals: Array<Meal>;
};

const DietPlanScreen: React.FC<DietProps> = ({ navigation, route }) => {
	const [refreshing, setRefreshing] = useState(false);
	const { useAxios } = useAxiosAuthenticated();
	const [dietPlanDays, setDietPlanDays] = useState<any>();
	const { colors } = useTheme();
	const { user } = useContext(AuthContext);
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
			fetchDietPlan({ data: { id: dietPlansData[0].id } });
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
		fetchDietPlan({ data: { id: dietPlansData[0].id } })
			.then(() => setRefreshing(false))
			.catch(() => {});
	}, [dietPlansData]);

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
				dietPlanDays?.map((day: DietPlan, index: string) => (
					<ListItem
						key={index}
						title={day?.name}
						icon='fire'
						onPress={() =>
							navigation.navigate("Meals", { meals: day.meals, name: day.name })
						}
					/>
				))}
			{!dietPlanData && !dietPlanLoading && (
				<View>
					<Paragraph style={{ textAlign: "center" }}>
						Ojdå! Verkar som att du inte har något kostschema för tillfället. Kontakta din
						coach för mer information!{" "}
					</Paragraph>
					<Ionicons
						name='barbell-outline'
						style={{
							alignSelf: "center",
							margin: 5,
						}}
						color={colors.text}
						size={40}
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
