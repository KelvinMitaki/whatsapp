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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{ fontSize: 22, fontWeight: "400", color: "#fff" }}
                >
                  {usr.name}
                </Text>
                <Text style={{ right: 1, color: "rgba(255,255,255,.6)" }}>
                  Yesterday
                </Text>
              </View>
              <View style={styles.msg}>
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: 5,
                    color: "rgba(255,255,255,.6)",
                    width: "90%"
                  }}
                >
                  hello Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Ea cumque iure a facilis corporis expedita assumenda
                  fuga quisquam aliquid! Eos dignissimos cum maxime, quasi
                  ducimus natus reiciendis. Alias, recusandae dolorem.
                </Text>
                <Badge value="99" badgeStyle={{ backgroundColor: "#00af9c" }} />
              </View>
              <Card.Divider
                style={{
                  marginTop: 15,
                  backgroundColor: "rgba(255,255,255,.3)"
                }}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.message}>
          <MaterialIcons name="message" size={25} color="#fff" />
        </View>
      </TouchableNativeFeedback>
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
    width: "85%",
    justifyContent: "space-between",
    height: "100%"
  },
  msg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  person: {
    height: 50,
    width: 50,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
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
  }
});
