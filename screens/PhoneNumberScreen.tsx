import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import inspect from "../inspect";

export interface SetCountry {
  type: "setCountry";
  payload: string;
}

const PhoneNumberScreen = () => {
  return (
    <View>
      <View style={{ marginTop: "20%" }}>
        <Text
          style={{
            color: "#fff",
            alignSelf: "center",
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 30
          }}
        >
          Enter your phone number
        </Text>
        <Text style={{ color: "#fff", alignSelf: "center", textAlign: "center", marginBottom: 10 }}>
          ChatApp will send an SMS message to verify your phone number.
        </Text>
        <TouchableWithoutFeedback>
          <View></View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({});
