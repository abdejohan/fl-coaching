import { MaterialIcons } from "@expo/vector-icons";
import { Linking, ScrollView, View } from "react-native";
import { useTheme, Card } from "react-native-paper";
import Button from "../components/common/Button";
import { Headline, Text } from "../typography";

const deals = [
	{
		title: "15% rabatt hos Fantastic Line",
		description:
			"Som klient hos oss har du 15% rabatt på hela sortimentet hos Fantastic Line med koden: FLcoaching",
		url: "https://www.fantasticline.se/sv/",
	},
	{
		title: "15% rabatt på massage hos Motala Fitness Center",
		description:
			"Som klient hos oss har du 20% rabatt på alla våra massagebehandlingar på Motala Fitness Center. Rabatten dras av när du betalar på plats, uppvisa bara ditt inlogg i vår app i kassan.",
		url: "https://motalafitnesscenter.se/",
	},
];

const DealsScreen: React.FC = () => {
	const { colors } = useTheme();

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 40 }}
			style={{
				padding: 20,
				backgroundColor: colors.background,
			}}>
			{deals.map((deal, index) => (
				<Card style={{ marginBottom: 20, padding: 0 }} key={index}>
					<Card.Content>
						<View style={{ flexDirection: "row", marginBottom: 20 }}>
							<MaterialIcons
								name='local-offer'
								size={20}
								color={colors.primary}
								style={{ top: 3 }}
							/>
							<Headline
								style={{
									marginLeft: 5,
									fontSize: 20,
									lineHeight: 22,
									flexShrink: 1,
								}}>
								{deal.title}
							</Headline>
						</View>
						<Text style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
							{deal.description}
						</Text>
						<Button style={{ marginBottom: 0 }} onPress={() => Linking.openURL(deal.url)}>
							Gå till erbjudande
						</Button>
					</Card.Content>
				</Card>
			))}
		</ScrollView>
	);
};

export default DealsScreen;
