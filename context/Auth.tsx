import React, {
	useState,
	FunctionComponent,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";
import { LoginResponse, LoginWithTokenResponse } from "../types/index";
import useAxios from "axios-hooks";
import { User } from "../types/types";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { AppState, AppStateStatus } from "react-native";

const AsyncKeys = {
	authToken: "AUTH_TOKEN",
	expoToken: "EXPO_TOKEN",
	user: "USER",
};

type ContextType = {
	token: string | null;
	user: User | null;
	logout: () => void;
	darkMode: boolean;
	setDarkMode: (value: boolean) => void;
	isLoggingOut: boolean;
	login: (response: LoginResponse) => void;
	updateUser: () => void;
	initialRoute: string;
	userLoading: boolean;
};

const AuthContext = React.createContext<ContextType>({
	token: null,
	user: null,
	logout: () => {},
	isLoggingOut: false,
	darkMode: false,
	setDarkMode: () => {},
	login: () => {},
	updateUser: () => {},
	initialRoute: "Intro",
	userLoading: false,
});

export const AuthContextProvider: FunctionComponent = (props: any) => {
	const { initialRoute, darkMode: darkModeProps, children } = props;
	const [darkMode, setDarkMode] = useState<boolean>(darkModeProps);
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
	const [{ loading: userLoading }, fetchUser] = useAxios<LoginWithTokenResponse>(
		{},
		{ manual: true, useCache: false }
	);

	const saveTokenToStore = useCallback(async (jwtToken: string | null): Promise<void> => {
		if (typeof jwtToken === "string") {
			// this fetches the latest user data everytime the user login
			await fetchUser({
				url: `${Constants!.manifest!.extra!.apiUrl}/client/get`,
				headers: { Authorization: "Bearer " + jwtToken },
			})
				.then(async (response) => {
					setUser(response.data.client);
					//console.log(response.data.client);
					setToken(jwtToken);
					await SecureStore.setItemAsync(AsyncKeys.authToken, jwtToken);
				})
				.catch(() => {
					Alert.alert(`Inloggning mislyckades tyvärr, försök igen.`);
					setToken(null);
				});
		} else {
			SecureStore.deleteItemAsync(AsyncKeys.authToken);
			setToken(null);
		}
	}, []);

	const login = useCallback(
		(loginResponse: LoginResponse): Promise<void> =>
			saveTokenToStore(loginResponse.token),
		[saveTokenToStore]
	);

	const updateUser = async (): Promise<void> => {
		if (typeof token === "string") {
			await fetchUser({
				url: `${Constants!.manifest!.extra!.apiUrl}/client/get`,
				headers: { Authorization: "Bearer " + token },
			})
				.then((res) => setUser(res.data.client))
				.catch(() => undefined);
		}
	};

	const logout = useCallback(async (): Promise<void> => {
		setIsLoggingOut(true);
		useAxios.clearCache();
		await SecureStore.deleteItemAsync(AsyncKeys.authToken);
		await SecureStore.deleteItemAsync(AsyncKeys.expoToken); // delete to prevent notifications from being sent
		// await AsyncStorage.clear();
		await saveTokenToStore(null);
		setIsLoggingOut(false);
	}, [saveTokenToStore]);

	// FIRST initialization of the values
	useEffect(() => {
		const getItemsFromStore = async () => {
			const savedToken = await SecureStore.getItemAsync(AsyncKeys.authToken);
			if (typeof savedToken === "string") {
				saveTokenToStore(savedToken);
			}
		};

		getItemsFromStore();
	}, [saveTokenToStore]);

	/** This will listen to app state changes (example: inactive, active, backgrund) */
	useEffect(() => {
		const subscription = AppState.addEventListener("change", _handleAppStateChange);
		return () => {
			subscription.remove();
		};
	}, []);

	/** This will refresh client data if the app has been in background / inactive */
	const _handleAppStateChange = (nextAppState: AppStateStatus) => {
		if (nextAppState === "active" && user && token) {
			updateUser();
		}
	};

	const state = useMemo(
		() => ({
			token,
			user,
			isLoggingOut,
			initialRoute,
			darkMode,
			setDarkMode,
			logout,
			login,
			updateUser,
			userLoading,
		}),
		[
			token,
			isLoggingOut,
			logout,
			login,
			initialRoute,
			updateUser,
			darkMode,
			setDarkMode,
			userLoading,
		]
	);

	return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContext;
