import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent, useHeaderHeight } from "react-navigation-stack";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { countries } from "../data/countries";
import Country from "../components/Country/Country";
import inspect from "../inspect";
// http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg

interface Params {
  headerHeight: number;
}

const CountryScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    navigation.setParams({ headerHeight });
  }, []);
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

CountryScreen.navigationOptions = ({ navigation }) => {
  const headerHeight = navigation.getParam("headerHeight");

  return {
    headerTitle: "Choose a country",
    headerRight: () => (
      <View style={{ width: "125%", alignItems: "center" }}>
        <View
          style={[
            styles.search,
            {
              height: headerHeight
            }
          ]}
        >
          <View style={{ justifyContent: "center", alignItems: "center", width: "15%" }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fff", true)}>
                <View>
                  <AntDesign name="arrowleft" size={25} color="#fff" />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <TextInput
            style={{ width: "80%", fontSize: 20, paddingHorizontal: 10, color: "#fff" }}
            placeholder="Search country"
            placeholderTextColor="rgba(255,255,255,.4)"
          />
        </View>
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
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    width: Dimensions.get("screen").width,
    backgroundColor: "#20272b",
    elevation: 1
  }
});
