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
import SelectedContact from "../components/SelectContacts/SelectedContact";
import SearchModal from "../components/Modals/SearchModal";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { SetSearchModal } from "./HomeScreen";
import SelectContactsHeader from "../components/SelectContacts/SelectContactsHeader";
import { User } from "../interfaces/ChatInterface";
import { useQuery } from "@apollo/client";
import { FETCH_USERS } from "../graphql/queries";

interface Params {
  slctn: "myContactsExc" | "onlyShareWith";
  selected: number;
  selectAll: boolean;
  setChecked: React.Dispatch<React.SetStateAction<User[]>>;
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  headerHeight: number;
  contacts: User[];
}

const SelectContactsScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [checked, setChecked] = useState<User[]>([]);
  const { data } = useQuery(FETCH_USERS);
  const dispatch = useDispatch();
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const searchHeight = useRef(new Animated.Value(20)).current;
  const searchWidth = useRef(new Animated.Value(20)).current;
  const headerHeight = useHeaderHeight();
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
    navigation.setParams({
      dispatch,
      searchHeight,
      searchWidth,
      headerHeight,
      contacts: data ? data.fetchUsers : []
    });
  }, [dispatch, searchHeight, searchWidth, headerHeight, data]);

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={
          data
            ? (((data.fetchUsers as User[]).map(({ profilePhoto, _id, name }) => ({
                profilePhoto,
                _id,
                name
              })) as unknown) as User[])
            : ([] as User[])
        }
        keyExtractor={u => u._id}
        initialNumToRender={15}
        renderItem={({ item }) => (
          <SelectedContact
            item={item}
            setChecked={setChecked}
            checked={checked.some(c => c._id === item._id)}
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

SelectContactsScreen.navigationOptions = SelectContactsHeader;

export default SelectContactsScreen;

const styles = StyleSheet.create({
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
