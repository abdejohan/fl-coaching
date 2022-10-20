import { useContext, useEffect } from "react";
import AuthContext from "../context/Auth";
import * as TalkRn from "@talkjs/expo";
import { useIsFocused } from "@react-navigation/native";
import NotificationsContext from "../context/Notifications";
import Constants from "expo-constants";

const ChatScreen: React.FC = () => {
	const { user } = useContext(AuthContext);
	const { setChatBadgeCount } = useContext(NotificationsContext);
	const isFocused = useIsFocused();

	const userChatProfile: TalkRn.User = {
		id: "FL_" + user!.id.toString(),
		photoUrl: user?.avatar,
		name: user?.name,
		role: "default",
	};

	useEffect(() => {
		if (isFocused) {
			setChatBadgeCount(0);
		}
	}, [isFocused]);

	const coachChatProfile: TalkRn.User = { id: "FL_1" };
	const conversationBuilder = TalkRn.getConversationBuilder(
		TalkRn.oneOnOneId(userChatProfile, coachChatProfile)
	);
	conversationBuilder.setParticipant(userChatProfile);
	conversationBuilder.setParticipant(coachChatProfile);

	return (
		<TalkRn.Session appId={Constants?.manifest?.extra?.chatAppID} me={userChatProfile}>
			<TalkRn.Chatbox showChatHeader={false} conversationBuilder={conversationBuilder} />
		</TalkRn.Session>
	);
};

export default ChatScreen;
