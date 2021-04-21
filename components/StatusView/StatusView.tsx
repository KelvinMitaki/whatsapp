import React, { useEffect } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import StatusViewImage from "./StatusViewImage";
import StatusViewHeader from "./StatusViewHeader";
import StatusBarTopLoader from "./StatusBarTopLoader";
import { images } from "../../data/images";

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
  width: Animated.Value;
  opacity: Animated.Value;
  setWidth: () => void;
  setStatusVisible: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

const StatusView: React.FC<Props> = props => {
  const {
    opacity,
    replyOpacity,
    currentImg,
    imageOpacity,
    index,
    resetWidth,
    setCurrentImg,
    setShowKeyboard,
    setStatusVisible,
    setWidth,
    showKeyboard,
    statusBarWidth,
    translateY,
    width
  } = props;
  useEffect(() => {
    Animated.timing(statusBarWidth, {
      toValue: Dimensions.get("screen").width / images.length - 10,
      useNativeDriver: false,
      duration: 5000
    }).start();
  }, []);
  return (
    <View>
      {/* <StatusBarTopLoader
    statusBarWidth={statusBarWidth}
    index={index}
    currentImg={currentImg}
  /> */}
      <StatusViewHeader
        width={width}
        opacity={opacity}
        setWidth={setWidth}
        resetWidth={resetWidth}
        setStatusVisible={setStatusVisible}
      />
      {/* <StatusViewImage
                resetWidth={resetWidth}
                setShowKeyboard={setShowKeyboard}
                imageOpacity={imageOpacity}
                translateY={translateY}
                replyOpacity={replyOpacity}
                statusBarWidth={statusBarWidth}
                showKeyboard={showKeyboard}
                currentImg={currentImg}
                setCurrentImg={setCurrentImg}
               
              /> */}
    </View>
  );
};

export default StatusView;

const styles = StyleSheet.create({});
