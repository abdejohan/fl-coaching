import {
	StyleSheet,
	View,
	ImageBackground,
	Linking,
	TouchableOpacity,
} from "react-native";
import intro_background from "../assets/images/intro_background.jpg";
import { useTheme } from "react-native-paper";
import Button from "../components/common/Button";
import Constants from "expo-constants";
import { Headline, Text } from "../typography";
import { StatusBar } from "expo-status-bar";

interface IntroProps {
	navigation: any;
}

const IntroScreen: React.FC<IntroProps> = ({ navigation }) => {
	const { colors } = useTheme();

	return (
		<ImageBackground source={intro_background} style={{ flex: 1 }}>
			<StatusBar style='light' />
			<View style={[styles.innerContainer, { backgroundColor: colors.darkestfade }]}>
				<Headline
					style={{
						color: colors.white,
						fontSize: 50,
						lineHeight: 50,
						textAlign: "center",
					}}>
					Vägen mot en hälsosam livsstil
				</Headline>
				<Headline
					style={{
						color: colors.white,
						fontFamily: "ubuntu-light",
						textAlign: "center",
						marginBottom: 50,
					}}>
					Tillsammans startar vi din resa mot dina mål här.
				</Headline>
				<Button
					onPress={() => navigation.navigate("Login")}
					style={{ marginBottom: 10, marginTop: 20 }}>
					Logga in
				</Button>
				<TouchableOpacity
					onPress={() => Linking.openURL(Constants!.manifest!.extra!.coachSiteUrl)}
					style={{ padding: 10 }}>
					<Text style={{ color: colors.white, textAlign: "center" }}>
						Ansök om coaching
					</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

export default IntroScreen;

const styles = StyleSheet.create({
	innerContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingBottom: 50,
		justifyContent: "flex-end",
	},
});
