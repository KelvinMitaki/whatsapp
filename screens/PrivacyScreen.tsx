import React, { useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Overlay } from "react-native-elements";
import RadioButton from "../components/RadioButton";

const PrivacyScreen = () => {
  const [modal, setModal] = useState<"lastSeen" | "profilePhoto" | "about" | null>("profilePhoto");

  const modalText = (): string => {
    if (modal === "about") return "About";
    if (modal === "lastSeen") return "Last Seen";
    if (modal === "profilePhoto") return "Profile Photo";
    return "";
  };
  return (
    <View>
      <Overlay
        isVisible
        // onBackdropPress={() => setModal(null)}
        overlayStyle={{ backgroundColor: "#1b252c", minHeight: "25%", width: "85%" }}
      >
        <View>
          <Text style={{ color: "#fff", paddingVertical: 10, fontSize: 17 }}>{modalText()}</Text>
          <View>
            {/* <Text style={{ color: "#fff" }}>Everyone</Text>
            <Text style={{ color: "#fff" }}>My Contacts</Text>
            <Text style={{ color: "#fff" }}>Nobody</Text> */}
            <RadioButton
              entries={[
                { label: "Everyone", determinant: "everyone" },
                { label: "My Contacts", determinant: "myContacts" },
                { label: "Nobody", determinant: "nobody" }
              ]}
            />
          </View>
        </View>
      </Overlay>
      <View style={styles.privacyItem}>
        <Text style={styles.PrivacyTitle}>Who can see my personal info</Text>
        <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>
          If you don't share your Last Seen, you won't be able to see other people's Last Seen
        </Text>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => setModal("lastSeen")}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>Last Seen</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Everyone</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => setModal("profilePhoto")}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>Profile Photo</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Everyone</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => setModal("about")}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>About</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Everyone</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>Status</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>My Contacts</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>Blocked Contacts</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>None</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  PrivacyTitle: {
    color: "#00af9c",
    fontWeight: "bold",
    marginBottom: 5
  },
  privacyItem: {
    padding: 20
  }
});
