import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, AppState, AppStateStatus } from "react-native";
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
import { Chat, CurrentUser } from "../interfaces/ChatInterface";

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
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [chatSub, setChatSub] = useState<Chat[]>([]);
  const currentUser: CurrentUser = user.data.fetchCurrentUser;
  const chat = useSubscription(ADD_NEW_CHAT_SUB, { variables: { userID: currentUser._id } });
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    dispatch<SetHeaderHeight>({ type: "setHeaderHeight", payload: headerHeight });
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };
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
