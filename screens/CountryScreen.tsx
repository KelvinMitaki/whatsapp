import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";

const CountryScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View>
      <Text style={{ color: "#fff" }}>CountryScreen CountryScreen</Text>
    </View>
  );
};

CountryScreen.navigationOptions = {
  headerTitle: "Choose a country",
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

export default CountryScreen;

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
