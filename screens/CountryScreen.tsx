import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { countries } from "../data/countries";
import { SvgUri } from "react-native-svg";
import Country from "../components/Country/Country";
// http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg

const CountryScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View>
      <FlatList
        data={countries}
        keyExtractor={c => c.code}
        renderItem={({ item }) => <Country item={item} />}
      />
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
