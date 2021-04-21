import React from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  translateY: Animated.Value;
  replyOpacity: Animated.Value;
}

const Reply: React.FC<Props> = ({ translateY, replyOpacity }) => {
  return (
    <Animated.View
      style={[
        { position: "absolute", bottom: 30, right: Dimensions.get("screen").width / 2 },
        {
          transform: [{ translateY }],
          opacity: replyOpacity
        }
      ]}
    >
      <View style={{ alignSelf: "center", alignItems: "center", position: "absolute", bottom: 30 }}>
        <Entypo name="chevron-small-up" size={25} color="#fff" />
        <Text style={{ color: "#fff" }}>Reply</Text>
      </View>
    </Animated.View>
  );
};

export default Reply;

const styles = StyleSheet.create({});
