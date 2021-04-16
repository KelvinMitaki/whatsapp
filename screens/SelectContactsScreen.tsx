import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableNativeFeedback, View, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { users } from "../data/data";
import SelectedContact, { Data } from "../components/SelectedContact";

interface Params {
  slctn: "myContactsExc" | "onlyShareWith";
  selected: number;
  selectAll: boolean;
  setChecked: React.Dispatch<React.SetStateAction<Data[]>>;
}

export interface SetChecked {
  type: "setChecked";
  payload: Data;
}

const SelectContactsScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [checked, setChecked] = useState<Data[]>([]);
  useEffect(() => {
    navigation.setParams({ selected: checked.length });
    navigation.setParams({ setChecked });
  }, [checked]);

  return (
    <View>
      <ScrollView>
        {users.map((u, i) => (
          <SelectedContact item={u} key={i} index={i} setChecked={setChecked} checked={checked} />
        ))}
      </ScrollView>
    </View>
  );
};

SelectContactsScreen.navigationOptions = ({ navigation }) => {
  const slctn = navigation.getParam("slctn");
  const selected = navigation.getParam("selected");
  const selectAll = navigation.getParam("selectAll");
  const setChecked = navigation.getParam("setChecked");
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
            onPress={() => {
              navigation.setParams({ selectAll: !selectAll });
              if (!selectAll) {
                setChecked(users.map((u, i) => ({ ...u, id: i })));
              } else {
                setChecked([]);
              }
            }}
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
