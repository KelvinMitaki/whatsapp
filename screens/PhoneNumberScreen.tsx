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
import { useDispatch, useSelector } from "react-redux";
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
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [activeInp, setActiveInp] = useState<"code" | "phoneNumber" | null>(null);
  const userCountry = useSelector((state: Redux) => state.user.userCountry);
  const [code, setCode] = useState<string>("");
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get("screen").height;

  const validatePhoneNumber = (phoneNumber: string) => {
    if (
      userCountry &&
      userCountry.code &&
      isValidPhoneNumber(phoneNumber, userCountry.code as CountryCode)
    ) {
      setShowVerification(true);
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
      <NavigationEvents
        onDidBlur={() => setPhoneNumber("")}
        onWillFocus={() => {
          setCode(userCountry ? userCountry.dial_code : "");
          Keyboard.addListener("keyboardDidShow", e => {
            setKeyboardHeight(e.endCoordinates.height);
          });
          Keyboard.addListener("keyboardDidHide", e => {
            setKeyboardHeight(0);
          });
        }}
        onWillBlur={() => {
          Keyboard.removeListener("keyboardDidHide", e => {
            setKeyboardHeight(0);
          });
          Keyboard.removeListener("keyboardDidShow", e => {
            setKeyboardHeight(e.endCoordinates.height);
          });
        }}
      />
      <View>
        <Text style={styles.meta}>Enter your phone number</Text>
        <Text style={{ color: "#fff", alignSelf: "center", textAlign: "center", marginBottom: 10 }}>
          ChatApp will send an SMS message to verify your phone number.
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Country")}>
          <View style={styles.country}>
            <Text style={{ color: "#fff", textAlign: "center", width: "95%" }}>
              {userCountry ? userCountry.name : !code ? "Choose a country" : "invalid country code"}
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
          <View style={[styles.dialCode, activeInp === "code" && { borderBottomWidth: 2 }]}>
            <Text style={{ color: "rgba(255,255,255,.4)" }}>+</Text>
            <TextInput
              style={{ borderWidth: 0, borderColor: "transparent", color: "#fff" }}
              keyboardType="number-pad"
              defaultValue={userCountry ? userCountry.dial_code : ""}
              onChangeText={t => {
                setCode(t);
                dispatch<SetCountry>({ type: "setCountry", payload: t });
              }}
              value={code}
              maxLength={3}
              onFocus={() => setActiveInp("code")}
              onBlur={() => setActiveInp(null)}
            />
          </View>
          <View style={[styles.phone, activeInp === "phoneNumber" && { borderBottomWidth: 2 }]}>
            <TextInput
              style={{ borderWidth: 0, borderColor: "transparent", color: "#fff" }}
              keyboardType="number-pad"
              placeholder="phone number"
              placeholderTextColor="rgba(255,255,255,.4)"
              autoFocus
              onChangeText={setPhoneNumber}
              value={phoneNumber}
              onFocus={() => setActiveInp("phoneNumber")}
              onBlur={() => setActiveInp(null)}
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
        <Text
          style={{
            color: "#00af9c",
            textAlign: "right",
            paddingVertical: 5,
            paddingHorizontal: 20
          }}
          onPress={() => setShowModal(false)}
        >
          OK
        </Text>
      </Overlay>
      <Overlay
        isVisible
        onBackdropPress={() => setShowVerification(false)}
        overlayStyle={styles.modal}
        animationType="fade"
      >
        <Text style={{ color: "#fff" }}>We will be verifying the phone number:</Text>
        <Text style={{ color: "#fff", fontWeight: "bold", marginVertical: 20 }}>
          +{userCountry?.dial_code} {phoneNumber}
        </Text>
        <Text style={{ color: "#fff" }}>Is this OK, or would you like to edit the number?</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 15
          }}
        >
          <Text
            style={{ color: "#00af9c", paddingVertical: 5, paddingHorizontal: 20 }}
            onPress={() => setShowVerification(false)}
          >
            EDIT
          </Text>
          <Text
            style={{ color: "#00af9c", paddingVertical: 5, paddingHorizontal: 20 }}
            onPress={() => {
              setShowVerification(false);
              navigation.replace("Verification", { code, phoneNumber });
            }}
          >
            OK
          </Text>
        </View>
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
    borderBottomWidth: 1,
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
    minHeight: 110,
    width: "75%",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 20
  }
});
