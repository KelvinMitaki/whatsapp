import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../inspect";

const ContactScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>ContactScreen ContactScreen</Text>
    </View>
  );
};

ContactScreen.navigationOptions = {
  headerTitle: () => (
    <View>
      <Text style={{ fontSize: 20, color: "#fff" }}>Select Contact</Text>
      <Text style={{ color: "#fff" }}>200 contacts</Text>
    </View>
  ),
  headerRight: () => (
    <View style={styles.headerRight}>
      <View style={styles.ellipsis}>
        <TouchableNativeFeedback
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#fff", true)
          }
          onPress={() => {}}
        >
          <View>
            <Ionicons name="ios-search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.ellipsis}>
        <TouchableNativeFeedback
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#fff", true)
          }
          onPress={() => {}}
        >
          <View>
            <Ionicons name="ellipsis-vertical-sharp" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
};

export default ContactScreen;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    width: "170%",
    justifyContent: "space-evenly"
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "transparent"
  }
});
