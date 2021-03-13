import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { Card, Avatar } from "react-native-elements";
import {
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native-gesture-handler";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data";
import inspect from "../inspect";

const HomeScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  return (
    <View style={styles.prt}>
      <FlatList
        data={users}
        keyExtractor={(_, i) => i.toLocaleString()}
        renderItem={i => (
          <TouchableNativeFeedback
            //@ts-ignore
            background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
            onPress={() => navigation.navigate("Chat")}
          >
            <View style={styles.contact}>
              <Avatar
                rounded
                source={require("../assets/blank.png")}
                size={55}
              />
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
                    {i.item.name}
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
                  <Badge
                    value="99"
                    badgeStyle={{ backgroundColor: "#00af9c" }}
                  />
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
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {},
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
  }
});
