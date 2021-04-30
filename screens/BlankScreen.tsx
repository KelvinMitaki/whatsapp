import { useLazyQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { FETCH_CURRENT_USER } from "../graphql/queries";

const BlankScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [fetchCurrentUser] = useLazyQuery(FETCH_CURRENT_USER, {
    onCompleted() {
      navigation.replace("Home");
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
