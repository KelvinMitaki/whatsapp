import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data/data";
import inspect from "../inspect";
import HomeChat from "../components/Home/HomeChat";
import { useHeaderHeight } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { useQuery, useSubscription } from "@apollo/client";
import { FETCH_CHATS, FETCH_CURRENT_USER } from "../graphql/queries";
import StartChat from "../components/Home/StartChat";
import { ADD_NEW_CHAT_SUB } from "../graphql/subscriptions";
import { Chat, CurrentUser } from "../interfaces/Chat";

export interface SetHeaderHeight {
  type: "setHeaderHeight";
  payload: number;
}

export interface SetSearchModal {
  type: "setSearchModal";
  payload: boolean;
}

const HomeScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const { data } = useQuery(FETCH_CHATS, { fetchPolicy: "cache-only" });
  const user = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const [chatSub, setChatSub] = useState<Chat[]>([]);
  const currentUser: CurrentUser = user.data.fetchCurrentUser;
  const chat = useSubscription(ADD_NEW_CHAT_SUB, { variables: { userID: currentUser._id } });
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    dispatch<SetHeaderHeight>({ type: "setHeaderHeight", payload: headerHeight });
  }, []);
  useEffect(() => {
    if (chat.data && chat.data.addNewChat) {
      setChatSub(c => [chat.data.addNewChat, ...c]);
    }
  }, [chat.data]);
  return (
    <View style={styles.prt}>
      <NavigationEvents
        onDidBlur={() => dispatch<SetSearchModal>({ type: "setSearchModal", payload: false })}
      />
      <HomeChat
        chatSub={chatSub}
        chat={chat.data && chat.data.addNewChat ? chat.data.addNewChat : null}
      />
      {data && data.fetchChats && <StartChat chats={data.fetchChats} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {
    height: "100%",
    justifyContent: "space-between"
  }
});
