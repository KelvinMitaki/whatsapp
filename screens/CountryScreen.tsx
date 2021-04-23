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
import CountryHeader from "../components/Country/CountryHeader";
// http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg

interface Params {
  headerHeight: number;
  animatedScale: Animated.CompositeAnimation;
  animatedBorderRadius: Animated.CompositeAnimation;
  scale: Animated.Value;
  borderRadius: Animated.Value;
}

const CountryScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  return (
    <View>
      <CountryHeader />
      <FlatList
        data={countries}
        keyExtractor={c => c.code}
        renderItem={({ item }) => <Country item={item} />}
      />
    </View>
  );
};

export default CountryScreen;

const styles = StyleSheet.create({});
