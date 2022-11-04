import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, ScrollView, View, RefreshControl } from "react-native";
import { IconButton, useTheme, List, Text, Divider } from "react-native-paper";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { useCallback, useState } from "react";
import { Paragraph, Subheading } from "../typography";

interface WorkoutSchemaProps {
	navigation: any;
	route: any;
}

const WorkoutScreen: React.FC<WorkoutSchemaProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const { useAxios } = useAxiosAuthenticated();
	const [refreshing, setRefreshing] = useState(false);
	const [
		{ data: workoutData, loading: workoutLoading, error: workoutError },
		fetchWorkoutSchemas,
	] = useAxios({
		url: "/v2/workout/list",
	});

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetchWorkoutSchemas()
			.then(() => setRefreshing(false))
			.catch(() => {});
	}, []);

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
			<View style={{ borderRadius: roundness, backgroundColor: colors.surface }}>
				{workoutData &&
					!workoutLoading &&
					workoutData[0]?.workout_days?.map((day: any, index: number) => (
						<View key={index}>
							<List.Item
								key={index}
								borderless
								style={[
									styles.listItem,
									{
										backgroundColor: colors.surface,
										borderTopRightRadius: index === 0 ? roundness : undefined,
										borderTopLeftRadius: index === 0 ? roundness : undefined,
										borderBottomRightRadius:
											workoutData[0]?.workout_days?.length === index + 1
												? roundness
												: undefined,
										borderBottomLeftRadius:
											workoutData[0]?.workout_days?.length === index + 1
												? roundness
												: undefined,
										paddingHorizontal: 5,
									},
								]}
								title={day.name}
								titleStyle={{
									fontSize: 16,
									color: colors.highlightText,
									fontFamily: "ubuntu-medium",
								}}
								descriptionStyle={{
									color: colors.text,
									fontSize: 16,
									fontFamily: "ubuntu-light",
								}}
								onPress={() =>
									day?.workouts?.length > 0
										? navigation.navigate("WorkoutOverview", { workoutDay: day })
										: null
								}
								description={() => {
									if (day?.workouts?.length > 0) {
										return (
											<View style={{ flexDirection: "row", marginLeft: -3 }}>
												<Ionicons
													size={13}
													name='barbell-outline'
													color={colors.primary}
													style={{ transform: [{ rotate: "135deg" }], marginRight: 9 }}
												/>
												<Text style={{ fontFamily: "ubuntu-light", marginTop: 5 }}>
													{day?.workouts?.length} övningar
												</Text>
											</View>
										);
									}
								}}
								right={() => {
									if (day?.workouts?.length > 0) {
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
													<IconButton
														icon='arrow-right'
														size={18}
														color={colors.primary}
													/>
												</View>
											</View>
										);
									}
								}}
							/>
							{workoutData[0]?.workout_days?.length !== index + 1 && <Divider />}
						</View>
					))}
			</View>
			{workoutData?.length === 0 && !workoutLoading && (
				<View style={{ paddingTop: 50 }}>
					<Subheading style={{ textAlign: "center", fontSize: 16, marginBottom: 5 }}>
						Hittade inget!
					</Subheading>
					<Paragraph style={{ textAlign: "center", paddingHorizontal: 40 }}>
						Tråkigt nog ser det ut som att du inte har några träningspass för tillfället.
					</Paragraph>
					<Paragraph style={{ textAlign: "center" }}>
						Kontakta din coach för mer information!
					</Paragraph>
					<Ionicons
						name='barbell-outline'
						style={{
							alignSelf: "center",
							margin: 5,
							marginTop: 50,
						}}
						color={colors.text}
						size={40}
					/>
				</View>
			)}
		</ScrollView>
	);
};

export default WorkoutScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	listItem: {
		height: 76,
		justifyContent: "center",
		padding: 0,
	},
});
