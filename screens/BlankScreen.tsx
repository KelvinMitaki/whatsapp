import { useLazyQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import {
  FETCH_CHATS,
  FETCH_CURRENT_USER,
  FETCH_GROUPS,
  FETCH_UNREAD_GROUP_MSGS,
  FETCH_USERS
} from "../graphql/queries";

const BlankScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [fetchChats] = useLazyQuery(FETCH_CHATS, {
    onCompleted() {
      navigation.replace("Tab");
    }
  });
  const [fetchUsers] = useLazyQuery(FETCH_USERS);
  const [fetchGroups] = useLazyQuery(FETCH_GROUPS);
  const [fetchUnreadGroupMsgs] = useLazyQuery(FETCH_UNREAD_GROUP_MSGS);
  const [fetchCurrentUser] = useLazyQuery(FETCH_CURRENT_USER, {
    onCompleted() {
      fetchChats();
      fetchGroups();
      fetchUnreadGroupMsgs();
    },
    onError() {
      navigation.replace("Start");
    }
  });
  useEffect(() => {
    loginUser();
  }, []);
  const loginUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.replace("Start");
    } else {
      fetchCurrentUser();
      fetchUsers();
    }
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator color="#00af9c" size="large" />
    </View>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({});
