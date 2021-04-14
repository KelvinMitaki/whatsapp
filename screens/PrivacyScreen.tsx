import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

const PrivacyScreen = () => {
  return (
    <View>
      <View style={styles.privacyItem}>
        <Text style={styles.PrivacyTitle}>Who can see my personal info</Text>
        <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>
          If you don't share your Last Seen, you won't be able to see other
          people's Last Seen
        </Text>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>Last Seen</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Everyone</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>Profile Photo</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Everyone</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>My Contacts</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Everyone</Text>
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
