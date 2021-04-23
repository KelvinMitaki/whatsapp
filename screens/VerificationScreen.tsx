import React from "react";
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

interface Params {
  code: string;
  phoneNumber: string;
}

const VerificationScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const phoneNumber = navigation.getParam("phoneNumber");
  const code = navigation.getParam("code");
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ marginTop: "20%" }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 20,
            textAlign: "center"
          }}
        >
          Verify +{code} {phoneNumber}
        </Text>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Waiting to automatically detect an SMS sent to
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
          +{code} {phoneNumber}
        </Text>
        <TextInput style={styles.input} keyboardType="number-pad" maxLength={6} autoFocus />
        <Text style={{ color: "rgba(255,255,255,.4)", marginVertical: 10, textAlign: "center" }}>
          Enter 6-digit code
        </Text>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", false)}
          onPress={() => {}}
        >
          <View style={styles.resend}>
            <MaterialCommunityIcons name="message-processing" size={24} color="#00af9c" />
            <Text style={{ color: "#00af9c", marginLeft: 15 }}>Resend SMS</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Button
        title="NEXT"
        containerStyle={{ alignSelf: "center", marginBottom: 20 }}
        buttonStyle={{ backgroundColor: "#00af9c", paddingVertical: 10, paddingHorizontal: 20 }}
        titleStyle={{ color: "#191f23" }}
        onPress={() => navigation.replace("Name")}
      />
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#00af9c",
    width: "50%",
    alignSelf: "center",
    fontSize: 18,
    height: 50,
    color: "#fff",
    letterSpacing: Dimensions.get("screen").width / 20
  },
  resend: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    width: "90%",
    alignSelf: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,.4)",
    paddingHorizontal: 15
  }
});
