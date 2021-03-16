import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";

const HomeMenu = () => {
  return (
    <View style={styles.prt}>
      <TouchableNativeFeedback
        onPress={() => {}}
        background={
          //@ts-ignore
          TouchableNativeFeedback.Ripple("#FFFFFF", false)
        }
      >
        <View>
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 15
            }}
          >
            New group
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {}}
        background={
          //@ts-ignore
          TouchableNativeFeedback.Ripple("#FFFFFF", false)
        }
      >
        <View>
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 15
            }}
          >
            New broadcast
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {}}
        background={
          //@ts-ignore
          TouchableNativeFeedback.Ripple("#FFFFFF", false)
        }
      >
        <View>
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 15
            }}
          >
            Starred messages
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {}}
        background={
          //@ts-ignore
          TouchableNativeFeedback.Ripple("#FFFFFF", false)
        }
      >
        <View>
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 15
            }}
          >
            Settings
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default HomeMenu;

const styles = StyleSheet.create({
  prt: {
    backgroundColor: "#14191d",
    position: "absolute",
    width: 170,
    right: "-30%",
    zIndex: 10,
    elevation: Platform.OS === "android" ? 50 : 0
  }
});
