import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
  Dimensions
} from "react-native";
import { NavigationStackScreenComponent, useHeaderHeight } from "react-navigation-stack";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { SetSearchModal } from "../../screens/HomeScreen";
import SearchModal from "../Modals/SearchModal";

interface Params {
  contacts: number;
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  setInp: React.Dispatch<React.SetStateAction<string>>;
  inp: string;
  headerHeight: number;
}

const ContactScreenHeader: NavigationStackScreenComponent<Params>["navigationOptions"] = ({
  navigation
}) => {
  const contacts = navigation.getParam("contacts");
  const searchHeight = navigation.getParam("searchHeight");
  const searchWidth = navigation.getParam("searchWidth");
  const dispatch = navigation.getParam("dispatch");
  const inp = navigation.getParam("inp");
  const setInp = navigation.getParam("setInp");
  const headerHeight = navigation.getParam("headerHeight");

  return {
    headerTitle: () => (
      <View>
        <Text style={{ fontSize: 20, color: "#fff" }}>Select Contact</Text>
        <Text style={{ color: "#fff" }}>
          {contacts === 1 ? <>{contacts} contact</> : <> {contacts} contacts </>}
        </Text>
      </View>
    ),
    headerRight: () => (
      <View style={styles.headerRight}>
        <SearchModal
          width={searchWidth}
          height={searchHeight}
          inp={inp}
          setInp={setInp}
          hideFilter
        />
        <View style={styles.ellipsis}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {
              dispatch<SetSearchModal>({ type: "setSearchModal", payload: true });
              Animated.parallel([
                Animated.timing(searchHeight, {
                  toValue: headerHeight,
                  useNativeDriver: false,
                  duration: 300
                }),
                Animated.timing(searchWidth, {
                  toValue: Dimensions.get("screen").width,
                  useNativeDriver: false,
                  duration: 300
                })
              ]).start();
            }}
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
              <Ionicons name="ellipsis-vertical-sharp" size={20} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  };
};

export default ContactScreenHeader;

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
  }
});
