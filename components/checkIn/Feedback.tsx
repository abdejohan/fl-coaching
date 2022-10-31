import { useContext } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import { Headline, Subheading } from "../../typography";

const Feedback: React.FC = () => {
	const { colors } = useTheme();
	const { feedbackComment, setFeedbackComment } = useContext(WeeklyReport);

	return (
		<KeyboardAwareScrollView
			enableOnAndroid
			keyboardShouldPersistTaps='handled'
			style={{ marginBottom: 30 }}
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
				Frivillig kommentar
			</Subheading>
			<InputValidation
				value={feedbackComment?.text}
				onValidation={(valid: boolean, text) => setFeedbackComment({ valid, text })}
				placeholder='Fritext'
				maxLength={255}
				returnKeyType='done'
				multiline
				numberOfLines={10}
			/>
		</KeyboardAwareScrollView>
	);
};

export default Feedback;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
		marginHorizontal: 20,
	},
});
