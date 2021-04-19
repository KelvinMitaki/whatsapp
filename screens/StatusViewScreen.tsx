import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Image } from "react-native-elements/dist/image/Image";
import StatusViewHeader from "../components/StatusView/StatusViewHeader";

const StatusViewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const width = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const setWidth = () => {
    Animated.timing(width, { toValue: 150, useNativeDriver: false, duration: 300 }).start(() => {
      Animated.timing(opacity, { toValue: 1, useNativeDriver: false, duration: 50 }).start();
    });
  };
  const resetWidth = () => {
    Animated.timing(width, { toValue: 0, useNativeDriver: false, duration: 300 }).start();
    Animated.timing(opacity, { toValue: 0, useNativeDriver: false, duration: 50 }).start();
  };
  return (
    <>
      <StatusBar hidden />
      <TouchableWithoutFeedback onPress={resetWidth} touchSoundDisabled>
        <View style={{ height: "100%", width: "100%" }}>
          <View>
            <Image
              source={require("../assets/1.jpg")}
              style={{
                height: Dimensions.get("screen").height,
                width: Dimensions.get("screen").width,
                backgroundColor: "#000"
              }}
            >
              <StatusViewHeader
                width={width}
                opacity={opacity}
                setWidth={setWidth}
                resetWidth={resetWidth}
              />
            </Image>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default StatusViewScreen;

const styles = StyleSheet.create({});
