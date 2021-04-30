import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const BlankScreen: NavigationStackScreenComponent = ({ navigation }) => {
  useEffect(() => {
    const loginUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.replace("Start");
      } else {
        navigation.replace("Home");
      }
    };
    loginUser();
  }, []);
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator color="#00af9c" size="large" />
    </View>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({});
