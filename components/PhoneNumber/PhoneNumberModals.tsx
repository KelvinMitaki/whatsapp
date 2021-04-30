import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { NavigationParams, NavigationRoute } from "react-navigation";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showVerification: boolean;
  setShowVerification: React.Dispatch<React.SetStateAction<boolean>>;
  phoneNumber: string;
  code: string;
  navigation: StackNavigationProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

const PhoneNumberModals: React.FC<Props> = props => {
  const userCountry = useSelector((state: Redux) => state.user.userCountry);
  const {
    navigation,
    setShowModal,
    setShowVerification,
    showModal,
    showVerification,
    phoneNumber,
    code
  } = props;
  return (
    <>
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
        isVisible={showVerification}
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
    </>
  );
};

export default PhoneNumberModals;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#20272b",
    minHeight: 110,
    width: "75%",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 20
  }
});
