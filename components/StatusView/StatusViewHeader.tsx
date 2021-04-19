import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { NavigationInjectedProps, withNavigation } from "react-navigation";

interface Props {
  width: Animated.Value;
  opacity: Animated.Value;
  setWidth: () => void;
  resetWidth: () => void;
}

const StatusViewHeader: React.FC<NavigationInjectedProps & Props> = ({
  navigation,
  width,
  opacity,
  setWidth,
  resetWidth
}) => {
  return (
    <View
      style={{
        elevation: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70,
        paddingHorizontal: 10
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableNativeFeedback
          onPress={() => navigation.goBack()}
          background={TouchableNativeFeedback.Ripple("#fff", true)}
        >
          <View style={styles.back}>
            <AntDesign name="arrowleft" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.headerLeft}>
          <View style={styles.person}>
            <Ionicons name="person" size={25} color="rgba(241, 241, 242, 0.8)" />
          </View>
          <View style={{ marginLeft: 10, width: "75%" }}>
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "400"
              }}
            >
              Kevin
            </Text>
            <Text style={{ color: "#fff", fontSize: 13 }}>Yesterday, 11:25 PM</Text>
          </View>
        </View>
      </View>
      <TouchableNativeFeedback
        onPress={resetWidth}
        background={TouchableNativeFeedback.Ripple("#fff", false)}
      >
        <Animated.View style={[styles.mute, { width }]}>
          <Animated.View style={{ opacity }}>
            <Text style={{ color: "#fff", paddingHorizontal: 10 }}>Mute</Text>
          </Animated.View>
        </Animated.View>
      </TouchableNativeFeedback>
      <View
        style={{
          width: 60,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", true)}
          onPress={setWidth}
        >
          <View style={styles.ellipsis}>
            <Ionicons name="ellipsis-vertical-sharp" size={20} color={"#fff"} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default withNavigation(StatusViewHeader);

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%"
  },
  person: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  back: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  ellipsis: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  mute: {
    height: 50,
    backgroundColor: "#20272b",
    justifyContent: "center",
    position: "absolute",
    elevation: 1,
    right: 7
  }
});
