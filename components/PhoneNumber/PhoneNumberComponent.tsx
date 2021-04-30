import React from "react";
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationParams, NavigationRoute } from "react-navigation";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { Dispatch } from "redux";
import { MaterialIcons } from "@expo/vector-icons";

export interface SetCountry {
  type: "setCountry";
  payload: string;
}
interface Props {
  navigation: StackNavigationProp<NavigationRoute<NavigationParams>, NavigationParams>;
  userCountry: {
    name: string;
    dial_code: string;
    currency_name: string;
    currency_code: string;
    code: string;
  } | null;
  code: string;
  activeInp: "code" | "phoneNumber" | null;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  dispatch: Dispatch<any>;
  setActiveInp: React.Dispatch<React.SetStateAction<"code" | "phoneNumber" | null>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  validatePhoneNumber: (phoneNumber: string) => void;
  keyboardHeight: number;
}

const PhoneNumberComponent: React.FC<Props> = props => {
  const {
    activeInp,
    code,
    dispatch,
    navigation,
    phoneNumber,
    setActiveInp,
    setCode,
    setPhoneNumber,
    userCountry,
    validatePhoneNumber,
    keyboardHeight
  } = props;
  return (
    <>
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
    </>
  );
};

export default PhoneNumberComponent;

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
  }
});
