import { useState } from "react";
import { Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, TabBar, TabBarItem, SceneRendererProps } from "react-native-tab-view";
import { Paragraph } from "../../typography";

interface TabBarProps {
	routes: Array<{ key: string; title: string }>;
	renderScene: ({
		route,
		jumpTo,
		position,
	}: SceneRendererProps & { route: any }) => Element;
}

const TabBarView: React.FC<TabBarProps> = (props) => {
	const { routes } = props;
	const { colors, roundness } = useTheme();
	const [index, setIndex] = useState(0);

	const renderTabBar = (props: any) => (
		<TabBar
			{...props}
			renderIndicator={() => null}
			pressColor={"transparent"}
			indicatorStyle={{ backgroundColor: "white" }}
			style={{
				backgroundColor: colors.surface,
				borderRadius: roundness,
				marginBottom: 20,
			}}
			renderTabBarItem={(props) => (
				<TabBarItem
					{...props}
					style={{
						padding: 0,
						justifyContent: "center",
						height: 60,
						borderRadius: roundness,
					}}
				/>
			)}
			renderLabel={({ focused, route }) => (
				<View
					key={route.title}
					style={{
						alignItems: "center",
						justifyContent: "center",
						marginVertical: 5,
						width: Dimensions.get("window").width / 2 - 30,
						flexGrow: 1,
						backgroundColor: focused ? colors.primary : colors.surface,
						borderRadius: roundness,
					}}>
					<Paragraph style={{ color: focused ? colors.surface : colors.text }}>
						{route.title}
					</Paragraph>
				</View>
			)}
		/>
	);

	return (
		<TabView
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			style={{ borderRadius: roundness }}
			renderTabBar={renderTabBar}
			{...props}
		/>
	);
};

export default TabBarView;
