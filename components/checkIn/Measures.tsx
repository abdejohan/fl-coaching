import { View, Image, TouchableOpacity, Platform } from "react-native";
import { Divider, TextInput, useTheme } from "react-native-paper";
import InputValidation from "../InputValidation";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext, useState } from "react";
import WeeklyReport from "../../context/WeeklyReport";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Headline, Subheading } from "../../typography";
import { pickAvatarDocument, pickAvatarIOS } from "../../functions";

const Measures: React.FC = () => {
	const [uploadImageWidth, setUploadImageWidth] = useState<number>(0);
	const {
		weight,
		biceps,
		glutes,
		waist,
		thighs,
		weeklySteps,
		frontImage,
		backImage,
		leftImage,
		rightImage,
		setWeight,
		setBiceps,
		setGlutes,
		setWaist,
		setThighs,
		setWeeklySteps,
		setFrontImage,
		setBackImage,
		setLeftImage,
		setRightImage,
	} = useContext(WeeklyReport);
	const { colors } = useTheme();

	return (
		<KeyboardAwareScrollView
			style={{ marginBottom: 30 }}
			enableOnAndroid
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={{ paddingHorizontal: 25 }}>
			<Subheading style={{ marginBottom: 20 }}>Fyll i fälten nedan</Subheading>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Headline
					style={{
						marginBottom: 15,
						fontWeight: "bold",
						letterSpacing: 1,
						lineHeight: 20,
						fontSize: 18,
					}}>
					Vikt *
				</Headline>
				<InputValidation
					value={weight?.text}
					onValidation={(valid: boolean, text) => setWeight({ valid, text })}
					validationRule='min1'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='decimal-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='kg' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Headline
					style={{
						marginBottom: 15,
						fontWeight: "bold",
						letterSpacing: 1,
						lineHeight: 20,
						fontSize: 18,
					}}>
					Biceps *
				</Headline>
				<InputValidation
					value={biceps?.text}
					onValidation={(valid: boolean, text) => setBiceps({ valid, text })}
					validationRule='min1'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='decimal-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Headline
					style={{
						marginBottom: 15,
						fontWeight: "bold",
						letterSpacing: 1,
						lineHeight: 20,
						fontSize: 18,
					}}>
					Rumpa *
				</Headline>
				<InputValidation
					value={glutes?.text}
					onValidation={(valid: boolean, text) => setGlutes({ valid, text })}
					validationRule='min1'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='decimal-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Headline
					style={{
						marginBottom: 15,
						fontWeight: "bold",
						letterSpacing: 1,
						lineHeight: 20,
						fontSize: 18,
					}}>
					Midja *
				</Headline>
				<InputValidation
					value={waist?.text}
					onValidation={(valid: boolean, text) => setWaist({ valid, text })}
					validationRule='min1'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='decimal-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Headline
					style={{
						marginBottom: 15,
						fontWeight: "bold",
						letterSpacing: 1,
						lineHeight: 20,
						fontSize: 18,
					}}>
					Lår *
				</Headline>
				<InputValidation
					value={thighs?.text}
					onValidation={(valid: boolean, text) => setThighs({ valid, text })}
					validationRule='min1'
					maxLength={6}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='decimal-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='cm' />}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<View>
					<Headline
						style={{
							marginBottom: 4,
							fontWeight: "bold",
							letterSpacing: 1,
							lineHeight: 20,
							fontSize: 18,
						}}>
						Antal steg i snitt
					</Headline>
					<Headline
						style={{
							marginBottom: 6,
							fontWeight: "bold",
							letterSpacing: 1,
							lineHeight: 20,
							fontSize: 18,
						}}>
						senaste veckan *
					</Headline>
				</View>
				<InputValidation
					value={weeklySteps?.text}
					onValidation={(valid: boolean, text) => setWeeklySteps({ valid, text })}
					validationRule={"onlyDigits"}
					maxLength={10}
					textAlign='center'
					errorMessage='Ange ett svar.'
					returnKeyType='done'
					keyboardType='number-pad'
					validationContainerStyle={{ minWidth: 130 }}
					right={<TextInput.Affix text='steg' />}
				/>
			</View>
			{/* BELOW HERE IS THE UPLOAD IMAGES ELEMENTS */}
			<Divider style={{ backgroundColor: colors.primary, marginTop: 5 }} />
			<Subheading style={{ marginVertical: 20 }}>
				Bilder (Frivilligt, men fördelaktigt)
			</Subheading>
			<View
				style={{
					marginBottom: 5,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
				onLayout={(event) => {
					const { width } = event.nativeEvent.layout;
					setUploadImageWidth(width);
				}}>
				<View
					style={{
						borderWidth: 1,
						borderColor: colors.highlightText,
						borderRadius: 5,
					}}>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: uploadImageWidth / 2 - 5,
							height: uploadImageWidth / 2 - 5,
							borderRadius: 5,
						}}
						onPress={() => {
							if (Platform.OS === "android") {
								pickAvatarDocument()
									.then((base64Img) => setFrontImage(base64Img))
									.catch(() => null);
							}
							if (Platform.OS === "ios") {
								pickAvatarIOS()
									.then((base64Img) => setFrontImage(base64Img))
									.catch(() => null);
							}
						}}>
						{!frontImage && (
							<View style={{ alignItems: "center" }}>
								<Headline>Framsida</Headline>
								<Subheading style={{ padding: 10, textAlign: "center" }}>
									Tryck för att ladda upp bild
								</Subheading>
							</View>
						)}
						{frontImage && (
							<View>
								<Image
									source={{ uri: `data:image/png;base64,${frontImage}` }}
									style={{
										width: uploadImageWidth / 2 - 5,
										height: uploadImageWidth / 2 - 5,
										marginTop: 0,
										borderRadius: 5,
									}}
								/>
								<TouchableOpacity
									onPress={() => setFrontImage(undefined)}
									style={{
										position: "absolute",
										top: 3,
										right: 5,
										paddingLeft: 10,
										paddingBottom: 10,
									}}>
									<FontAwesome5 name='times-circle' size={30} color={colors.error} />
								</TouchableOpacity>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View
					style={{
						borderWidth: 1,
						borderColor: colors.highlightText,
						borderRadius: 5,
					}}>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: uploadImageWidth / 2 - 5,
							height: uploadImageWidth / 2 - 5,
							borderRadius: 5,
						}}
						onPress={() => {
							if (Platform.OS === "android") {
								pickAvatarDocument()
									.then((base64Img) => setBackImage(base64Img))
									.catch(() => null);
							}
							if (Platform.OS === "ios") {
								pickAvatarIOS()
									.then((base64Img) => setBackImage(base64Img))
									.catch(() => null);
							}
						}}>
						{!backImage && (
							<View style={{ alignItems: "center" }}>
								<Headline>Baksida</Headline>
								<Subheading style={{ padding: 10, textAlign: "center" }}>
									Tryck för att ladda upp bild
								</Subheading>
							</View>
						)}
						{backImage && (
							<View>
								<Image
									source={{ uri: `data:image/png;base64,${backImage}` }}
									style={{
										width: uploadImageWidth / 2 - 5,
										height: uploadImageWidth / 2 - 5,
										marginTop: 0,
										borderRadius: 5,
									}}
								/>
								<TouchableOpacity
									onPress={() => setBackImage(undefined)}
									style={{
										position: "absolute",
										top: 3,
										right: 5,
										paddingLeft: 10,
										paddingBottom: 10,
									}}>
									<FontAwesome5 name='times-circle' size={30} color={colors.error} />
								</TouchableOpacity>
							</View>
						)}
					</TouchableOpacity>
				</View>
			</View>
			{/** ------------------------------------ */}
			{/** ------------------------------------ */}
			{/** ------------------------------------ */}
			{/** ------------------------------------ */}
			{/** ------------------------------------ */}
			<View
				style={{
					marginBottom: 20,
					flexDirection: "row",
					justifyContent: "space-between",
				}}>
				<View
					style={{
						borderWidth: 1,
						borderColor: colors.highlightText,
						borderRadius: 5,
					}}>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: uploadImageWidth / 2 - 5,
							height: uploadImageWidth / 2 - 5,
							borderRadius: 5,
						}}
						onPress={() => {
							if (Platform.OS === "android") {
								pickAvatarDocument()
									.then((base64Img) => setLeftImage(base64Img))
									.catch(() => null);
							}
							if (Platform.OS === "ios") {
								pickAvatarIOS()
									.then((base64Img) => setLeftImage(base64Img))
									.catch(() => null);
							}
						}}>
						{!leftImage && (
							<View style={{ alignItems: "center" }}>
								<Headline>Vänster</Headline>
								<Subheading style={{ padding: 10, textAlign: "center" }}>
									Tryck för att ladda upp bild
								</Subheading>
							</View>
						)}
						{leftImage && (
							<View>
								<Image
									source={{ uri: `data:image/png;base64,${leftImage}` }}
									style={{
										width: uploadImageWidth / 2 - 5,
										height: uploadImageWidth / 2 - 5,
										marginTop: 0,
										borderRadius: 5,
									}}
								/>
								<TouchableOpacity
									onPress={() => setLeftImage(undefined)}
									style={{
										position: "absolute",
										top: 3,
										right: 5,
										paddingLeft: 10,
										paddingBottom: 10,
									}}>
									<FontAwesome5 name='times-circle' size={30} color={colors.error} />
								</TouchableOpacity>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View
					style={{
						borderWidth: 1,
						borderColor: colors.highlightText,
						borderRadius: 5,
					}}>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							width: uploadImageWidth / 2 - 5,
							height: uploadImageWidth / 2 - 5,
							borderRadius: 5,
						}}
						onPress={() => {
							if (Platform.OS === "android") {
								pickAvatarDocument()
									.then((base64Img) => setRightImage(base64Img))
									.catch(() => null);
							}
							if (Platform.OS === "ios") {
								pickAvatarIOS()
									.then((base64Img) => setRightImage(base64Img))
									.catch(() => null);
							}
						}}>
						{!rightImage && (
							<View style={{ alignItems: "center" }}>
								<Headline>Höger</Headline>
								<Subheading style={{ padding: 10, textAlign: "center" }}>
									Tryck för att ladda upp bild
								</Subheading>
							</View>
						)}
						{rightImage && (
							<View>
								<Image
									source={{ uri: `data:image/png;base64,${rightImage}` }}
									style={{
										width: uploadImageWidth / 2 - 5,
										height: uploadImageWidth / 2 - 5,
										marginTop: 0,
										borderRadius: 5,
									}}
								/>
								<TouchableOpacity
									onPress={() => setRightImage(undefined)}
									style={{
										position: "absolute",
										top: 3,
										right: 5,
										paddingLeft: 10,
										paddingBottom: 10,
									}}>
									<FontAwesome5 name='times-circle' size={30} color={colors.error} />
								</TouchableOpacity>
							</View>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default Measures;
