import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import inspect from "../../inspect";

const StatusBarTopLoader = () => {
  const test = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(test, {
      toValue: Dimensions.get("screen").width - 15,
      useNativeDriver: false,
      duration: 5000
    }).start();
  }, []);
  return (
    <View
      style={{
        width: Dimensions.get("screen").width - 15,
        alignSelf: "center",
        height: 10,
        justifyContent: "flex-end"
      }}
    >
      <View
        style={{
          backgroundColor: "rgba(255,255,255,.3)",
          height: 3,
          width: "100%",
          borderRadius: 100
        }}
      >
        <Animated.View
          style={[{ backgroundColor: "#fff", height: 3, borderRadius: 100 }, { width: test }]}
        ></Animated.View>
      </View>
    </View>
  );
};

export default StatusBarTopLoader;

const styles = StyleSheet.create({});
