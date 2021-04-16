import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { users } from "../data/data";
import SelectedContact, { Data } from "../components/SelectedContact";

interface Params {
  slctn: "myContactsExc" | "onlyShareWith";
  selected: number;
}

const SelectContactsScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [checked, setChecked] = useState<Data[]>([]);
  useEffect(() => {
    navigation.setParams({ selected: checked.length });
  }, [checked]);
  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(_, i) => i.toLocaleString()}
        renderItem={({ item, index }) => (
          <SelectedContact item={item} index={index} setChecked={setChecked} checked={checked} />
        )}
      />
    </View>
  );
};

SelectContactsScreen.navigationOptions = ({ navigation }) => {
  const slctn = navigation.getParam("slctn");
  const selected = navigation.getParam("selected");
  return {
    headerTitle: () => (
      <View>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
          {slctn === "myContactsExc" ? "Hide status from..." : "Share status with..."}
        </Text>
        <Text style={{ color: "#fff" }}>
          {!selected
            ? slctn === "myContactsExc"
              ? "No contacts excluded"
              : "No contacts selected"
            : `${selected.toLocaleString()} ${selected === 1 ? "contact" : "contacts"} ${
                slctn === "myContactsExc" ? "excluded" : "selected"
              }`}
        </Text>
      </View>
    ),
    headerRight: () => (
      <View style={styles.headerIconsPrt}>
        <View style={styles.ellipsis}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View>
              <MaterialIcons name="search" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.ellipsis}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View>
              <MaterialIcons name="playlist-add-check" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  };
};

export default SelectContactsScreen;

const styles = StyleSheet.create({
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "transparent"
  },
  headerIconsPrt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 90,
    marginHorizontal: 10
  }
});
