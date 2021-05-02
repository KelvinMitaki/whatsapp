import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import AppColors from "../../Colors/color";

const StartChat: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <View style={styles.prt}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "50%"
        }}
      >
        <Text style={{ color: AppColors.secodary, fontSize: 23 }}>Start a chat</Text>
        <AntDesign name="arrowright" size={25} color={AppColors.secodary} />
      </View>
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

export default withNavigation(StartChat);

const styles = StyleSheet.create({
  prt: {
    backgroundColor: AppColors.primary_dark,
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center"
  },
  message: {
    right: "5%",
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
