import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";

const BroadcastScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>qBroadcastScreen BroadcastScreen</Text>
    </View>
  );
};

BroadcastScreen.navigationOptions = {
  headerTitle: "New broadcast",
  headerRight: () => (
    <View style={{ width: "125%", alignItems: "center" }}>
      <View style={styles.searchBorder}>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple("#fff", true)}
        >
          <View>
            <MaterialIcons name="search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
};

export default BroadcastScreen;

const styles = StyleSheet.create({
  searchBorder: {
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "transparent",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
