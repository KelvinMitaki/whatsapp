import React, { useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Overlay } from "react-native-elements";
import RadioButton from "../components/RadioButton";

const PrivacyScreen = () => {
  const [modal, setModal] = useState<"lastSeen" | "profilePhoto" | "about" | null>(null);
  const [lastSeen, setLastSeen] = useState<"everyone" | "myContacts" | "nobody">("everyone");
  const [profilePhoto, setProfilePhoto] = useState<"everyone" | "myContacts" | "nobody">(
    "everyone"
  );
  const [about, setAbout] = useState<"everyone" | "myContacts" | "nobody">("everyone");

  const modalText = (): string => {
    if (modal === "about") return "About";
    if (modal === "lastSeen") return "Last Seen";
    if (modal === "profilePhoto") return "Profile Photo";
    return "";
  };
  const setVisibility = (visibility: typeof modal): string => {
    if (visibility === "lastSeen") {
      if (lastSeen === "everyone") return "Everyone";
      if (lastSeen === "myContacts") return "My Contacts";
      if (lastSeen === "nobody") return "Nobody";
    }
    if (visibility === "profilePhoto") {
      if (profilePhoto === "everyone") return "Everyone";
      if (profilePhoto === "myContacts") return "My Contacts";
      if (profilePhoto === "nobody") return "Nobody";
    }
    if (visibility === "about") {
      if (about === "everyone") return "Everyone";
      if (about === "myContacts") return "My Contacts";
      if (about === "nobody") return "Nobody";
    }
    return "";
  };
  const defaultDeterminant = (): string => {
    if (modal === "about") return about;
    if (modal === "lastSeen") return lastSeen;
    if (modal === "profilePhoto") return profilePhoto;
    return "";
  };
  return (
    <View>
      <Overlay
        isVisible={!!modal}
        onBackdropPress={() => setModal(null)}
        overlayStyle={{ backgroundColor: "#1b252c", minHeight: "25%", width: "85%" }}
      >
        <View>
          <Text style={{ color: "#fff", paddingVertical: 10, fontSize: 17 }}>{modalText()}</Text>
          <View>
            <RadioButton
              entries={[
                { label: "Everyone", determinant: "everyone" },
                { label: "My Contacts", determinant: "myContacts" },
                { label: "Nobody", determinant: "nobody" }
              ]}
              defaultDeterminant={defaultDeterminant()}
              onSelect={selected => {
                if (modal === "lastSeen") {
                  setLastSeen(selected as typeof lastSeen);
                }
                if (modal === "about") {
                  setAbout(selected as typeof about);
                }
                if (modal === "profilePhoto") {
                  setProfilePhoto(selected as typeof profilePhoto);
                }
                setModal(null);
              }}
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
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>{setVisibility("lastSeen")}</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => setModal("profilePhoto")}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>Profile Photo</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>{setVisibility("profilePhoto")}</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => setModal("about")}
      >
        <View style={styles.privacyItem}>
          <Text style={{ color: "#fff" }}>About</Text>
          <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>{setVisibility("about")}</Text>
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
