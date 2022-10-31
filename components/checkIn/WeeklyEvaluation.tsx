import { useContext } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Divider, useTheme } from "react-native-paper";
import RadioButton from "../common/RadioButton";
import WeeklyReport from "../../context/WeeklyReport";
import InputValidation from "../InputValidation";
import { Headline, Subheading } from "../../typography";

const WeeklyEvaluation: React.FC = () => {
	const {
		howHasYourWeekBeen,
		setHowHasYourWeekBeen,
		howHasYourWeekBeenComment,
		setHowHasYourWeekBeenComment,
	} = useContext(WeeklyReport);
	const { colors } = useTheme();
	return (
		<KeyboardAwareScrollView
			enableOnAndroid
			keyboardShouldPersistTaps='handled'
			style={{ marginBottom: 30 }}
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<View
				style={{
					flexDirection: "column",
				}}>
				<Headline style={{ color: colors.highlightText, textAlign: "center" }}>
					Hur upplever du att din
				</Headline>
				<Headline
					style={{ color: colors.highlightText, marginBottom: 20, textAlign: "center" }}>
					vecka varit? *
				</Headline>

				<Divider style={{ backgroundColor: colors.primary, marginBottom: 20 }} />
				<Subheading style={{ color: colors.highlightText, marginBottom: 5 }}>
					Välj ett svar
				</Subheading>
				<RadioButton
					value='Exemplarisk!'
					status={howHasYourWeekBeen}
					onPress={() => setHowHasYourWeekBeen("Exemplarisk!")}
				/>
				<RadioButton
					value='Bra'
					status={howHasYourWeekBeen}
					onPress={() => setHowHasYourWeekBeen("Bra")}
				/>
				<RadioButton
					value='Mindre bra'
					status={howHasYourWeekBeen}
					onPress={() => setHowHasYourWeekBeen("Mindre bra")}
				/>
				<RadioButton
					value='Dålig'
					status={howHasYourWeekBeen}
					onPress={() => setHowHasYourWeekBeen("Dålig")}
				/>
				<Subheading style={{ color: colors.highlightText, marginTop: 20 }}>
					Frivillig kommentar
				</Subheading>
				<InputValidation
					value={howHasYourWeekBeenComment?.text}
					onValidation={(valid: boolean, text) =>
						setHowHasYourWeekBeenComment({ valid, text })
					}
					maxLength={255}
					returnKeyType='done'
					multiline
					numberOfLines={6}
				/>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default WeeklyEvaluation;
