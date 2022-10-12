import { ReactElement } from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { Paragraph } from "../../typography";

interface ListItemBasicProps {
	title: string;
	sets?: string;
	disabled?: boolean;
	titleZtyle: TextStyle;
	onPress?: () => void;
	description?: string | (() => ReactElement);
	descriptionLeft?: string | (() => ReactElement);
	descriptionRight?: string | (() => ReactElement);
}

const ListItemBasic: React.FC<ListItemBasicProps> = (props) => {
	const { disabled, descriptionRight, descriptionLeft, titleZtyle } = props;
	const { colors } = useTheme();

	return (
		<List.Item
			style={{
				paddingLeft: 0,
				padding: 0,
				paddingVertical: 10,
			}}
			titleStyle={{
				...titleZtyle,
				color: colors.highlightText,
				fontFamily: "ubuntu-medium",
				textDecorationLine: disabled ? "line-through" : "none",
			}}
			description={() => {
				if (descriptionLeft || descriptionRight) {
					return (
						<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<View style={{ flexDirection: "row" }}>
								<Paragraph>{descriptionLeft}</Paragraph>
							</View>
							<Paragraph>{descriptionRight}</Paragraph>
						</View>
					);
				}
			}}
			{...props}
		/>
	);
};

export default ListItemBasic;

const styles = StyleSheet.create({
	container: {},
});
