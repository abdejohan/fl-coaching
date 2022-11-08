import { useContext } from "react";
import { Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import RadioButton from "../common/RadioButton";
import { Subheading } from "../../typography";

const SleepStatus: React.FC = () => {
	const { colors } = useTheme();
	const {
		howHasYourSleepBeen,
		howHasYourSleepBeenComment,
		setHowHasYourSleepBeen,
		setHowHasYourSleepBeenComment,
	} = useContext(WeeklyReport);

	return (
		<KeyboardAwareScrollView
			extraScrollHeight={Platform.OS === "ios" ? 100 : 0}
			keyboardShouldPersistTaps='handled'
			style={{ marginBottom: 30 }}
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<Subheading style={{ color: colors.highlightText, marginBottom: 5 }}>
				Välj ett svar
			</Subheading>
			<RadioButton
				value='Exemplarisk!'
				status={howHasYourSleepBeen}
				onPress={() => setHowHasYourSleepBeen("Exemplarisk!")}
			/>
			<RadioButton
				value='Bra'
				status={howHasYourSleepBeen}
				onPress={() => setHowHasYourSleepBeen("Bra")}
			/>
			<RadioButton
				value='Mindre bra'
				status={howHasYourSleepBeen}
				onPress={() => setHowHasYourSleepBeen("Mindre bra")}
			/>
			<RadioButton
				value='Dålig'
				status={howHasYourSleepBeen}
				onPress={() => setHowHasYourSleepBeen("Dålig")}
			/>
			<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
				Frivillig kommentar
			</Subheading>
			<InputValidation
				value={howHasYourSleepBeenComment?.text}
				onValidation={(valid: boolean, text) =>
					setHowHasYourSleepBeenComment({ valid, text })
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

export default SleepStatus;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		marginHorizontal: 20,
	},
});
