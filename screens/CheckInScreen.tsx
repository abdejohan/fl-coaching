import { Alert, StyleSheet, View, Keyboard } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Button from "../components/common/Button";
import { useTheme, ProgressBar } from "react-native-paper";
import { useContext, useEffect, useRef, useState } from "react";
import WeeklyReport from "../context/WeeklyReport";
import { Headline, Paragraph } from "../typography";
import Measures from "../components/checkIn/Measures";
import UpcomingWeek from "../components/checkIn/UpcomingWeek";
import WeeklyEvaluation from "../components/checkIn/WeeklyEvaluation";
import GymStrength from "../components/checkIn/GymStrength";
import SleepStatus from "../components/checkIn/SleepStatus";
import WeekSchedule from "../components/checkIn/WeekSchedule";
import Feedback from "../components/checkIn/Feedback";

interface SliderProps {
	navigation?: any;
}

const checkInSlider = [
	{ key: 1, title: "Veckans mått och bilder *", component: <Measures /> },
	{
		key: 2,
		title: "Hur upplever du att din vecka varit? *",
		component: <WeeklyEvaluation />,
	},
	{
		key: 3,
		title: "Hur upplever du att hungern har varit? *",
		component: <UpcomingWeek />,
	},
	{ key: 4, title: "Hur har styrkan på gymmet varit? *", component: <GymStrength /> },
	{ key: 5, title: "Hur har din sömn varit? *", component: <SleepStatus /> },
	{ key: 6, title: "Hur mycket har du följt planen? *", component: <WeekSchedule /> },
	{ key: 7, title: "Övriga saker du vill ta upp", component: <Feedback /> },
];

const CheckInScreen: React.FC<SliderProps> = ({ navigation }) => {
	const { notAllFieldsAreValid, setNotAllFieldAreValid, submitWeeklyReport } =
		useContext(WeeklyReport);
	const [submitButtonText, setSubmitButtonText] = useState<string>("Skicka in!");
	const [slideIndex, setSlideIndex] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const slider = useRef<any>(null);
	const { colors } = useTheme();

	// slider.current.goToSlide(1, true)
	useEffect(() => {
		setProgress(slideIndex / (checkInSlider.length - 1));
	}, [slideIndex]);

	const renderItem = ({ item, index }: any) => {
		return (
			<View style={styles.container}>
				<Headline
					style={{
						alignSelf: "center",
						color: colors.highlightText,
						marginBottom: 20,
						textAlign: "center",
						width: "70%",
					}}>
					{checkInSlider[index].title}
				</Headline>
				{item.component}
			</View>
		);
	};

	const introDone = async () => {
		if (!notAllFieldsAreValid) {
			setNotAllFieldAreValid(true);
			setSubmitButtonText("Skickar..");
			const submitResults = await submitWeeklyReport();
			if (submitResults === "success") {
				navigation.navigate("Start", { status: "success" });
			}
			if (submitResults === "error") {
				Alert.alert("Något gick tyvärr fel. Försök igen!");
				navigation.navigate("Start");
			}
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<View style={styles.progress}>
				<ProgressBar
					progress={progress}
					color={colors.primary}
					style={{ height: 10, backgroundColor: colors.surface, borderRadius: 5 }}
				/>
			</View>
			<AppIntroSlider
				ref={(ref) => (slider.current = ref)}
				onDone={introDone}
				bottomButton
				dotStyle={{ backgroundColor: colors.surface, marginTop: 20, marginBottom: 20 }}
				activeDotStyle={{
					backgroundColor: colors.primary,
					marginTop: 20,
					marginBottom: 20,
				}}
				onSlideChange={(index) => {
					Keyboard.dismiss();
					setSlideIndex(index);
				}}
				renderDoneButton={() => (
					<>
						<Button style={{ marginBottom: 5 }} disable={notAllFieldsAreValid}>
							{submitButtonText}
						</Button>
						<Paragraph style={{ marginLeft: 10 }}>* = Obligatoriskt fält</Paragraph>
					</>
				)}
				renderNextButton={() => (
					<>
						<Button style={{ marginBottom: 5 }}>Forsätt</Button>
						<Paragraph style={{ marginLeft: 10 }}>* = Obligatoriskt fält</Paragraph>
					</>
				)}
				renderItem={renderItem}
				data={checkInSlider}
			/>
		</View>
	);
};

export default CheckInScreen;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginBottom: 100,
		flex: 1,
	},
	progress: {
		marginHorizontal: 25,
	},
	title: {
		fontFamily: "ubuntu-medium",
		fontSize: 18,
		marginLeft: 10,
	},
});
