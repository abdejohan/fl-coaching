import React from "react";
import { StyleSheet, Animated, TextStyle, Dimensions, View } from "react-native";
import { useTheme } from "react-native-paper";

interface ParallaxScrollViewProps {
	imageHeight?: number;
	imageSource: object;
	children: any;
	style?: TextStyle;
	contentContainerStyle?: TextStyle;
}

const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = (props) => {
	const windowHeight = Dimensions.get("window").height;
	const { colors } = useTheme();
	const scrollAnimatedValue = new Animated.Value(0);
	const {
		children,
		style,
		contentContainerStyle,
		imageHeight = windowHeight / 4,
		imageSource,
	} = props;

	return (
		<>
			<Animated.Image
				source={imageSource}
				style={{
					...StyleSheet.absoluteFillObject,
					height: imageHeight,
					width: "100%",
					resizeMode: "cover",
					alignSelf: "center",
					transform: [
						{
							translateY: scrollAnimatedValue.interpolate({
								inputRange: [-imageHeight, 0, imageHeight],
								outputRange: [imageHeight / 2, 0, -imageHeight / 2],
								extrapolateRight: "clamp",
							}),
						},
						{
							scale: scrollAnimatedValue.interpolate({
								inputRange: [-imageHeight, 0],
								outputRange: [2, 1],
								extrapolateRight: "clamp",
							}),
						},
					],
				}}
			/>
			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					backgroundColor: colors.darkfade,
					transform: [
						{
							translateY: scrollAnimatedValue.interpolate({
								inputRange: [-imageHeight, 0, imageHeight],
								outputRange: [imageHeight / 2, 0, -imageHeight / 2],
								extrapolateRight: "clamp",
							}),
						},
						{
							scale: scrollAnimatedValue.interpolate({
								inputRange: [-imageHeight, 0],
								outputRange: [2, 1],
								extrapolateRight: "clamp",
							}),
						},
					],
				}}
			/>
			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }],
					{ useNativeDriver: true }
				)}
				style={style}
				contentContainerStyle={{
					paddingBottom: imageHeight - 20,
					marginTop: imageHeight,
					minHeight: windowHeight,
					...contentContainerStyle,
				}}
				scrollEventThrottle={8} // target 120fps
			>
				{children}
			</Animated.ScrollView>
		</>
	);
};

export default ParallaxScrollView;
