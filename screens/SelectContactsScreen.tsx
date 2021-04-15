import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const SelectContactsScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>SelectContactsScreen SelectContactsScreen</Text>
    </View>
  );
};

SelectContactsScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <View>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Hide status from...</Text>
        <Text style={{ color: "#fff" }}>No contacts excluded</Text>
      </View>
    ),
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 90,
          marginHorizontal: 10
        }}
      >
        <View style={styles.ellipsis}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View>
              <MaterialIcons name="search" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.ellipsis}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View>
              <MaterialIcons name="playlist-add-check" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  };
};

export default SelectContactsScreen;

const styles = StyleSheet.create({
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
