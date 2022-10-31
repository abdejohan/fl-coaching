import { useContext } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Divider, useTheme } from "react-native-paper";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import RadioButton from "../common/RadioButton";
import { Headline, Subheading } from "../../typography";

const GymStrength: React.FC = () => {
	const { colors } = useTheme();
	const {
		howHasYourGymStrenthBeen,
		setHowHasYourGymStrenthBeen,
		howHasYourGymStrenthBeenComment,
		setHowHasYourGymStrenthBeenComment,
	} = useContext(WeeklyReport);

	return (
		<KeyboardAwareScrollView
			enableOnAndroid
			keyboardShouldPersistTaps='handled'
			style={{ marginBottom: 30 }}
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<Headline style={{ color: colors.highlightText, textAlign: "center" }}>
				Hur har styrkan på
			</Headline>
			<Headline
				style={{ color: colors.highlightText, marginBottom: 20, textAlign: "center" }}>
				gymmet varit? *
			</Headline>
			<Divider style={{ backgroundColor: colors.primary, marginBottom: 20 }} />
			<Subheading style={{ color: colors.highlightText, marginBottom: 5 }}>
				Välj ett svar
			</Subheading>
			<RadioButton
				value='Exemplarisk!'
				status={howHasYourGymStrenthBeen}
				onPress={() => setHowHasYourGymStrenthBeen("Exemplarisk!")}
			/>
			<RadioButton
				value='Bra'
				status={howHasYourGymStrenthBeen}
				onPress={() => setHowHasYourGymStrenthBeen("Bra")}
			/>
			<RadioButton
				value='Mindre bra'
				status={howHasYourGymStrenthBeen}
				onPress={() => setHowHasYourGymStrenthBeen("Mindre bra")}
			/>
			<RadioButton
				value='Dålig'
				status={howHasYourGymStrenthBeen}
				onPress={() => setHowHasYourGymStrenthBeen("Dålig")}
			/>
			<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
				Frivillig kommentar
			</Subheading>
			<InputValidation
				value={howHasYourGymStrenthBeenComment?.text}
				onValidation={(valid: boolean, text) =>
					setHowHasYourGymStrenthBeenComment({ valid, text })
				}
				placeholder='Fritext'
				maxLength={255}
				returnKeyType='done'
				multiline
				numberOfLines={6}
			/>
		</KeyboardAwareScrollView>
	);
};

export default GymStrength;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		marginHorizontal: 20,
	},
});
