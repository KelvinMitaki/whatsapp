import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { users } from "../data";
import { Badge } from "react-native-elements";
import { Card } from "react-native-elements";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import inspect from "../inspect";

const Contact: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  return (
    <>
      {users.map((usr, i) => (
        <TouchableNativeFeedback
          //@ts-ignore
          background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
          onPress={() => navigation.navigate("Chat")}
          key={i}
        >
          <View style={styles.contact}>
            {/* <Avatar
                  rounded
                  source={require("../assets/blank.png")}
                  size={55}
                /> */}
            <View style={styles.person}>
              <Ionicons
                name="person"
                size={35}
                color="rgba(241, 241, 242, 0.8)"
              />
            </View>
            <View style={styles.contactTxt}>
              <View style={{ justifyContent: "center", height: "100%" }}>
                <Text style={{ fontSize: 22, color: "#fff" }}>{usr.name}</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: "rgba(255,255,255,.6)"
                  }}
                >
                  hello Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Ea cumque iure a facilis corporis expedita assumenda
                  fuga quisquam aliquid! Eos dignissimos cum maxime, quasi
                  ducimus natus reiciendis. Alias, recusandae dolorem.
                </Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </>
  );
};

export default withNavigation(Contact);

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10
  },
  contactTxt: {
    paddingLeft: 10,
    width: "87%",
    height: "100%",
    borderBottomColor: "rgba(255,255,255,.3)",
    borderBottomWidth: 0.5
  },
  person: {
    height: 45,
    width: 45,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  }
});
