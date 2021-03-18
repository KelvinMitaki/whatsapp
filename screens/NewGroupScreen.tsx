import React, { useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";
import inspect from "../inspect";
import Contact from "../components/Contact";
import { ScrollView } from "react-native-gesture-handler";
import { users } from "../data";

const NewGroupScreen: NavigationStackScreenComponent = () => {
  const [grpContacts, setGrpContacts] = useState<typeof users>([]);
  return (
    <ScrollView>
      {grpContacts.map((ct, i) => (
        <Text key={i} style={{ color: "#fff" }}>
          {ct.name}
        </Text>
      ))}
      <Contact setGrpContacts={setGrpContacts} />
    </ScrollView>
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
    <View style={{ width: "150%", alignItems: "center" }}>
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
    // ...inspect()
  }
});
