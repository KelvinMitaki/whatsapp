import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";

const HomeScreen: NavigationMaterialTabScreenComponent = () => {
  return (
    <View>
      <Text>HomeScreen HomeScreen</Text>
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: "Chat"
};

export default HomeScreen;

const styles = StyleSheet.create({});
