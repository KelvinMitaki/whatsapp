import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { Image } from "react-native-elements";
import AppColors from "../../Colors/color";
import { images } from "../../data/images";
import StatusViewInput from "./StatusViewInput";

interface Props {
  resetWidth: () => void;
  setShowKeyboard: (value: React.SetStateAction<boolean>) => void;
  imageOpacity: Animated.Value;
  translateY: Animated.Value;
  replyOpacity: Animated.Value;
  statusBarWidth: Animated.Value;
  showKeyboard: boolean;
  setCurrentImg: React.Dispatch<React.SetStateAction<number>>;
  currentImg: number;
}

const StatusViewImage: React.FC<Props> = ({
  replyOpacity,
  imageOpacity,
  resetWidth,
  setShowKeyboard,
  showKeyboard,
  statusBarWidth,
  translateY,
  setCurrentImg,
  currentImg
}) => {
  return (
    <Image
      source={{
        uri: images[currentImg]
      }}
      style={[
        {
          width: "100%",
          height: "100%",
          transform: [{ translateY: -70 }]
        }
      ]}
      resizeMode="contain"
      PlaceholderContent={<ActivityIndicator color={AppColors.primary} size="large" />}
      progressiveRenderingEnabled
      placeholderStyle={{ backgroundColor: "#000" }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          resetWidth();
          setShowKeyboard(false);
          imageOpacity.setValue(1);
          translateY.setValue(30);
          replyOpacity.setValue(1);
          if (showKeyboard) {
            Animated.timing(statusBarWidth, {
              toValue: Dimensions.get("screen").width / images.length - 10,
              useNativeDriver: false,
              duration: 5000
            }).start();
          }
          if (currentImg === images.length - 1) {
            statusBarWidth.setValue(0);
          }
          if (!showKeyboard) {
            setCurrentImg(i => {
              if (i < images.length - 1) {
                return i + 1;
              }
              return 0;
            });
          }
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
          <StatusViewInput showKeyboard={showKeyboard} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Image>
  );
};

export default StatusViewImage;

const styles = StyleSheet.create({});
