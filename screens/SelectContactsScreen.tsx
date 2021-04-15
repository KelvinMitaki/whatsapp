import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const SelectContactsScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <View style={styles.contact}>
        <View style={styles.person}>
          <Ionicons name="person" size={30} color="rgba(241, 241, 242, 0.8)" />
        </View>
        <View style={styles.info}>
          <Text numberOfLines={1} style={{ color: "#fff", width: "88%" }}>
            SelectContactsScreen SelectContactsScreen
          </Text>
          <View style={styles.check}>
            <MaterialIcons name="check" size={18} />
          </View>
        </View>
      </View>
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
  },
  contact: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50
  },
  person: {
    height: 40,
    width: 40,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  info: {
    borderBottomColor: "rgba(241, 241, 242, 0.7)",
    borderBottomWidth: 0.5,
    height: 50,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  check: {
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
