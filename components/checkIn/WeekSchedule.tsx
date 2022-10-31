import { useContext } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Divider, useTheme } from "react-native-paper";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import RadioButton from "../common/RadioButton";
import { Headline, Subheading } from "../../typography";

const WeekSchedule: React.FC = () => {
	const { colors } = useTheme();
	const {
		haveYouStickedToThePlan,
		haveYouStickedToThePlanComment,
		setHaveYouStickedToThePlan,
		setHaveYouStickedToThePlanComment,
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
				status={haveYouStickedToThePlan}
				onPress={() => setHaveYouStickedToThePlan("Exemplarisk!")}
			/>
			<RadioButton
				value='Bra'
				status={haveYouStickedToThePlan}
				onPress={() => setHaveYouStickedToThePlan("Bra")}
			/>
			<RadioButton
				value='Mindre bra'
				status={haveYouStickedToThePlan}
				onPress={() => setHaveYouStickedToThePlan("Mindre bra")}
			/>
			<RadioButton
				value='Dålig'
				status={haveYouStickedToThePlan}
				onPress={() => setHaveYouStickedToThePlan("Dålig")}
			/>
			<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
				Frivillig kommentar
			</Subheading>
			<InputValidation
				value={haveYouStickedToThePlanComment?.text}
				onValidation={(valid: boolean, text) =>
					setHaveYouStickedToThePlanComment({ valid, text })
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

export default WeekSchedule;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		marginHorizontal: 20,
	},
});
