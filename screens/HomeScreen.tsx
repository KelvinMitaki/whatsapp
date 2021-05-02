import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data/data";
import inspect from "../inspect";
import HomeChat from "../components/Home/HomeChat";
import { useHeaderHeight } from "react-navigation-stack";
import { useDispatch } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { useQuery } from "@apollo/client";
import { FETCH_CHATS } from "../graphql/queries";
import StartChat from "../components/Home/StartChat";

export interface SetHeaderHeight {
  type: "setHeaderHeight";
  payload: number;
}

export interface SetSearchModal {
  type: "setSearchModal";
  payload: boolean;
}

const HomeScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const { data } = useQuery(FETCH_CHATS, { fetchPolicy: "cache-only" });
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  console.log(data.fetchChats);
  useEffect(() => {
    dispatch<SetHeaderHeight>({ type: "setHeaderHeight", payload: headerHeight });
  }, []);
  return (
    <View style={styles.prt}>
      <NavigationEvents
        onDidBlur={() => dispatch<SetSearchModal>({ type: "setSearchModal", payload: false })}
      />
      <HomeChat />
      {data && data.fetchChats && <StartChat chats={data.fetchChats} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {
    height: "100%",
    justifyContent: "space-between"
  }
});
