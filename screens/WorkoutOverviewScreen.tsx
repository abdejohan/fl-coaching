import { Image, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import placeholder_image from "../assets/images/placeholder_image.jpg";
import { Divider, useTheme, List, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/common/Button";
import { Headline, Paragraph, Subheading, Text } from "../typography";
import ParallaxScrollView from "../animations/ParallaxScrollView";
import { StatusBar } from "expo-status-bar";
// import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
// import { useEffect } from "react";
import { getYoutubeMeta } from "react-native-youtube-iframe";

interface WorkoutOverviewProps {
	navigation: any;
	route: any;
}
// This will use the video url in each workout to fetch thumbnail image
const fetchThumbnailUrl = async (videoUrl: string) => {
	const { thumbnail_url } = await getYoutubeMeta(
		videoUrl.substring(videoUrl.length - 11)
	);
	return thumbnail_url;
};

const WorkoutOverviewScreen: React.FC<WorkoutOverviewProps> = ({ navigation, route }) => {
	const { colors, roundness } = useTheme();
	const { workoutDay } = route.params;
	const [workoutThumbnails, setWorkoutThumbnails] = useState<Array<string> | undefined>();

	useEffect(() => {
		const fetchThumbnails = async () => {
			const [urls] = await Promise.all([
				Promise.all(
					workoutDay.workouts.map((workouts: any) => fetchThumbnailUrl(workouts.video))
				),
			]);
			setWorkoutThumbnails(urls);
		};
		fetchThumbnails();
	}, []);

	/** find all category ids
	 const { useAxios } = useAxiosAuthenticated();
	 * 
	 useEffect(() => {
		 if (workoutDay.workouts[0]) {
			 workoutDay.workouts.map((session) =>
			 console.log("Category id: " + session.category)
			 );
			}
		}, []);

			useEffect(() => {
		if (historyAllData) {
			//console.log(historyAllData);
		}
		if (historyAllError) {
			console.log(historyAllError);
		}
	}, [historyAllData]);
	
	// ENDPOINT FOR FETCHING WORKOUT HISTORY FOR A SPECIFIC EXERCISE
	const [{ data: historyAllData, loading: historyAllLoading, error: historyAllError }] =
	useAxios({
		url: "/v2/exercise/track/history/all",
		method: "POST",
		data: {
			scheme_day_id: workoutDay.id,
			exercise_id: workoutDay.workouts[0].category,
		},
	});
	*/

	return (
		<ParallaxScrollView
			contentContainerStyle={{ padding: 20, flex: 1, backgroundColor: colors.surface }}
			imageSource={placeholder_image}>
			<StatusBar style='light' />
			<View style={{ flex: 1 }}>
				<Headline style={{ color: colors.highlightText }}>Dagens träningspass</Headline>
				<Subheading>{workoutDay.name}</Subheading>
				<View style={styles.count}>
					<Ionicons
						name='barbell-outline'
						style={{ marginRight: 5, transform: [{ rotate: "135deg" }] }}
						color={colors.primary}
						size={14}
					/>
					<Paragraph>{Object.keys(workoutDay.workouts).length} övningar</Paragraph>
				</View>
				{workoutDay.workouts.map((workout: any, index: number) => (
					<View key={index}>
						<List.Item
							key={index}
							borderless
							style={{
								height: 76,
								justifyContent: "center",
								backgroundColor: colors.surface,
								padding: 0,
							}}
							title={workout.name}
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
							onPress={() => {
								navigation.navigate("WorkoutSession", {
									workouts: workoutDay.workouts,
									workoutDayID: workoutDay.id,
									workoutIndex: index,
								});
							}}
							description={() => (
								<Text style={{ fontFamily: "ubuntu-light", marginTop: 5 }}>
									{workout.sets.length} set
								</Text>
							)}
							left={() =>
								workoutThumbnails && (
									<View
										style={{
											height: 60,
											width: 60,
											overflow: "hidden",
											borderRadius: roundness,
										}}>
										<Image
											source={{ uri: workoutThumbnails[index] }}
											style={{
												height: 80,
												bottom: 10,
												width: 80,
											}}
										/>
									</View>
								)
							}
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
						/>
						{index + 1 !== workoutDay.workouts.length && <Divider />}
					</View>
				))}
			</View>
			<View>
				<Button
					onPress={() =>
						navigation.navigate("WorkoutSession", {
							workouts: workoutDay.workouts,
							workoutDayID: workoutDay.id,
						})
					}>
					Påbörja träningspass
				</Button>
				<Button backgroundColor='grey' onPress={() => navigation.goBack()}>
					Tillbaka
				</Button>
			</View>
		</ParallaxScrollView>
	);
};

export default WorkoutOverviewScreen;

const styles = StyleSheet.create({
	count: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
	},
});
