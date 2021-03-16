import React, { useRef } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeMenu from "./HomeMenu";
import Menu, { MenuItem } from "react-native-material-menu";

const HomeHeaderRight = () => {
  const menuRef = useRef<Menu | null>();
  const menu = (
    <View style={styles.ellipsis}>
      <TouchableNativeFeedback
        background={
          //@ts-ignore
          TouchableNativeFeedback.Ripple("#fff", true)
        }
        onPress={() => menuRef.current && menuRef.current.show()}
      >
        <View>
          <Ionicons name="ellipsis-vertical-sharp" size={25} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
  console.log(menuRef);
  return (
    <View style={styles.headerRight}>
      <View style={styles.ellipsis}>
        <TouchableNativeFeedback
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#fff", true)
          }
          onPress={() => {}}
        >
          <View>
            <Ionicons name="ios-search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <Menu ref={ref => (menuRef.current = ref)} button={menu}>
        {menuRef.current && <HomeMenu menuRef={menuRef.current} />}
      </Menu>
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
