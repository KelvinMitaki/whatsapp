import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import inspect from "../inspect";
import GroupChat from "../components/Group/GroupChat";
import { useQuery } from "@apollo/client";
import { FETCH_GROUPS } from "../graphql/queries";

const GroupScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const { data } = useQuery(FETCH_GROUPS, { fetchPolicy: "cache-only" });
  data && console.log(data.fetchGroups);
  console.log(data);
  return (
    <View style={styles.prt}>
      <GroupChat />
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.plus}>
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

GroupScreen.navigationOptions = {
  title: "GROUPS"
};

export default GroupScreen;

const styles = StyleSheet.create({
  prt: {},
  plus: {
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
