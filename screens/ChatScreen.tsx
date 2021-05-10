import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Message from "../components/Chat/Message";
import Input, { MESSAGE_LIMIT } from "../components/Chat/Input";
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { FETCH_CURRENT_USER, FETCH_MESSAGES, FETCH_MESSAGE_COUNT } from "../graphql/queries";
import { UPDATE_READ_MESSAGES, UPDATE_USER_TYPING } from "../graphql/mutations";
import { CurrentUser, MessageInterface, UserOnline } from "../interfaces/ChatInterface";
import ChatScreenHeader from "../components/Chat/ChatScreenHeader";
import { UPDATE_USER_ONLINE_SUB } from "../graphql/subscriptions";

interface Params {
  recipient: {
    _id: string;
    name: string;
    typing: string;
    lastSeen: string;
    online: boolean;
  };
  chatID: string;
}
const ChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
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
    fetchPolicy: "network-only",
    onError(err) {
      console.log(err);
    }
  });
  const user = useQuery(FETCH_CURRENT_USER);
  const currentUser: CurrentUser = user.data.fetchCurrentUser;
  const chatID = navigation.getParam("chatID");
  const [updateReadMessages] = useMutation(UPDATE_READ_MESSAGES);
  const [updateUserTyping] = useMutation(UPDATE_USER_TYPING);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    };
  }, []);
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
      updateUserTyping({ variables: { typing: true, chatID } });
    } else {
      updateUserTyping({ variables: { typing: false, chatID } });
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
