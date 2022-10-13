import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Button from "./common/Button";
import intro_background from "../assets/images/intro_background.jpg";
import slider_background2 from "../assets/images/slider_background2.jpg";
import slider_background3 from "../assets/images/slider_background3.jpg";
import slider_background4 from "../assets/images/slider_background4.jpg";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Headline, Subheading } from "../typography";

interface SliderProps {
	navigation?: any;
}

const slides = [
	{
		key: 1,
		title: "Välkommen",
		text: "Inom 5 dagar kommer du att ha tillgång till ditt skräddarsydda program i appen. Allt är personligt och anpassat efter dig och dina mål.",
		image: intro_background,
	},
	{
		key: 2,
		title: "Kostplan",
		text: 'Din kostplan kommer du att finna under "fliken..."',
		image: slider_background2,
	},
	{
		key: 3,
		title: "Träningsplan",
		text: "I din träningsplan kommer du att kunna dokumentera och logga alla dina träningspass så att du alltid kan prestera lite bättre än förra träningspasset.",
		image: slider_background3,
	},
	{
		key: 4,
		title: "Filosofi",
		text: "Vår filosofi är att god kosthållning och fysiskt aktivitet tillsammans med mental träning är nyckeln till en hållbar och hälsosam livsstil.",
		image: slider_background4,
	},
];

const IntroSlider: React.FC<SliderProps> = ({ navigation }) => {
	const { colors } = useTheme();

	const renderItem = ({ item }: any) => {
		return (
			<ImageBackground style={{ flex: 1 }} source={item.image}>
				<View style={[styles.container, { backgroundColor: colors.darkestfade }]}>
					<Headline
						style={{
							color: colors.white,
							fontSize: 50,
							lineHeight: 50,
							textAlign: "center",
						}}>
						{item.title}
					</Headline>
					<Subheading
						style={{
							color: colors.white,
							fontSize: 16,
							textAlign: "center",
							paddingHorizontal: 40,
						}}>
						{item.text}
					</Subheading>
				</View>
			</ImageBackground>
		);
	};

	const introDone = async () => {
		try {
			await AsyncStorage.setItem("SEEN_INTRO", "true");
		} catch (e) {
		} finally {
			navigation.navigate("Start");
		}
	};

	return (
		<>
			<StatusBar style='light' />
			<AppIntroSlider
				onDone={introDone}
				bottomButton
				renderNextButton={() => <Button>Nästa</Button>}
				renderDoneButton={() => <Button>Påbörja resan!</Button>}
				renderItem={renderItem}
				dotStyle={{ backgroundColor: colors.neutral }}
				data={slides}
			/>
		</>
	);
};

export default IntroSlider;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "flex-end",
		alignItems: "center",
		paddingBottom: 200,
	},
});
