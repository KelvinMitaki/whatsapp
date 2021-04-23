import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from "react-native";
import { useHeaderHeight } from "react-navigation-stack";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import inspect from "../../inspect";

const CountryHeader = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const borderRadius = useRef(new Animated.Value(2000)).current;
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  return (
    <View style={{ height: (10 / 100) * height, backgroundColor: "#20272b" }}>
      <Animated.View
        style={[
          styles.search,
          {
            height: "50%",
            width
          },
          {
            borderRadius,
            transform: [{ scale }]
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
              onPress={() => {
                const animatedScale = Animated.timing(scale, {
                  toValue: 0,
                  useNativeDriver: true,
                  duration: 200
                });
                const animatedBorderRadius = Animated.timing(borderRadius, {
                  toValue: 2000,
                  useNativeDriver: true,
                  duration: 200
                });
                Keyboard.dismiss();
                Animated.parallel([animatedScale, animatedBorderRadius]).start();
              }}
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
      <View style={{ position: "absolute", top: "40%", left: 70 }}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Choose a country</Text>
      </View>
      <View style={styles.searchBorder}>
        <TouchableNativeFeedback
          onPress={() => {
            const animatedScale = Animated.timing(scale, {
              toValue: 1,
              useNativeDriver: true,
              duration: 200
            });
            const animatedBorderRadius = Animated.timing(borderRadius, {
              toValue: 0,
              useNativeDriver: true,
              duration: 200
            });
            Animated.parallel([animatedScale, animatedBorderRadius]).start();
          }}
          background={TouchableNativeFeedback.Ripple("#fff", true)}
        >
          <View>
            <MaterialIcons name="search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default CountryHeader;

const styles = StyleSheet.create({
  searchBorder: {
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "transparent",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: "30%"
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: "35%",
    right: 0,
    backgroundColor: "#20272b",
    elevation: 1
  }
});
