import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import inspect from "../inspect";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { Button } from "react-native-elements";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { Overlay } from "react-native-elements/dist/overlay/Overlay";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { NavigationEvents } from "react-navigation";

export interface SetCountry {
  type: "setCountry";
  payload: string;
}

const PhoneNumberScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const userCountry = useSelector((state: Redux) => state.user.userCountry);
  const screenHeight = Dimensions.get("screen").height;

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    Keyboard.addListener("keyboardDidHide", e => {
      setKeyboardHeight(0);
    });
    return () => {
      Keyboard.removeListener("keyboardDidHide", e => {
        setKeyboardHeight(0);
      });
      Keyboard.removeListener("keyboardDidShow", e => {
        setKeyboardHeight(e.endCoordinates.height);
      });
    };
  }, []);
  const validatePhoneNumber = (phoneNumber: string) => {
    if (isValidPhoneNumber(phoneNumber, userCountry.code as CountryCode)) {
      navigation.navigate("Home");
    } else {
      setShowModal(true);
    }
  };
  return (
    <View
      style={{
        marginTop: "20%",
        height: screenHeight - (screenHeight * 20) / 100,
        justifyContent: "space-between"
      }}
    >
      <NavigationEvents onDidBlur={() => setPhoneNumber("")} />
      <View>
        <Text style={styles.meta}>Enter your phone number</Text>
        <Text style={{ color: "#fff", alignSelf: "center", textAlign: "center", marginBottom: 10 }}>
          ChatApp will send an SMS message to verify your phone number.
        </Text>
        <TouchableWithoutFeedback>
          <View style={styles.country}>
            <Text style={{ color: "#fff", textAlign: "center", width: "95%" }}>
              {userCountry.name}
            </Text>
            <MaterialIcons
              name="arrow-drop-down"
              size={20}
              color="#00af9c"
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inputPrt}>
          <View style={styles.dialCode}>
            <Text style={{ color: "rgba(255,255,255,.4)" }}>+</Text>
            <TextInput
              style={{ borderWidth: 0, borderColor: "transparent", color: "#fff" }}
              keyboardType="number-pad"
              defaultValue={userCountry.dial_code}
            />
          </View>
          <View style={styles.phone}>
            <TextInput
              style={{ borderWidth: 0, borderColor: "transparent", color: "#fff" }}
              keyboardType="number-pad"
              placeholder="phone number"
              placeholderTextColor="rgba(255,255,255,.4)"
              autoFocus
              onChangeText={setPhoneNumber}
              value={phoneNumber}
            />
          </View>
        </View>
        <View style={{ height: 50, justifyContent: "center" }}>
          <Text
            style={{
              color: "rgba(255,255,255,.5)",
              textAlign: "center"
            }}
          >
            Carrier SMS charges may apply
          </Text>
        </View>
      </View>
      <Button
        title="NEXT"
        containerStyle={{ alignSelf: "center", marginBottom: keyboardHeight }}
        buttonStyle={{ backgroundColor: "#00af9c", paddingVertical: 10, paddingHorizontal: 20 }}
        titleStyle={{ color: "#191f23" }}
        onPress={() => validatePhoneNumber(phoneNumber)}
      />
      <Overlay
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        overlayStyle={styles.modal}
        animationType="fade"
      >
        <Text style={{ color: "#fff" }}>Please enter your phone number.</Text>
        <Text style={{ color: "#00af9c", textAlign: "right" }} onPress={() => setShowModal(false)}>
          OK
        </Text>
      </Overlay>
    </View>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({
  country: {
    borderBottomColor: "#00af9c",
    borderBottomWidth: 1,
    width: 300,
    alignSelf: "center",
    flexDirection: "row"
  },
  meta: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30
  },
  inputPrt: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: "center",
    height: 50
  },
  phone: {
    width: "70%",
    borderBottomWidth: 2,
    borderBottomColor: "#00af9c",
    padding: 5
  },
  dialCode: {
    width: "20%",
    borderBottomWidth: 1,
    borderBottomColor: "#00af9c",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  modal: {
    backgroundColor: "#20272b",
    height: 110,
    width: "70%",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 20
  }
});
