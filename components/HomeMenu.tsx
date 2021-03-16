import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import Menu, { MenuItem } from "react-native-material-menu";
import inspect from "../inspect";

interface Props {
  menuRef: Menu;
}

const HomeMenu: React.FC<Props> = ({ menuRef }) => {
  return (
    <View style={styles.prt}>
      <MenuItem
        onPress={() => {
          //   menuRef.hide();
        }}
      >
        <View>
          <TouchableNativeFeedback
            background={
              //@ts-ignore
              TouchableNativeFeedback.Ripple("#FFFFFF", false)
            }
            style={{ backgroundColor: "red", width: "100%", height: 30 }}
          >
            <View>
              <Text
                style={{
                  color: "#fff"
                  // paddingHorizontal: 20,
                  // paddingVertical: 15
                }}
              >
                New group
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </MenuItem>
      <MenuItem
        onPress={() => {
          menuRef.hide();
        }}
      >
        <TouchableNativeFeedback
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#FFFFFF", false)
          }
        >
          <View>
            <Text
              style={{
                color: "#fff"
                // paddingHorizontal: 20,
                // paddingVertical: 15
              }}
            >
              New broadcast
            </Text>
          </View>
        </TouchableNativeFeedback>
      </MenuItem>
      <MenuItem
        onPress={() => {
          menuRef.hide();
        }}
      >
        <TouchableNativeFeedback
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#FFFFFF", false)
          }
        >
          <View>
            <Text
              style={{
                color: "#fff"
                // paddingHorizontal: 20,
                // paddingVertical: 15
              }}
            >
              Starred messages
            </Text>
          </View>
        </TouchableNativeFeedback>
      </MenuItem>
      <MenuItem
        onPress={() => {
          menuRef.hide();
        }}
      >
        <TouchableNativeFeedback
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#FFFFFF", false)
          }
        >
          <View>
            <Text
              style={{
                color: "#fff"
                // paddingHorizontal: 20,
                // paddingVertical: 15
              }}
            >
              Settings
            </Text>
          </View>
        </TouchableNativeFeedback>
      </MenuItem>
    </View>
  );
};

export default HomeMenu;

const styles = StyleSheet.create({
  prt: {
    backgroundColor: "#14191d"
    // position: "absolute",
    // width: 170
    // right: "0%",
    // top: "-20%",
    // zIndex: 10,
    // elevation: Platform.OS === "android" ? 50 : 0,
  }
});
