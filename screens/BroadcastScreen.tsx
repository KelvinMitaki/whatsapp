import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import HorizontalScrollContacts from "../components/HorizontalScrollContacts";
import Contact from "../components/Contact";
import { SetContacts } from "./NewGroupScreen";

const BroadcastScreen: NavigationStackScreenComponent = () => {
  const dispatch = useDispatch();
  const { Contacts } = useSelector((state: Redux) => state.chat);
  return (
    <View>
      <HorizontalScrollContacts Contacts={Contacts} />
      <ScrollView>
        <Contact
          setContacts={usr =>
            dispatch<SetContacts>({ type: "setContacts", payload: usr })
          }
          Contacts={Contacts}
        />
      </ScrollView>
    </View>
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
  }
});
