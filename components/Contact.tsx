import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { users } from "../data";
import { Badge } from "react-native-elements";
import { Card } from "react-native-elements";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import inspect from "../inspect";

interface Props {
  setGrpContacts?: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        avatar: string;
        id: number;
      }[]
    >
  >;
}

const Contact: React.FC<NavigationInjectedProps & Props> = ({
  navigation,
  setGrpContacts
}) => {
  return (
    <>
      {users.map((usr, i) => (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
          onPress={() => {
            if (!setGrpContacts) {
              navigation.navigate("Chat");
            } else {
              setGrpContacts(contacts => {
                const userExist = contacts.find(usr => usr.id === i);
                if (userExist) {
                  return contacts;
                }

                return [...contacts, { ...usr, id: i }];
              });
            }
          }}
          key={i}
        >
          <View style={styles.contact}>
            <View style={styles.person}>
              <Ionicons
                name="person"
                size={35}
                color="rgba(241, 241, 242, 0.8)"
              />
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
  }
});
