import React, {
	useState,
	FunctionComponent,
	useMemo,
	useEffect,
	useContext,
} from "react";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { ValidInput } from "../types/types";
import AuthContext from "./Auth";

type ContextType = {
	notAllFieldsAreValid: boolean;
	setNotAllFieldAreValid: (value: boolean) => void;
	submitWeeklyReport: () => Promise<string>;
	/* START OF CHECK-IN PAGE 1 */
	weight: ValidInput | null;
	biceps: ValidInput | null;
	glutes: ValidInput | null;
	waist: ValidInput | null;
	thighs: ValidInput | null;
	weeklySteps: ValidInput | null;
	frontImage: string | undefined;
	backImage: string | undefined;
	leftImage: string | undefined;
	rightImage: string | undefined;
	setWeight: (weight: ValidInput) => void;
	setBiceps: (biceps: ValidInput) => void;
	setGlutes: (glutes: ValidInput) => void;
	setWaist: (waist: ValidInput) => void;
	setThighs: (thighs: ValidInput) => void;
	setWeeklySteps: (weeklySteps: ValidInput) => void;
	setFrontImage: (frontImage: string | undefined) => void;
	setBackImage: (backImage: string | undefined) => void;
	setLeftImage: (leftImage: string | undefined) => void;
	setRightImage: (rightImage: string | undefined) => void;
	/* START OF CHECK-IN PAGE 2 */
	howHasYourWeekBeen: string;
	howHasYourWeekBeenComment: ValidInput | null;
	setHowHasYourWeekBeen: (howHasTheWeekBeen: string) => void;
	setHowHasYourWeekBeenComment: (howHasYourWeekBeenComment: ValidInput) => void;
	/* START OF CHECK-IN PAGE 3 */
	howHasYourHungerBeen: string;
	howHasYourHungerBeenComment: ValidInput | null;
	setHowHasYourHungerBeen: (howHasYourHungerBeen: string) => void;
	setHowHasYourHungerBeenComment: (howHasYourHungerBeenComment: ValidInput) => void;
	/* START OF CHECK-IN PAGE 4 */
	howHasYourGymStrenthBeen: string;
	howHasYourGymStrenthBeenComment: ValidInput | null;
	setHowHasYourGymStrenthBeen: (howHasYourGymStrenthBeen: string) => void;
	setHowHasYourGymStrenthBeenComment: (
		howHasYourGymStrenthBeenComment: ValidInput
	) => void;
	/* START OF CHECK-IN PAGE 5 */
	howHasYourSleepBeen: string;
	howHasYourSleepBeenComment: ValidInput | null;
	setHowHasYourSleepBeen: (howHasYourGymStrenthBeen: string) => void;
	setHowHasYourSleepBeenComment: (howHasYourGymStrenthBeenComment: ValidInput) => void;
};

const WeeklyReport = React.createContext<ContextType>({
	notAllFieldsAreValid: true,
	setNotAllFieldAreValid: () => {},
	submitWeeklyReport: async () => "",
	/* START OF CHECK-IN PAGE 1 */
	weight: { valid: false, text: "" },
	biceps: { valid: false, text: "" },
	glutes: { valid: false, text: "" },
	waist: { valid: false, text: "" },
	thighs: { valid: false, text: "" },
	weeklySteps: { valid: false, text: "" },
	frontImage: undefined,
	backImage: undefined,
	leftImage: undefined,
	rightImage: undefined,
	setWeight: () => {},
	setBiceps: () => {},
	setGlutes: () => {},
	setWaist: () => {},
	setThighs: () => {},
	setWeeklySteps: () => {},
	setFrontImage: () => {},
	setBackImage: () => {},
	setLeftImage: () => {},
	setRightImage: () => {},
	/* START OF CHECK-IN PAGE 2 */
	howHasYourWeekBeen: "",
	howHasYourWeekBeenComment: { valid: false, text: "" },
	setHowHasYourWeekBeen: () => {},
	setHowHasYourWeekBeenComment: () => {},
	/* START OF CHECK-IN PAGE 3 */
	howHasYourHungerBeen: "",
	howHasYourHungerBeenComment: { valid: false, text: "" },
	setHowHasYourHungerBeen: () => {},
	setHowHasYourHungerBeenComment: () => {},
	/* START OF CHECK-IN PAGE 4 */
	howHasYourGymStrenthBeen: "",
	howHasYourGymStrenthBeenComment: { valid: false, text: "" },
	setHowHasYourGymStrenthBeen: () => {},
	setHowHasYourGymStrenthBeenComment: () => {},
	/* START OF CHECK-IN PAGE 5 */
	howHasYourSleepBeen: "",
	howHasYourSleepBeenComment: { valid: false, text: "" },
	setHowHasYourSleepBeen: () => {},
	setHowHasYourSleepBeenComment: () => {},
});

interface WeeklyReportProps {
	children: any;
}
export const WeeklyReportContextProvider: FunctionComponent<WeeklyReportProps> = ({
	children,
}) => {
	const { updateUser, user, token } = useContext(AuthContext);
	const { useAxios } = useAxiosAuthenticated();
	const [, postWeeklyCheckIn] = useAxios(
		{
			method: "POST",
			headers: { Authorization: "Bearer " + token },
			url: "/update/create",
		},
		{ manual: true }
	);
	const [, weeklyReportSent] = useAxios(
		{
			url: "/client/edit",
			headers: { Authorization: "Bearer " + token },
			method: "POST",
			data: { weekly_update_sent: 1 },
		},
		{ manual: true }
	);
	const [notAllFieldsAreValid, setNotAllFieldAreValid] = useState<boolean>(true);
	// START OF CHECK-IN PAGE 1 { text: "50", valid: true }
	const [weight, setWeight] = useState<ValidInput | null>(null);
	const [biceps, setBiceps] = useState<ValidInput | null>(null);
	const [glutes, setGlutes] = useState<ValidInput | null>(null);
	const [waist, setWaist] = useState<ValidInput | null>(null);
	const [thighs, setThighs] = useState<ValidInput | null>(null);
	const [weeklySteps, setWeeklySteps] = useState<ValidInput | null>(null);
	const [frontImage, setFrontImage] = useState<string | undefined>();
	const [backImage, setBackImage] = useState<string | undefined>();
	const [leftImage, setLeftImage] = useState<string | undefined>();
	const [rightImage, setRightImage] = useState<string | undefined>();
	// START OF CHECK-IN PAGE 2
	const [howHasYourWeekBeen, setHowHasYourWeekBeen] = useState("");
	const [howHasYourWeekBeenComment, setHowHasYourWeekBeenComment] =
		useState<ValidInput | null>(null);
	// START OF CHECK-IN PAGE 3
	const [howHasYourHungerBeen, setHowHasYourHungerBeen] = useState("");
	const [howHasYourHungerBeenComment, setHowHasYourHungerBeenComment] =
		useState<ValidInput | null>(null);
	// START OF CHECK-IN PAGE 4
	const [howHasYourGymStrenthBeen, setHowHasYourGymStrenthBeen] = useState<string>("");
	const [howHasYourGymStrenthBeenComment, setHowHasYourGymStrenthBeenComment] =
		useState<ValidInput | null>(null);
	// START OF CHECK-IN PAGE 5
	const [howHasYourSleepBeen, setHowHasYourSleepBeen] = useState<string>("");
	const [howHasYourSleepBeenComment, setHowHasYourSleepBeenComment] =
		useState<ValidInput | null>(null);

	const submitWeeklyReport = async (): Promise<string> => {
		try {
			const fields = {
				/* START OF CHECK-IN PAGE 1 */
				weight: weight?.text,
				biceps: biceps?.text,
				glutes: glutes?.text,
				waist: waist?.text,
				thighs: thighs?.text,
				weeklySteps: weeklySteps?.text,
				frontImage: frontImage ? `data:image/png;base64,${frontImage}` : undefined,
				backImage: backImage ? `data:image/png;base64,${backImage}` : undefined,
				leftImage: leftImage ? `data:image/png;base64,${leftImage}` : undefined,
				rightImage: rightImage ? `data:image/png;base64,${rightImage}` : undefined,
				/* START OF CHECK-IN PAGE 2 */
				howHasYourWeekBeen: howHasYourWeekBeen,
				howHasYourWeekBeenComment: howHasYourWeekBeenComment?.text,
				/* START OF CHECK-IN PAGE 3 */
				howHasYourGymStrenthBeen: howHasYourGymStrenthBeen,
				howHasYourGymStrenthBeenComment: howHasYourGymStrenthBeenComment?.text,
				/* START OF CHECK-IN PAGE 4 */
				howHasYourHungerBeen: howHasYourHungerBeen,
				howHasYourHungerBeenComment: howHasYourHungerBeenComment?.text,
				/* START OF CHECK-IN PAGE 5 */
				howHasYourSleepBeen: howHasYourSleepBeen,
				howHasYourSleepBeenComment: howHasYourSleepBeenComment?.text,
			};

			const responseStatus = await postWeeklyCheckIn({ data: fields })
				.then((response) => {
					return response.status;
				})
				.catch(() => {});

			if (responseStatus === 200) {
				await weeklyReportSent({}).catch((e) => {});
				updateUser();
			} else {
				return "error";
			}

			return "success";
		} catch (error) {
			return "error";
		}
	};

	/* Check that all validation fields are validated */
	// 1. Place variables to validate in 'fields' array
	// 1. Place variables to validate in dependency array
	// 2. Check if all values are valid
	// 3. Toggle notAllFieldsAreValid to disable "send" button in CheckInScreen.tsx
	useEffect(() => {
		const fieldsToValidate = [
			weight,
			biceps,
			glutes,
			waist,
			thighs,
			weeklySteps,
			howHasYourGymStrenthBeenComment,
			howHasYourWeekBeenComment,
			howHasYourHungerBeenComment,
		];
		const validationRule = (currentField: { valid: boolean }) =>
			currentField?.valid === true;
		const allFieldsAreValidated = fieldsToValidate.every(validationRule);
		if (allFieldsAreValidated === false) {
			setNotAllFieldAreValid(true);
		} else {
			setNotAllFieldAreValid(false);
		}
	}, [
		weight,
		biceps,
		glutes,
		waist,
		thighs,
		weeklySteps,
		howHasYourGymStrenthBeen,
		howHasYourGymStrenthBeenComment,
		howHasYourWeekBeenComment,
		howHasYourHungerBeenComment,
	]);

	const state = useMemo(
		() => ({
			notAllFieldsAreValid,
			setNotAllFieldAreValid,
			submitWeeklyReport,
			/* START OF CHECK-IN PAGE 1 */
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
			/* START OF CHECK-IN PAGE 2 */
			howHasYourWeekBeen,
			howHasYourWeekBeenComment,
			setHowHasYourWeekBeen,
			setHowHasYourWeekBeenComment,
			/* START OF CHECK-IN PAGE 3 */
			howHasYourHungerBeen,
			howHasYourHungerBeenComment,
			setHowHasYourHungerBeen,
			setHowHasYourHungerBeenComment,
			/* START OF CHECK-IN PAGE 4 */
			howHasYourGymStrenthBeen,
			howHasYourGymStrenthBeenComment,
			setHowHasYourGymStrenthBeenComment,
			setHowHasYourGymStrenthBeen,
			/* START OF CHECK-IN PAGE 5 */
			howHasYourSleepBeen,
			howHasYourSleepBeenComment,
			setHowHasYourSleepBeen,
			setHowHasYourSleepBeenComment,
		}),
		[
			notAllFieldsAreValid,
			setNotAllFieldAreValid,
			submitWeeklyReport,
			/* START OF CHECK-IN PAGE 1 */
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
			/* START OF CHECK-IN PAGE 2 */
			howHasYourWeekBeen,
			howHasYourWeekBeenComment,
			setHowHasYourWeekBeen,
			setHowHasYourWeekBeenComment,
			/* START OF CHECK-IN PAGE 3 */
			howHasYourHungerBeen,
			howHasYourHungerBeenComment,
			setHowHasYourHungerBeen,
			setHowHasYourHungerBeenComment,
			/* START OF CHECK-IN PAGE 4 */
			howHasYourGymStrenthBeen,
			howHasYourGymStrenthBeenComment,
			setHowHasYourGymStrenthBeenComment,
			setHowHasYourGymStrenthBeen,
			/* START OF CHECK-IN PAGE 5 */
			howHasYourSleepBeen,
			howHasYourSleepBeenComment,
			setHowHasYourSleepBeen,
			setHowHasYourSleepBeenComment,
		]
	);

	return <WeeklyReport.Provider value={state}>{children}</WeeklyReport.Provider>;
};

export default WeeklyReport;
