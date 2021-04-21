import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import StatusViewHeader from "../components/StatusView/StatusViewHeader";
import MuteStatusModal from "../components/Modals/MuteStatusModal";
import Reply from "../components/StatusView/Reply";
import inspect from "../inspect";
import { Image, Input } from "react-native-elements";
import StatusViewInput from "../components/StatusView/StatusViewInput";
import StatusBarTopLoader from "../components/StatusView/StatusBarTopLoader";
import StatusViewImage from "../components/StatusView/StatusViewImage";
import { images } from "../data/images";

const StatusViewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [statusVisible, setStatusVisible] = useState<boolean>(false);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const translateY = useRef(new Animated.Value(30)).current;
  const replyOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(1)).current;
  const statusBarWidth = useRef(new Animated.Value(0)).current;
  const [currentImg, setCurrentImg] = useState<number>(0);
  useEffect(() => {
    Animated.timing(statusBarWidth, {
      toValue: Dimensions.get("screen").width / images.length - 10,
      useNativeDriver: false,
      duration: 5000
    }).start();
  }, []);

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
          }).start(() => {
            setShowKeyboard(true);
          });
          replyOpacity.setValue(0);
          Animated.timing(statusBarWidth, {
            toValue: Dimensions.get("screen").width / images.length - 10,
            useNativeDriver: false,
            duration: 5000
          }).stop();
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
      <View
        style={{ height: "100%", width: "100%", backgroundColor: "#000" }}
        {...panResponder.panHandlers}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {images.map((image, i) => (
            <StatusBarTopLoader
              statusBarWidth={statusBarWidth}
              key={image}
              index={i}
              currentImg={currentImg}
            />
          ))}
        </View>
        <StatusViewHeader
          width={width}
          opacity={opacity}
          setWidth={setWidth}
          resetWidth={resetWidth}
          setStatusVisible={setStatusVisible}
        />

        <StatusViewImage
          resetWidth={resetWidth}
          setShowKeyboard={setShowKeyboard}
          imageOpacity={imageOpacity}
          translateY={translateY}
          replyOpacity={replyOpacity}
          statusBarWidth={statusBarWidth}
          showKeyboard={showKeyboard}
          currentImg={currentImg}
          setCurrentImg={setCurrentImg}
        />

        <Reply translateY={translateY} replyOpacity={replyOpacity} />
        <MuteStatusModal setStatusVisible={setStatusVisible} statusVisible={statusVisible} />
      </View>
    </>
  );
};

export default StatusViewScreen;
