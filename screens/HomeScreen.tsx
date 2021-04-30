import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data/data";
import inspect from "../inspect";
import HomeChat from "../components/Home/HomeChat";
import { useHeaderHeight } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { NavigationEvents } from "react-navigation";

export interface SetHeaderHeight {
  type: "setHeaderHeight";
  payload: number;
}

export interface SetSearchModal {
  type: "setSearchModal";
  payload: boolean;
}

const HomeScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    dispatch<SetHeaderHeight>({ type: "setHeaderHeight", payload: headerHeight });
  }, []);
  return (
    <View style={styles.prt}>
      <NavigationEvents
        onDidBlur={() => dispatch<SetSearchModal>({ type: "setSearchModal", payload: false })}
      />
      <HomeChat />
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.message}>
          <MaterialCommunityIcons
            name="android-messages"
            size={30}
            color="#fff"
            style={styles.msgIcon}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {},
  message: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  },
  msgIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }]
  }
});
