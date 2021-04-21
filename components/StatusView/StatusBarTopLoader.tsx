import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import inspect from "../../inspect";

interface Props {
  statusBarWidth: Animated.Value;
}

const StatusBarTopLoader: React.FC<Props> = ({ statusBarWidth }) => {
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
          height: 2,
          width: "100%",
          borderRadius: 100
        }}
      >
        <Animated.View
          style={[
            { backgroundColor: "#fff", height: 2, borderRadius: 100 },
            { width: statusBarWidth }
          ]}
        ></Animated.View>
      </View>
    </View>
  );
};

export default StatusBarTopLoader;

const styles = StyleSheet.create({});
