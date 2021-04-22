import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PhoneNumberScreen = () => {
  return (
    <View>
      <View style={{ marginTop: "20%" }}>
        <Text style={{ color: "#fff" }}>Enter your phone number</Text>
        <Text style={{ color: "#fff" }}>
          ChatApp will send an SMS message to verify your phone number.
        </Text>
      </View>
    </View>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({});
