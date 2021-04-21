import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Image } from "react-native-elements";
import StatusViewInput from "./StatusViewInput";

interface Props {
  resetWidth: () => void;
  setShowKeyboard: (value: React.SetStateAction<boolean>) => void;
  imageOpacity: Animated.Value;
  translateY: Animated.Value;
  replyOpacity: Animated.Value;
  statusBarWidth: Animated.Value;
  showKeyboard: boolean;
}

const StatusViewImage: React.FC<Props> = ({
  replyOpacity,
  imageOpacity,
  resetWidth,
  setShowKeyboard,
  showKeyboard,
  statusBarWidth,
  translateY
}) => {
  return (
    <Image
      source={require("../../assets/1.jpg")}
      style={[
        {
          width: "100%",
          height: "100%",
          transform: [{ translateY: -70 }]
        }
      ]}
      resizeMode="contain"
    >
      <TouchableWithoutFeedback
        onPress={() => {
          resetWidth();
          setShowKeyboard(false);
          imageOpacity.setValue(1);
          translateY.setValue(30);
          replyOpacity.setValue(1);
          Animated.timing(statusBarWidth, {
            toValue: Dimensions.get("screen").width - 15,
            useNativeDriver: false,
            duration: 5000
          }).start();
        }}
        touchSoundDisabled
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
          {showKeyboard && <StatusViewInput />}
        </Animated.View>
      </TouchableWithoutFeedback>
    </Image>
  );
};

export default StatusViewImage;

const styles = StyleSheet.create({});
