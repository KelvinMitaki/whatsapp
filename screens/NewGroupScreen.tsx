import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ScrollView,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenComponent, useHeaderHeight } from "react-navigation-stack";
import { MaterialIcons } from "@expo/vector-icons";
import inspect from "../inspect";
import Contact from "../components/Contacts/Contact";
import { users } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import HorizontalScrollContacts from "../components/Contacts/HorizontalScrollContacts";
import { NavigationEvents } from "react-navigation";
import { ResetContacts } from "./NewGroupInfoScreen";
import { User } from "../interfaces/ChatInterface";
import { Dispatch } from "redux";
import { SetSearchModal } from "./HomeScreen";
import SearchModal from "../components/Modals/SearchModal";

export interface SetContacts {
  type: "setContacts";
  payload: User;
}

interface Params {
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  setInp: React.Dispatch<React.SetStateAction<string>>;
  inp: string;
  headerHeight: number;
}
const NewGroupScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const Contacts = useSelector((state: Redux) => state.chat.Contacts);
  const [inp, setInp] = useState<string>("");
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (Contacts.length) {
      Animated.spring(position, {
        toValue: { x: 0, y: -20 },
        useNativeDriver: false,
        friction: 4
      }).start();
    } else {
      Animated.spring(position, {
        toValue: { x: 0, y: 70 },
        useNativeDriver: false,
        friction: 4
      }).start();
    }
  }, [Contacts]);
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
      <ScrollView>
        <Contact
          setContacts={usr => {
            dispatch<SetContacts>({ type: "setContacts", payload: usr });
          }}
          Contacts={Contacts}
          inp={inp}
        />
      </ScrollView>
      <Animated.View style={position.getLayout()}>
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
      </Animated.View>
    </>
  );
};

NewGroupScreen.navigationOptions = ({ navigation }) => {
  const searchHeight = navigation.getParam("searchHeight");
  const searchWidth = navigation.getParam("searchWidth");
  const dispatch = navigation.getParam("dispatch");
  const inp = navigation.getParam("inp");
  const setInp = navigation.getParam("setInp");
  const headerHeight = navigation.getParam("headerHeight");
  return {
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
