import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomModal from "./CustomModal";

const HomeHeaderRight = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

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
          onPress={() => setShowModal(true)}
        >
          <View>
            <Ionicons name="ellipsis-vertical-sharp" size={20} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <CustomModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

export default HomeHeaderRight;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    width: "170%",
    justifyContent: "space-evenly"
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
