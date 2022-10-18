import { MaterialIcons } from "@expo/vector-icons";
import { Linking, ScrollView } from "react-native";
import { useTheme, Card } from "react-native-paper";
import Button from "../components/common/Button";
import { Text } from "../typography";

const deals = [
	{
		title: "15% rabatt hos Fantastic Line",
		description:
			"Som klient hos oss har du 15% rabatt på hela sortimentet hos Fantastic Line med koden: FLcoaching",
		url: "https://www.fantasticline.se/sv/",
	},
	{
		title: "15% rabatt på massage Motala Fitness Center",
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
				<Card style={{ marginBottom: 20 }} key={index}>
					<Card.Title
						titleStyle={{ textDecorationLine: "underline" }}
						leftStyle={{ marginRight: 0 }}
						title={deal.title}
						left={() => (
							<MaterialIcons name='local-offer' size={30} color={colors.primary} />
						)}
					/>
					{/**
					 * 
					<Card.Cover
						source={{
							uri: deal.image,
						}}
					/>
						*/}
					<Card.Content>
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
