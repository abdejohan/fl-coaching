import React, {
	useState,
	FunctionComponent,
	useMemo,
	useEffect,
	useContext,
} from "react";
import Feedback from "../components/checkIn/Feedback";
import { useAxiosAuthenticated } from "../hooks/useAxiosAuthenticated";
import { ValidInput } from "../types/types";
import AuthContext from "./Auth";

type ContextType = {
	notAllFieldsAreValid: boolean;
	setNotAllFieldAreValid: (value: boolean) => void;
	submitWeeklyReport: () => Promise<string>;
	/* CHECK-IN SCREEN 1 */
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
	/* CHECK-IN SCREEN 2 */
	howHasYourWeekBeen: string;
	howHasYourWeekBeenComment: ValidInput | null;
	setHowHasYourWeekBeen: (howHasTheWeekBeen: string) => void;
	setHowHasYourWeekBeenComment: (howHasYourWeekBeenComment: ValidInput) => void;
	/* CHECK-IN SCREEN 3 */
	howHasYourHungerBeen: string;
	howHasYourHungerBeenComment: ValidInput | null;
	setHowHasYourHungerBeen: (howHasYourHungerBeen: string) => void;
	setHowHasYourHungerBeenComment: (howHasYourHungerBeenComment: ValidInput) => void;
	/* CHECK-IN SCREEN 4 */
	howHasYourGymStrengthBeen: string;
	howHasYourGymStrengthBeenComment: ValidInput | null;
	setHowHasYourGymStrengthBeen: (howHasYourGymStrengthBeen: string) => void;
	setHowHasYourGymStrengthBeenComment: (
		howHasYourGymStrengthBeenComment: ValidInput
	) => void;
	/* CHECK-IN SCREEN 5 */
	howHasYourSleepBeen: string;
	howHasYourSleepBeenComment: ValidInput | null;
	setHowHasYourSleepBeen: (howHasYourGymStrengthBeen: string) => void;
	setHowHasYourSleepBeenComment: (howHasYourGymStrengthBeenComment: ValidInput) => void;
	/* CHECK-IN SCREEN 6 */
	haveYouStickedToThePlan: string;
	haveYouStickedToThePlanComment: ValidInput | null;
	setHaveYouStickedToThePlan: (howHasYourGymStrengthBeen: string) => void;
	setHaveYouStickedToThePlanComment: (
		howHasYourGymStrengthBeenComment: ValidInput
	) => void;
	/* CHECK-IN SCREEN 7 */
	feedbackComment: ValidInput | null;
	setFeedbackComment: (howHasYourGymStrengthBeenComment: ValidInput) => void;
};

const WeeklyReport = React.createContext<ContextType>({
	notAllFieldsAreValid: true,
	setNotAllFieldAreValid: () => {},
	submitWeeklyReport: async () => "",
	/* CHECK-IN SCREEN 1 */
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
	/* CHECK-IN SCREEN 2 */
	howHasYourWeekBeen: "",
	howHasYourWeekBeenComment: { valid: false, text: "" },
	setHowHasYourWeekBeen: () => {},
	setHowHasYourWeekBeenComment: () => {},
	/* CHECK-IN SCREEN 3 */
	howHasYourHungerBeen: "",
	howHasYourHungerBeenComment: { valid: false, text: "" },
	setHowHasYourHungerBeen: () => {},
	setHowHasYourHungerBeenComment: () => {},
	/* CHECK-IN SCREEN 4 */
	howHasYourGymStrengthBeen: "",
	howHasYourGymStrengthBeenComment: { valid: false, text: "" },
	setHowHasYourGymStrengthBeen: () => {},
	setHowHasYourGymStrengthBeenComment: () => {},
	/* CHECK-IN SCREEN 5 */
	howHasYourSleepBeen: "",
	howHasYourSleepBeenComment: { valid: false, text: "" },
	setHowHasYourSleepBeen: () => {},
	setHowHasYourSleepBeenComment: () => {},
	/* CHECK-IN SCREEN 6 */
	haveYouStickedToThePlan: "",
	haveYouStickedToThePlanComment: { valid: false, text: "" },
	setHaveYouStickedToThePlan: () => {},
	setHaveYouStickedToThePlanComment: () => {},
	/* CHECK-IN SCREEN 6 */
	feedbackComment: { valid: false, text: "" },
	setFeedbackComment: () => {},
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
	// CHECK-IN SCREEN 1 { text: "50", valid: true }
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
	// CHECK-IN SCREEN 2
	const [howHasYourWeekBeen, setHowHasYourWeekBeen] = useState<string>("Exemplarisk!");
	const [howHasYourWeekBeenComment, setHowHasYourWeekBeenComment] =
		useState<ValidInput | null>(null);
	// CHECK-IN SCREEN 3
	const [howHasYourHungerBeen, setHowHasYourHungerBeen] =
		useState<string>("Exemplarisk!");
	const [howHasYourHungerBeenComment, setHowHasYourHungerBeenComment] =
		useState<ValidInput | null>(null);
	// CHECK-IN SCREEN 4
	const [howHasYourGymStrengthBeen, setHowHasYourGymStrengthBeen] =
		useState<string>("Exemplarisk!");
	const [howHasYourGymStrengthBeenComment, setHowHasYourGymStrengthBeenComment] =
		useState<ValidInput | null>(null);
	// CHECK-IN SCREEN 5
	const [howHasYourSleepBeen, setHowHasYourSleepBeen] = useState<string>("Exemplarisk!");
	const [howHasYourSleepBeenComment, setHowHasYourSleepBeenComment] =
		useState<ValidInput | null>(null);
	// CHECK-IN SCREEN 6
	const [haveYouStickedToThePlan, setHaveYouStickedToThePlan] =
		useState<string>("Exemplarisk!");
	const [haveYouStickedToThePlanComment, setHaveYouStickedToThePlanComment] =
		useState<ValidInput | null>(null);
	// CHECK-IN SCREEN 7
	const [feedbackComment, setFeedbackComment] = useState<ValidInput | null>(null);

	const submitWeeklyReport = async (): Promise<string> => {
		try {
			const fields = {
				/* CHECK-IN SCREEN 1 */
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
				/* CHECK-IN SCREEN 2 */
				howHasYourWeekBeen: howHasYourWeekBeen,
				howHasYourWeekBeenComment: howHasYourWeekBeenComment?.text,
				/* CHECK-IN SCREEN 3 */
				howHasYourGymStrengthBeen: howHasYourGymStrengthBeen,
				howHasYourGymStrengthBeenComment: howHasYourGymStrengthBeenComment?.text,
				/* CHECK-IN SCREEN 4 */
				howHasYourHungerBeen: howHasYourHungerBeen,
				howHasYourHungerBeenComment: howHasYourHungerBeenComment?.text,
				/* CHECK-IN SCREEN 5 */
				howHasYourSleepBeen: howHasYourSleepBeen,
				howHasYourSleepBeenComment: howHasYourSleepBeenComment?.text,
				/* CHECK-IN SCREEN 6 */
				haveYouStickedToThePlan: haveYouStickedToThePlan,
				haveYouStickedToThePlanComment: haveYouStickedToThePlanComment?.text,
				/* CHECK-IN SCREEN 7 */
				feedbackComment: feedbackComment?.text,
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
		const fieldsToValidate = [weight, biceps, glutes, waist, thighs, weeklySteps];
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
		howHasYourGymStrengthBeen,
		howHasYourGymStrengthBeenComment,
		howHasYourWeekBeenComment,
		howHasYourHungerBeenComment,
	]);

	const state = useMemo(
		() => ({
			notAllFieldsAreValid,
			setNotAllFieldAreValid,
			submitWeeklyReport,
			/* CHECK-IN SCREEN 1 */
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
			/* CHECK-IN SCREEN 2 */
			howHasYourWeekBeen,
			howHasYourWeekBeenComment,
			setHowHasYourWeekBeen,
			setHowHasYourWeekBeenComment,
			/* CHECK-IN SCREEN 3 */
			howHasYourHungerBeen,
			howHasYourHungerBeenComment,
			setHowHasYourHungerBeen,
			setHowHasYourHungerBeenComment,
			/* CHECK-IN SCREEN 4 */
			howHasYourGymStrengthBeen,
			howHasYourGymStrengthBeenComment,
			setHowHasYourGymStrengthBeenComment,
			setHowHasYourGymStrengthBeen,
			/* CHECK-IN SCREEN 5 */
			howHasYourSleepBeen,
			howHasYourSleepBeenComment,
			setHowHasYourSleepBeen,
			setHowHasYourSleepBeenComment,
			/* CHECK-IN SCREEN 6 */
			haveYouStickedToThePlan,
			haveYouStickedToThePlanComment,
			setHaveYouStickedToThePlan,
			setHaveYouStickedToThePlanComment,
			/* CHECK-IN SCREEN 7 */
			feedbackComment,
			setFeedbackComment,
		}),
		[
			notAllFieldsAreValid,
			setNotAllFieldAreValid,
			submitWeeklyReport,
			/* CHECK-IN SCREEN 1 */
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
			/* CHECK-IN SCREEN 2 */
			howHasYourWeekBeen,
			howHasYourWeekBeenComment,
			setHowHasYourWeekBeen,
			setHowHasYourWeekBeenComment,
			/* CHECK-IN SCREEN 3 */
			howHasYourHungerBeen,
			howHasYourHungerBeenComment,
			setHowHasYourHungerBeen,
			setHowHasYourHungerBeenComment,
			/* CHECK-IN SCREEN 4 */
			howHasYourGymStrengthBeen,
			howHasYourGymStrengthBeenComment,
			setHowHasYourGymStrengthBeenComment,
			setHowHasYourGymStrengthBeen,
			/* CHECK-IN SCREEN 5 */
			howHasYourSleepBeen,
			howHasYourSleepBeenComment,
			setHowHasYourSleepBeen,
			setHowHasYourSleepBeenComment,
			/* CHECK-IN SCREEN 6 */
			haveYouStickedToThePlan,
			haveYouStickedToThePlanComment,
			setHaveYouStickedToThePlan,
			setHaveYouStickedToThePlanComment,
			/* CHECK-IN SCREEN 7 */
			feedbackComment,
			setFeedbackComment,
		]
	);

	return <WeeklyReport.Provider value={state}>{children}</WeeklyReport.Provider>;
};

export default WeeklyReport;
