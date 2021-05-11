import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent, useHeaderHeight } from "react-navigation-stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import HorizontalScrollContacts from "../components/Contacts/HorizontalScrollContacts";
import Contact from "../components/Contacts/Contact";
import { SetContacts } from "./NewGroupScreen";
import { NavigationEvents } from "react-navigation";
import { ResetContacts } from "./NewGroupInfoScreen";
import { messages } from "../data/messages";
import { Dispatch } from "redux";
import { SetSearchModal } from "./HomeScreen";
import SearchModal from "../components/Modals/SearchModal";

export interface SetMessage {
  type: "setMessage";
  payload: typeof messages[0];
}

interface Params {
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  setInp: React.Dispatch<React.SetStateAction<string>>;
  inp: string;
  headerHeight: number;
}

const BroadcastScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [inp, setInp] = useState<string>("");
  const dispatch = useDispatch();
  const Contacts = useSelector((state: Redux) => state.chat.Contacts);
  const searchHeight = useRef(new Animated.Value(20)).current;
  const searchWidth = useRef(new Animated.Value(20)).current;
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    navigation.setParams({ searchHeight, searchWidth, dispatch, setInp, headerHeight });
  }, [searchHeight, searchWidth, dispatch, setInp, headerHeight]);
  useEffect(() => {
    navigation.setParams({ inp });
  }, [inp]);
  return (
    <>
      <NavigationEvents
        onWillFocus={() => {
          dispatch<ResetContacts>({ type: "resetContacts" });
          dispatch<SetSearchModal>({ type: "setSearchModal", payload: false });
        }}
      />
      {searchModal && <View style={{ height: headerHeight / 3 }}></View>}
      <HorizontalScrollContacts Contacts={Contacts} />
      <View style={styles.continue}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", true)}
          onPress={() => {
            dispatch<SetMessage>({
              type: "setMessage",
              payload: {
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
                message: `You created a broadcast list with ${Contacts.length} receipients`,
                name: `${Contacts.map(c => c.name)}`,
                time: new Date().toLocaleDateString(),
                type: "broadcast"
              }
            });
            navigation.navigate("Home");
          }}
        >
          <View style={styles.foward}>
            <Ionicons name="checkmark" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <ScrollView>
        <Contact
          setContacts={usr => dispatch<SetContacts>({ type: "setContacts", payload: usr })}
          Contacts={Contacts}
          inp={inp}
        />
      </ScrollView>
    </>
  );
};

BroadcastScreen.navigationOptions = ({ navigation }) => {
  const searchHeight = navigation.getParam("searchHeight");
  const searchWidth = navigation.getParam("searchWidth");
  const dispatch = navigation.getParam("dispatch");
  const inp = navigation.getParam("inp");
  const setInp = navigation.getParam("setInp");
  const headerHeight = navigation.getParam("headerHeight");
  return {
    headerTitle: "New broadcast",
    headerRight: () => (
      <View style={{ width: "125%", alignItems: "center" }}>
        <SearchModal
          inp={inp}
          setInp={setInp}
          height={searchHeight}
          width={searchWidth}
          hideFilter
        />
        <View style={styles.searchBorder}>
          <TouchableNativeFeedback
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
