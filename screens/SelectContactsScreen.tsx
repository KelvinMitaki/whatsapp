import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Text } from "react-native-elements";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { NavigationStackScreenComponent, useHeaderHeight } from "react-navigation-stack";
import { users } from "../data/data";
import SelectedContact, { Data } from "../components/SelectContacts/SelectedContact";
import SearchModal from "../components/Modals/SearchModal";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { SetSearchModal } from "./HomeScreen";

interface Params {
  slctn: "myContactsExc" | "onlyShareWith";
  selected: number;
  selectAll: boolean;
  setChecked: React.Dispatch<React.SetStateAction<Data[]>>;
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  headerHeight: number;
}

const SelectContactsScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [checked, setChecked] = useState<Data[]>([]);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const searchHeight = useRef(new Animated.Value(20)).current;
  const searchWidth = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    navigation.setParams({ selected: checked.length, setChecked });
    if (!checked.length) {
      Animated.spring(position, {
        toValue: { x: 0, y: 60 },
        useNativeDriver: false,
        friction: 4
      }).start();
    } else {
      Animated.spring(position, {
        toValue: { x: 0, y: -20 },
        useNativeDriver: false,
        friction: 4
      }).start();
    }
  }, [checked]);

  useEffect(() => {
    navigation.setParams({ dispatch, searchHeight, searchWidth, headerHeight });
  }, [showSearchModal, setShowSearchModal, searchHeight, searchWidth, headerHeight]);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(_, i) => i.toLocaleString()}
        initialNumToRender={15}
        renderItem={({ item, index }) => (
          <SelectedContact
            item={item}
            index={index}
            setChecked={setChecked}
            checked={checked.some(c => c.id === index)}
          />
        )}
      />

      <Animated.View style={position.getLayout()}>
        <View style={styles.checkmarkPrt}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {
              ToastAndroid.show("Settings updated", ToastAndroid.LONG);
              navigation.goBack();
            }}
          >
            <View style={styles.checkMark}>
              <Ionicons name="checkmark-sharp" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
    </View>
  );
};

SelectContactsScreen.navigationOptions = ({ navigation }) => {
  const slctn = navigation.getParam("slctn");
  const selected = navigation.getParam("selected");
  const selectAll = navigation.getParam("selectAll");
  const setChecked = navigation.getParam("setChecked");
  const searchHeight = navigation.getParam("searchHeight");
  const searchWidth = navigation.getParam("searchWidth");
  const headerHeight = navigation.getParam("headerHeight");
  const dispatch = navigation.getParam("dispatch");

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
      <>
        <SearchModal width={searchWidth} height={searchHeight} hideFilter />
        <View style={styles.headerIconsPrt}>
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
      </>
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
  checkmarkPrt: {
    position: "absolute",
    right: "2%",
    bottom: "2%",
    backgroundColor: "#00af9c",
    borderRadius: 500,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10
  },
  checkMark: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
