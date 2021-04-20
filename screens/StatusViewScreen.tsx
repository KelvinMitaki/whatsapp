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
import MuteStatusModal from "../components/Modals/MuteStatusModal";
import Reply from "../components/StatusView/Reply";

const StatusViewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [statusVisible, setStatusVisible] = useState<boolean>(false);
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
        <View style={{ height: "100%", width: "100%", backgroundColor: "#000" }}>
          <Image
            source={require("../assets/1.jpg")}
            style={{
              height: Dimensions.get("screen").height,
              width: Dimensions.get("screen").width
            }}
            resizeMode="contain"
          >
            <StatusViewHeader
              width={width}
              opacity={opacity}
              setWidth={setWidth}
              resetWidth={resetWidth}
              setStatusVisible={setStatusVisible}
            />
            <Reply />
          </Image>
          <MuteStatusModal setStatusVisible={setStatusVisible} statusVisible={statusVisible} />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default StatusViewScreen;

const styles = StyleSheet.create({});
