import React, { useState } from "react";
import { Dimensions, Keyboard, StyleSheet, View } from "react-native";
import inspect from "../inspect";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { NavigationEvents } from "react-navigation";
import PhoneNumberModals from "../components/PhoneNumber/PhoneNumberModals";
import PhoneNumberComponent from "../components/PhoneNumber/PhoneNumberComponent";

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
          Keyboard.removeListener("keyboardDidHide", e => {});
          Keyboard.removeListener("keyboardDidShow", e => {});
        }}
      />
      <PhoneNumberComponent
        phoneNumber={phoneNumber}
        activeInp={activeInp}
        code={code}
        dispatch={dispatch}
        keyboardHeight={keyboardHeight}
        navigation={navigation}
        setActiveInp={setActiveInp}
        setCode={setCode}
        setPhoneNumber={setPhoneNumber}
        userCountry={userCountry}
        validatePhoneNumber={validatePhoneNumber}
      />

      <PhoneNumberModals
        phoneNumber={phoneNumber}
        code={code}
        navigation={navigation}
        setShowModal={setShowModal}
        setShowVerification={setShowVerification}
        showModal={showModal}
        showVerification={showVerification}
      />
    </View>
  );
};

export default PhoneNumberScreen;

const styles = StyleSheet.create({});
