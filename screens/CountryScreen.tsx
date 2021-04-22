import React, { useEffect, useRef } from "react";
import {
  Animated,
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
  animatedHeight: Animated.CompositeAnimation;
  animatedWidth: Animated.CompositeAnimation;
  animatedBorderRadius: Animated.CompositeAnimation;
  height: Animated.Value;
  width: Animated.Value;
  borderRadius: Animated.Value;
}

const CountryScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const height = useRef(new Animated.Value(20)).current;
  const width = useRef(new Animated.Value(20)).current;
  const borderRadius = useRef(new Animated.Value(20)).current;
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    const animatedHeight = Animated.timing(height, {
      toValue: headerHeight,
      useNativeDriver: false
    });
    const animatedWidth = Animated.timing(width, {
      toValue: Dimensions.get("screen").width,
      useNativeDriver: false
    });
    const animatedBorderRadius = Animated.timing(borderRadius, {
      toValue: 0,
      useNativeDriver: false
    });
    navigation.setParams({
      animatedBorderRadius,
      animatedHeight,
      animatedWidth,
      height,
      width,
      borderRadius
    });
  }, [height, width, borderRadius]);
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
  const animatedHeight = navigation.getParam("animatedHeight");
  const animatedWidth = navigation.getParam("animatedWidth");
  const animatedBorderRadius = navigation.getParam("animatedBorderRadius");
  const height = navigation.getParam("height");
  const width = navigation.getParam("width");
  const borderRadius = navigation.getParam("borderRadius");
  return {
    headerTitle: "Choose a country",
    headerRight: () => (
      <View style={{ width: "125%", alignItems: "center" }}>
        <Animated.View
          style={[
            styles.search,
            {
              height,
              width,
              borderRadius
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
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#fff", true)}
                onPress={() =>
                  Animated.parallel([animatedHeight, animatedWidth, animatedBorderRadius]).start()
                }
              >
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
        </Animated.View>
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
    backgroundColor: "#20272b",
    elevation: 1
  }
});
