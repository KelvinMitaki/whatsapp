import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import inspect from "../inspect";
import Contact from "../components/Contact";

const ContactScreen: NavigationStackScreenComponent = () => {
  return (
    <ScrollView>
      <View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", false)}
          onPress={() => {}}
        >
          <View style={styles.meta}>
            <View style={styles.person}>
              <MaterialCommunityIcons
                name="account-group"
                size={25}
                color="#fff"
              />
            </View>
            <View style={styles.textPrt}>
              <View>
                <Text style={styles.metaText}>New Group</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", false)}
          onPress={() => {}}
        >
          <View style={styles.meta}>
            <View style={styles.person}>
              <Ionicons name="person-add" size={25} color="#fff" />
            </View>
            <View style={styles.textPrt}>
              <Text style={styles.metaText}>New Contact</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
      <Contact />
    </ScrollView>
  );
};

ContactScreen.navigationOptions = {
  headerTitle: () => (
    <View>
      <Text style={{ fontSize: 20, color: "#fff" }}>Select Contact</Text>
      <Text style={{ color: "#fff" }}>200 contacts</Text>
    </View>
  ),
  headerRight: () => (
    <View style={styles.headerRight}>
      <View style={styles.ellipsis}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", false)}
          onPress={() => {}}
        >
          <View>
            <MaterialIcons name="search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.ellipsis}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", false)}
          onPress={() => {}}
        >
          <View>
            <Ionicons name="ellipsis-vertical-sharp" size={20} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
};

export default ContactScreen;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    width: "170%",
    justifyContent: "space-evenly"
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "transparent"
  },
  person: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 45,
    width: 45,
    borderRadius: 55
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    height: 70
  },
  textPrt: {
    justifyContent: "center",
    height: "100%",
    width: "85%",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,.3)"
  },
  metaText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 17
  }
});
