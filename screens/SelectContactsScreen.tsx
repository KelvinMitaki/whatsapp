import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { users } from "../data/data";
import SelectedContact, { Data } from "../components/SelectedContact";

const SelectContactsScreen: NavigationStackScreenComponent = () => {
  const [checked, setChecked] = useState<Data[]>([]);
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

SelectContactsScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <View>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Hide status from...</Text>
        <Text style={{ color: "#fff" }}>No contacts excluded</Text>
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
