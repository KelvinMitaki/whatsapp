import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View, Animated } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomModal from "../Modals/CustomModal";

const HomeHeaderRight = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const height = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.headerRight}>
      <View style={styles.ellipsis}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", true)}
          onPress={() => {}}
        >
          <View>
            <MaterialIcons name="search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.ellipsis}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", true)}
          onPress={() => {
            setShowModal(true);
            Animated.parallel([
              Animated.timing(height, {
                toValue: 200,
                useNativeDriver: false,
                duration: 300
              }),
              Animated.timing(width, {
                toValue: 150,
                useNativeDriver: false,
                duration: 300
              })
            ]).start();
          }}
        >
          <View>
            <Ionicons name="ellipsis-vertical-sharp" size={20} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        height={height}
        width={width}
      />
    </View>
  );
};

export default HomeHeaderRight;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    width: "150%",
    justifyContent: "space-around"
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "transparent"
  }
});
