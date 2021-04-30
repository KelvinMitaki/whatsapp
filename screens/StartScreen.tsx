import { useQuery } from "@apollo/client";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { FETCH_USERS } from "../graphql/queries";

const StartScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { data } = useQuery(FETCH_USERS, {
    onError(err) {
      console.log(err);
    },
    onCompleted(data) {
      console.log(data);
    }
  });

  return (
    <View>
      <Text style={{ color: "#fff", marginTop: "20%", fontSize: 30, alignSelf: "center" }}>
        Welcome to ChatApp
      </Text>
      <Image
        source={require("../assets/hero.png")}
        style={{ width: "70%", alignSelf: "center" }}
        resizeMode="contain"
      />
      <Button
        title="AGREE AND CONTINUE"
        containerStyle={{ alignSelf: "center", width: "70%" }}
        buttonStyle={{ backgroundColor: "#00af9c" }}
        titleStyle={{ color: "#191f23" }}
        onPress={() => navigation.replace("PhoneNumber")}
      />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
