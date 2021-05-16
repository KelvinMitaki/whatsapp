import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Message, { SetShouldScrollToBottomOnNewMessages } from "../components/Chat/Message";
import Input, { MESSAGE_LIMIT } from "../components/Chat/Input";
import {
  MutationTuple,
  OperationVariables,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription
} from "@apollo/client";
import { FETCH_CURRENT_USER, FETCH_MESSAGES, FETCH_MESSAGE_COUNT } from "../graphql/queries";
import {
  ADD_STARRED_MESSAGES,
  REMOVE_STARRED_MESSAGES,
  UPDATE_READ_MESSAGES,
  UPDATE_USER_TYPING
} from "../graphql/mutations";
import { CurrentUser, MessageInterface, UserOnline, UserTyping } from "../interfaces/ChatInterface";
import ChatScreenHeader from "../components/Chat/ChatScreenHeader";
import { UPDATE_USER_ONLINE_SUB, UPDATE_USER_TYPING_SUB } from "../graphql/subscriptions";
import { useDispatch } from "react-redux";
import { NavigationEvents } from "react-navigation";

interface Params {
  recipient: {
    _id: string;
    name: string;
    typing: boolean;
    lastSeen: string;
    online: boolean;
  };
  chatID: string;
  setSelectedMsgs: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  selectedMsgs: MessageInterface[];
  addStarredMessages: MutationTuple<any, OperationVariables>[0];
  removeStarredMessages: MutationTuple<any, OperationVariables>[0];
  currentUser: CurrentUser;
}

export interface SetUserTyping {
  type: "setUserTyping";
  payload: UserTyping;
}
const ChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const [selectedMsgs, setSelectedMsgs] = useState<MessageInterface[]>([]);
  const dispatch = useDispatch();
  const chatID = navigation.getParam("chatID");
  const recipient = navigation.getParam("recipient");
  useSubscription(UPDATE_USER_ONLINE_SUB, {
    onSubscriptionData(subData) {
      const onlineData: UserOnline = subData.subscriptionData.data.updateUserOnline;
      if (onlineData.userID === recipient._id) {
        navigation.setParams({
          recipient: { ...recipient, online: onlineData.online, lastSeen: new Date().toString() }
        });
      }
    }
  });
  useSubscription(UPDATE_USER_TYPING_SUB, {
    variables: { chatID },
    onSubscriptionData(subData) {
      const userTyping: UserTyping = subData.subscriptionData.data.updateUserTyping;
      if (chatID === userTyping.chatID && userTyping.typingUserID !== currentUser._id) {
        dispatch<SetUserTyping>({ type: "setUserTyping", payload: userTyping });
        navigation.setParams({ recipient: { ...recipient, typing: userTyping.typing } });
      }
    }
  });
  const count = useQuery(FETCH_MESSAGE_COUNT, {
    variables: { recipient: recipient._id },
    onCompleted() {
      fetchMessages({
        variables: {
          recipient: recipient._id,
          offset: 0,
          limit: MESSAGE_LIMIT,
          messageCount: count.data.fetchMessageCount.count
        }
      });
    },
    onError(err) {
      console.log(err);
    },
    fetchPolicy: "network-only"
  });
  const [fetchMessages, { loading, data, fetchMore }] = useLazyQuery(FETCH_MESSAGES, {
    fetchPolicy: "network-only"
  });
  const user = useQuery(FETCH_CURRENT_USER);
  const currentUser: CurrentUser = user.data.fetchCurrentUser;
  const [updateReadMessages] = useMutation(UPDATE_READ_MESSAGES);
  const [updateUserTyping] = useMutation(UPDATE_USER_TYPING);
  const [addStarredMessages] = useMutation(ADD_STARRED_MESSAGES, {
    update(cache, { data: { addStarredMessages } }) {
      const incommingMsgs: MessageInterface[] = addStarredMessages;
      const msgs: { fetchMessages: MessageInterface[] } | null = cache.readQuery({
        query: FETCH_MESSAGES
      });
      let existingMessages = [...(msgs?.fetchMessages || [])];
      incommingMsgs.forEach(msg => {
        const index = existingMessages.findIndex(m => m._id === msg._id);
        if (index !== -1) {
          existingMessages[index] = msg;
        }
      });
      dispatch<SetShouldScrollToBottomOnNewMessages>({
        type: "setShouldScrollToBottomOnNewMessages",
        payload: false
      });
      cache.writeQuery({ query: FETCH_MESSAGES, data: { fetchMessages: existingMessages } });
    }
  });
  const [removeStarredMessages] = useMutation(REMOVE_STARRED_MESSAGES, {
    update(cache, { data: { removeStarredMessages } }) {
      const incommingMsgs: MessageInterface[] = removeStarredMessages;
      const msgs: { fetchMessages: MessageInterface[] } | null = cache.readQuery({
        query: FETCH_MESSAGES
      });
      let existingMessages = [...(msgs?.fetchMessages || [])];
      incommingMsgs.forEach(msg => {
        const index = existingMessages.findIndex(m => m._id === msg._id);
        if (index !== -1) {
          existingMessages[index] = msg;
        }
      });
      dispatch<SetShouldScrollToBottomOnNewMessages>({
        type: "setShouldScrollToBottomOnNewMessages",
        payload: false
      });
      cache.writeQuery({ query: FETCH_MESSAGES, data: { fetchMessages: existingMessages } });
    }
  });
  useEffect(() => {
    navigation.setParams({
      setSelectedMsgs,
      addStarredMessages,
      removeStarredMessages,
      currentUser
    });
    BackHandler.addEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    };
  }, []);
  useEffect(() => {
    navigation.setParams({ selectedMsgs });
  }, [selectedMsgs]);
  useEffect(() => {
    if (data && data.fetchMessages && data.fetchMessages.length) {
      const messageIDs = (data.fetchMessages as MessageInterface[])
        .filter(m => !m.read && m.sender !== currentUser._id)
        .map(m => m._id);
      messageIDs.length &&
        chatID &&
        updateReadMessages({
          variables: {
            messageIDs,
            chatID
          }
        });
    }
  }, [data]);
  useEffect(() => {
    if (keyboardShown) {
      updateUserTyping({ variables: { typing: true, chatID, typingUserID: currentUser._id } });
    } else {
      updateUserTyping({ variables: { typing: false, chatID, typingUserID: currentUser._id } });
    }
  }, [keyboardShown]);
  const handleBackBtnPressAndroid = () => {
    if (!navigation.isFocused()) {
      return false;
    }
    navigation.navigate("Home");
    return true;
  };
  const screen = Dimensions.get("screen");
  return (
    <View>
      <NavigationEvents
        onWillBlur={() =>
          updateUserTyping({ variables: { typing: false, chatID, typingUserID: currentUser._id } })
        }
        onDidFocus={() =>
          dispatch<SetShouldScrollToBottomOnNewMessages>({
            type: "setShouldScrollToBottomOnNewMessages",
            payload: true
          })
        }
      />
      {((loading && showLoading) || count.loading) && (
        <View
          style={{
            height: screen.height,
            width: screen.width,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#00af9c" />
          <Text style={{ color: "rgba(255,255,255,.8)" }}>Fetching Messages...</Text>
        </View>
      )}
      {data && (
        <View style={{ height: "100%" }}>
          <Message
            messages={data.fetchMessages}
            recipient={navigation.getParam("recipient")._id}
            fetchMore={fetchMore}
            setShowLoading={setShowLoading}
            showLoading={showLoading}
            keyboardShown={keyboardShown}
            selectedMsgs={selectedMsgs}
            setSelectedMsgs={setSelectedMsgs}
          />
          <Input
            screen="chat"
            recipient={navigation.getParam("recipient")._id}
            setKeyboardShown={setKeyboardShown}
          />
        </View>
      )}
    </View>
  );
};

ChatScreen.navigationOptions = ChatScreenHeader;

export default ChatScreen;

const styles = StyleSheet.create({});
