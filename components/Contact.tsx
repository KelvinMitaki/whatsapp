import React from "react";
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { users } from "../data/data";
import { Badge } from "react-native-elements";
import { Card } from "react-native-elements";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import inspect from "../inspect";

interface Props {
  setContacts?: (usr: { name: string; avatar: string; id: number }) => void;
  Contacts?: {
    name: string;
    avatar: string;
    id: number;
  }[];
}

const Contact: React.FC<NavigationInjectedProps & Props> = ({
  navigation,
  setContacts,
  Contacts
}) => {
  return (
    <>
      {users.map((usr, i) => (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
          onPress={() => {
            if (!setContacts) {
              navigation.navigate("Chat");
            } else {
              setContacts({ ...usr, id: i });
            }
          }}
          key={i}
        >
          <View style={styles.contact}>
            <View>
              <View style={styles.person}>
                <Ionicons name="person" size={35} color="rgba(241, 241, 242, 0.8)" />
              </View>
              {Contacts && Contacts.find(ct => ct.id === i) && (
                <View style={styles.selectedContact}>
                  <Octicons name="check" size={15} />
                </View>
              )}
            </View>
            <View style={styles.contactTxt}>
              <View style={{ justifyContent: "center", height: "100%" }}>
                <Text style={{ fontSize: 22, color: "#fff" }} numberOfLines={1}>
                  {usr.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: "rgba(255,255,255,.6)"
                  }}
                >
                  Hey there! I'm using WhatsApp
                </Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </>
  );
};

export default withNavigation(Contact);

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10
  },
  contactTxt: {
    paddingLeft: 10,
    width: "87%",
    height: "100%",
    borderBottomColor: "rgba(255,255,255,.3)",
    borderBottomWidth: 0.5
  },
  person: {
    height: 45,
    width: 45,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  selectedContact: {
    position: "absolute",
    right: "-10%",
    bottom: "-5%",
    backgroundColor: "#00af9c",
    borderRadius: 500,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#111",
    borderWidth: 1.5
  }
});
