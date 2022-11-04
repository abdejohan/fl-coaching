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
		howHasYourGymStrengthBeen,
		setHowHasYourGymStrengthBeen,
		howHasYourGymStrengthBeenComment,
		setHowHasYourGymStrengthBeenComment,
	} = useContext(WeeklyReport);

	return (
		<KeyboardAwareScrollView
			enableOnAndroid
			keyboardShouldPersistTaps='handled'
			style={{ marginBottom: 30 }}
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<Subheading style={{ color: colors.highlightText, marginBottom: 5 }}>
				Välj ett svar
			</Subheading>
			<RadioButton
				value='Exemplarisk!'
				status={howHasYourGymStrengthBeen}
				onPress={() => setHowHasYourGymStrengthBeen("Exemplarisk!")}
			/>
			<RadioButton
				value='Bra'
				status={howHasYourGymStrengthBeen}
				onPress={() => setHowHasYourGymStrengthBeen("Bra")}
			/>
			<RadioButton
				value='Mindre bra'
				status={howHasYourGymStrengthBeen}
				onPress={() => setHowHasYourGymStrengthBeen("Mindre bra")}
			/>
			<RadioButton
				value='Dålig'
				status={howHasYourGymStrengthBeen}
				onPress={() => setHowHasYourGymStrengthBeen("Dålig")}
			/>
			<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
				Frivillig kommentar
			</Subheading>
			<InputValidation
				value={howHasYourGymStrengthBeenComment?.text}
				onValidation={(valid: boolean, text) =>
					setHowHasYourGymStrengthBeenComment({ valid, text })
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
