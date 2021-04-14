import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ScrollView
} from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";
import inspect from "../inspect";
import Contact from "../components/Contact";
import { users } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import HorizontalScrollContacts from "../components/HorizontalScrollContacts";
import { NavigationEvents } from "react-navigation";
import { ResetContacts } from "./NewGroupInfoScreen";

export interface SetContacts {
  type: "setContacts";
  payload: {
    name: string;
    avatar: string;
    id: number;
  };
}

const NewGroupScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const Contacts = useSelector((state: Redux) => state.chat.Contacts);
  const dispatch = useDispatch();
  return (
    <>
      <HorizontalScrollContacts Contacts={Contacts} />
      <NavigationEvents
        onWillFocus={() => dispatch<ResetContacts>({ type: "resetContacts" })}
      />
      <View style={styles.continue}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", true)}
          onPress={() => Contacts.length && navigation.navigate("NewGroupInfo")}
        >
          <View style={styles.foward}>
            <MaterialIcons name="arrow-forward" size={25} color="#fff" />
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

NewGroupScreen.navigationOptions = {
  headerTitle: () => (
    <View>
      <Text h4Style={{ color: "#fff" }} h4>
        New group
      </Text>
      <Text style={{ color: "#fff" }}>Add participants</Text>
    </View>
  ),
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
{
  /* <HeaderButtons HeaderButtonComponent={props => <HeaderButton {...props} />}>
<Item
  title="search"
  iconName="search"
  IconComponent={MaterialIcons}
  iconSize={25}
/>
</HeaderButtons> */
}

export default NewGroupScreen;

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
