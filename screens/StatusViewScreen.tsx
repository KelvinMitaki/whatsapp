import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import StatusViewHeader from "../components/StatusView/StatusViewHeader";
import MuteStatusModal from "../components/Modals/MuteStatusModal";
import Reply from "../components/StatusView/Reply";
import inspect from "../inspect";
import { Image, Input } from "react-native-elements";
import StatusViewInput from "../components/StatusView/StatusViewInput";

const StatusViewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [statusVisible, setStatusVisible] = useState<boolean>(false);
  const translateY = useRef(new Animated.Value(30)).current;
  const replyOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, guesture) => {
        if (guesture.dy > 30) {
          translateY.setValue(30);
        } else {
          translateY.setValue(guesture.dy);
          if (guesture.dy < -1 && guesture.dy > -100) {
            replyOpacity.setValue(1 - guesture.dy / -100);
            imageOpacity.setValue(1 - guesture.dy / -100);
          } else {
            imageOpacity.setValue(0);
          }
        }
      },
      onPanResponderRelease: (e, g) => {
        if (g.dy < -100) {
          Animated.timing(translateY, {
            toValue: -(Dimensions.get("screen").height + 200),
            useNativeDriver: false
          }).start();
          replyOpacity.setValue(0);
        } else {
          translateY.setValue(30);
          replyOpacity.setValue(1);
          imageOpacity.setValue(1);
        }
      }
    })
  ).current;
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
      {/* <TouchableWithoutFeedback onPress={resetWidth} touchSoundDisabled> */}
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#000" }}
        {...panResponder.panHandlers}
      >
        <StatusViewHeader
          width={width}
          opacity={opacity}
          setWidth={setWidth}
          resetWidth={resetWidth}
          setStatusVisible={setStatusVisible}
        />

        <Image
          source={require("../assets/1.jpg")}
          style={[
            {
              width: "100%",
              height: "100%",
              transform: [{ translateY: -70 }]
            }
          ]}
          resizeMode="contain"
        >
          <Animated.View
            style={{
              backgroundColor: imageOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: ["rgba(0,0,0,.5)", "rgba(0,0,0,0)"]
              }),
              height: "100%",
              width: "100%"
            }}
          >
            <StatusViewInput />
          </Animated.View>
        </Image>
        <Animated.View
          style={[
            { position: "absolute", bottom: 30, right: Dimensions.get("screen").width / 2 },
            {
              transform: [{ translateY }],
              opacity: replyOpacity
            }
          ]}
        >
          <Reply />
        </Animated.View>
        <MuteStatusModal setStatusVisible={setStatusVisible} statusVisible={statusVisible} />
      </View>
      {/* </TouchableWithoutFeedback> */}
    </>
  );
};

export default StatusViewScreen;

const styles = StyleSheet.create({});
