import { useLazyQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { FETCH_CHATS, FETCH_CURRENT_USER, FETCH_USERS } from "../graphql/queries";

const BlankScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [fetchChats] = useLazyQuery(FETCH_CHATS, {
    onCompleted() {
      navigation.replace("Tab");
    }
  });
  const [fetchUsers] = useLazyQuery(FETCH_USERS, {
    onError(err) {
      console.log(err);
    },
    onCompleted(data) {
      console.log(data);
    }
  });
  const [fetchCurrentUser] = useLazyQuery(FETCH_CURRENT_USER, {
    onCompleted() {
      fetchChats();
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
