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
import inspect from "../inspect";
import Contact from "../components/Contacts/Contact";
import { FETCH_USERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import SearchModal from "../components/Modals/SearchModal";
import { SetSearchModal } from "./HomeScreen";
import { NavigationEvents } from "react-navigation";

interface Params {
  contacts: number;
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  setInp: React.Dispatch<React.SetStateAction<string>>;
  inp: string;
  headerHeight: number;
}

const ContactScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const { data } = useQuery(FETCH_USERS, { fetchPolicy: "cache-and-network" });
  const [inp, setInp] = useState<string>("");
  const searchHeight = useRef(new Animated.Value(20)).current;
  const searchWidth = useRef(new Animated.Value(20)).current;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    navigation.setParams({ searchHeight, searchWidth, dispatch, setInp, headerHeight });
  }, [searchHeight, searchWidth, dispatch, setInp, headerHeight]);
  useEffect(() => {
    navigation.setParams({ inp });
  }, [inp]);
  useEffect(() => {
    navigation.setParams({ contacts: data.fetchUsers.length });
  }, [data.fetchUsers]);
  return (
    <ScrollView>
      <NavigationEvents
        onWillFocus={() => dispatch<SetSearchModal>({ type: "setSearchModal", payload: false })}
      />
      <View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", false)}
          onPress={() => navigation.navigate("NewGroup")}
        >
          <View style={styles.meta}>
            <View style={styles.person}>
              <MaterialCommunityIcons name="account-group" size={25} color="#fff" />
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

ContactScreen.navigationOptions = ({ navigation }) => {
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
