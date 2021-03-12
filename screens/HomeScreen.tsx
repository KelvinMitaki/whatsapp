import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { Card, Avatar } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data";
import inspect from "../inspect";

const HomeScreen: NavigationMaterialTabScreenComponent = () => {
  return (
    <View style={styles.prt}>
      <FlatList
        data={users}
        keyExtractor={(_, i) => i.toLocaleString()}
        renderItem={i => (
          <>
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
                <Text style={{ marginTop: 5, color: "rgba(255,255,255,.6)" }}>
                  hello
                </Text>
                <Card.Divider
                  style={{
                    marginTop: 10,
                    backgroundColor: "rgba(255,255,255,.3)"
                  }}
                />
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {
    padding: 10
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    height: 70
  },
  contactTxt: {
    paddingLeft: 10,
    width: "85%",
    justifyContent: "space-between",
    height: "100%"
  }
});
