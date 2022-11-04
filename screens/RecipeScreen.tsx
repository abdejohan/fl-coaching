import { Dimensions, StyleSheet, View } from "react-native";
import recipeImg from "../assets/images/recipe-image.jpg";
import { useTheme, IconButton, Divider } from "react-native-paper";
import HeroScrollView from "../components/common/HeroScrollView";
import Button from "../components/common/Button";
import ListItemBasic from "../components/common/ListItemBasic";
import { Caption, Paragraph, Text, Title } from "../typography";
import Donut from "../animations/Donut";
import Count from "../animations/Count";

interface RecipeProps {
	navigation: any;
	route: any;
}

const calculateCookingTime = (preparation_time: string, make_time: string) => {
	const prepTime = parseInt(preparation_time);
	const makeTime = parseInt(make_time);
	const totalCookingTime = prepTime + makeTime;
	if (!isNaN(totalCookingTime)) return totalCookingTime;
	return;
};

const RecipeScreen: React.FC<RecipeProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const screenWidth = Dimensions.get("window").width;
	const { recipe } = route.params;
	const ingredients = JSON.parse(recipe.product_ids);

	return (
		<HeroScrollView
			title={recipe?.name}
			image={recipeImg}
			straightLine
			modal='information'
			faded
			button={<Button onPress={() => navigation.goBack()}>Tillbaka</Button>}>
			<View style={styles.subheader}>
				<IconButton
					style={{ padding: 0, margin: 0 }}
					icon='fire'
					color={colors.primary}
					size={15}
				/>
				<Paragraph>{recipe?.kcal} kcal</Paragraph>
				<IconButton
					style={{ padding: 0, margin: 0, marginLeft: 10 }}
					icon='clock-outline'
					color={colors.primary}
					size={15}
				/>
				<Paragraph>
					{calculateCookingTime(recipe.preparation_time, recipe?.make_time)} min
				</Paragraph>
			</View>
			<Paragraph>{recipe?.description}</Paragraph>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginVertical: 20,
				}}>
				{/** -------- PROTEIN -------- */}
				<View
					style={{
						paddingVertical: 15,
						backgroundColor: colors.background,
						alignItems: "center",
						borderRadius: roundness,
						flexGrow: 2,
						marginRight: 10,
					}}>
					<Donut
						strokeWidth={6}
						color={colors.primary}
						delay={200}
						percentage={recipe?.protein}
						radius={screenWidth / 10}>
						<View
							style={[
								StyleSheet.absoluteFillObject,
								{ justifyContent: "center", alignItems: "center", flexDirection: "row" },
							]}>
							<Count
								delay={200}
								stop={recipe.protein}
								style={{
									color: colors.highlightText,
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
								}}
							/>
							<Text
								style={{
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
									color: colors.highlightText,
								}}>
								%
							</Text>
						</View>
					</Donut>

					<Caption style={{ marginTop: 5 }}>Protein</Caption>
				</View>
				{/** -------- CARBS -------- */}
				<View
					style={{
						paddingVertical: 15,
						backgroundColor: colors.background,
						alignItems: "center",
						borderRadius: roundness,
						flexGrow: 2,
						marginRight: 10,
					}}>
					<Donut
						strokeWidth={6}
						color={colors.primary}
						delay={200}
						percentage={recipe?.carbs}
						radius={screenWidth / 10}>
						<View
							style={[
								StyleSheet.absoluteFillObject,
								{
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "row",
								},
							]}>
							<Count
								delay={200}
								stop={recipe?.carbs}
								style={{
									color: colors.highlightText,
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
								}}
							/>
							<Text
								style={{
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
									color: colors.highlightText,
								}}>
								%
							</Text>
						</View>
					</Donut>
					<Caption style={{ marginTop: 5 }}>Kolhydrater</Caption>
				</View>
				{/** -------- FAT -------- */}
				<View
					style={{
						paddingVertical: 15,
						backgroundColor: colors.background,
						alignItems: "center",
						borderRadius: roundness,
						flexGrow: 2,
					}}>
					<Donut
						strokeWidth={6}
						color={colors.primary}
						delay={200}
						percentage={recipe?.fat}
						radius={screenWidth / 10}>
						<View
							style={[
								StyleSheet.absoluteFillObject,
								{ justifyContent: "center", alignItems: "center", flexDirection: "row" },
							]}>
							<Count
								delay={200}
								stop={recipe?.fat}
								style={{
									color: colors.highlightText,
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
								}}
							/>
							<Text
								style={{
									fontSize: screenWidth / 22,
									fontFamily: "ubuntu-medium",
									color: colors.highlightText,
								}}>
								%
							</Text>
						</View>
					</Donut>
					<Caption style={{ marginTop: 5 }}>Fett</Caption>
				</View>
			</View>
			{ingredients &&
				ingredients.map((ingredient: any, index: number) => (
					<View key={index}>
						<ListItemBasic
							title={ingredient?.name}
							descriptionLeft={`${ingredient?.protein}g${
								ingredient?.unit ? " \u00B7 " + ingredient?.unit : " "
							}`}
							descriptionRight={`${ingredient?.kcal} kcal`}
						/>
						{ingredients.length !== index + 1 && <Divider style={{ marginLeft: 7 }} />}
					</View>
				))}

			<Title
				style={{
					color: colors.highlightText,
					fontFamily: "ubuntu-medium",
					marginTop: 30,
					marginLeft: 7,
				}}>
				Gör såhär:
			</Title>
			<Paragraph
				style={{
					marginLeft: 10,
				}}>
				{recipe?.comment}
			</Paragraph>
		</HeroScrollView>
	);
};

export default RecipeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	subheader: {
		left: -4,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
});
