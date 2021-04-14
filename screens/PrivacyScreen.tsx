import React, { useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Overlay } from "react-native-elements";

const PrivacyScreen = () => {
  const [modal, setModal] = useState<"lastSeen" | "profilePhoto" | "about" | null>(null);
  return (
    <View>
      <Overlay isVisible={!!modal} onBackdropPress={() => setModal(null)}>
        <Text>Hello from Overlay</Text>
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
