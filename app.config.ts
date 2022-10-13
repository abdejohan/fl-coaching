import "dotenv/config";
export default {
	expo: {
		owner: "coach-apps",
		name: "FL Coaching",
		slug: "fl-coaching",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "myapp",
		backgroundColor: "#121212",
		privacy: "public",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "contain",
			backgroundColor: "#FAFAFA",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: false,
			usesIcloudStorage: false,
			buildNumber: "1",
			googleServicesFile: "./GoogleService-Info.plist",
			bundleIdentifier: "bebrightr.coach-app.fl-coaching",
			infoPlist: {
				NSCameraUsageDescription:
					"The app needs camera permission in order for you to take images of your fitness progress",
				NSPhotoLibraryUsageDescription:
					"The app needs camera roll permission in order to add photos you've already taken for upload",
			},
		},
		android: {
			package: "bebrightr.coach_app.fl_coaching",
			googleServicesFile: "./google-services.json",
			versionCode: 1,
			permissions: ["NOTIFICATIONS"],
			useNextNotificationsApi: true,
			// softwareKeyboardLayoutMode: "pan",
			adaptiveIcon: {
				foregroundImage: "./assets/images/icon.png",
				backgroundColor: "#FAFAFA",
			},
		},
		web: {
			favicon: "./assets/images/favicon.png",
		},
		plugins: [
			[
				"expo-build-properties",
				{
					android: {
						enableProguardInReleaseBuilds: true,
					},
				},
			],
			[
				"expo-notifications",
				{
					icon: "./assets/images/icon.png",
					color: "#FAFAFA",
				},
			],
		],
		extra: {
			eas: {
				projectId: "3847f580-2213-4c7c-afe0-031e4bfc0227",
			},
			apiUrl: process.env.API_URL,
			coachSiteUrl: process.env.COACH_SITE_URL,
			coachName: process.env.COACH_NAME,
			chatAppID: process.env.CHAT_APP_ID,
			privacyPolicyUrl: process.env.PRIVACY_POLICY_URL,
		},
	},
};
