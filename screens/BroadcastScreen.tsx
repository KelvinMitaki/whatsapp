import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import HorizontalScrollContacts from "../components/HorizontalScrollContacts";
import Contact from "../components/Contact";
import { SetContacts } from "./NewGroupScreen";
import { NavigationEvents } from "react-navigation";
import { ResetContacts } from "./NewGroupInfoScreen";
import { messages } from "../data/messages";

export interface SetMessage {
  type: "setMessage";
  payload: typeof messages[0];
}

const BroadcastScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const { Contacts } = useSelector((state: Redux) => state.chat);
  return (
    <>
      <NavigationEvents
        onWillFocus={() => dispatch<ResetContacts>({ type: "resetContacts" })}
      />
      <HorizontalScrollContacts Contacts={Contacts} />
      <View style={styles.continue}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", true)}
          onPress={() => {
            dispatch<SetMessage>({
              type: "setMessage",
              payload: {
                avatar:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
                message: `You created a broadcast list with ${Contacts.length} receipients`,
                name: `${Contacts.map(c => c.name)}`,
                time: new Date().toLocaleDateString(),
                type: "broadcast"
              }
            });
            navigation.navigate("Home");
          }}
        >
          <View style={styles.foward}>
            <Ionicons name="checkmark" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <ScrollView>
        <Contact
          setContacts={usr =>
            dispatch<SetContacts>({ type: "setContacts", payload: usr })
          }
          Contacts={Contacts}
        />
      </ScrollView>
    </>
  );
};

BroadcastScreen.navigationOptions = {
  headerTitle: "New broadcast",
  headerRight: () => (
    <View style={{ width: "125%", alignItems: "center" }}>
      <View style={styles.searchBorder}>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple("#fff", true)}
        >
          <View>
            <MaterialIcons name="search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
};

export default BroadcastScreen;

const styles = StyleSheet.create({
  searchBorder: {
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "transparent",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  continue: {
    position: "absolute",
    right: "2%",
    bottom: "2%",
    backgroundColor: "#00af9c",
    borderRadius: 500,
    height: 50,
    width: 50,
    zIndex: 10
  },
  foward: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
