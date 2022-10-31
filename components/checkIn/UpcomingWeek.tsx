import { useContext } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Divider, useTheme } from "react-native-paper";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import RadioButton from "../common/RadioButton";
import { Headline, Subheading } from "../../typography";

const UpcomingWeek: React.FC = () => {
	const { colors } = useTheme();
	const {
		howHasYourHungerBeen,
		setHowHasYourHungerBeen,
		howHasYourHungerBeenComment,
		setHowHasYourHungerBeenComment,
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
				status={howHasYourHungerBeen}
				onPress={() => setHowHasYourHungerBeen("Exemplarisk!")}
			/>
			<RadioButton
				value='Bra'
				status={howHasYourHungerBeen}
				onPress={() => setHowHasYourHungerBeen("Bra")}
			/>
			<RadioButton
				value='Mindre bra'
				status={howHasYourHungerBeen}
				onPress={() => setHowHasYourHungerBeen("Mindre bra")}
			/>
			<RadioButton
				value='Dålig'
				status={howHasYourHungerBeen}
				onPress={() => setHowHasYourHungerBeen("Dålig")}
			/>
			<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
				Frivillig kommentar
			</Subheading>
			<InputValidation
				value={howHasYourHungerBeenComment?.text}
				onValidation={(valid: boolean, text) =>
					setHowHasYourHungerBeenComment({ valid, text })
				}
				maxLength={255}
				returnKeyType='done'
				multiline
				numberOfLines={6}
			/>
		</KeyboardAwareScrollView>
	);
};

export default UpcomingWeek;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		marginHorizontal: 20,
	},
});
