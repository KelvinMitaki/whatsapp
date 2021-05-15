import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
  Dimensions
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomModal from "../Modals/CustomModal";
import SearchModal from "../Modals/SearchModal";
import { Header, useHeaderHeight } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { SetSearchModal } from "../../screens/HomeScreen";

interface Props {
  starredMsgsScreen?: boolean;
}

export interface SetStarredMsgsInput {
  type: "setStarredMsgsInput";
  payload: string;
}

const HomeHeaderRight: React.FC<NavigationInjectedProps & Props> = ({ starredMsgsScreen }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inp, setInp] = useState<string>("");
  const headerHeight = useSelector((state: Redux) => state.chat.headerHeight);
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const dispatch = useDispatch();
  const height = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;
  const searchHeight = useRef(new Animated.Value(20)).current;
  const searchWidth = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    if (!searchModal) {
      searchHeight.setValue(0);
      searchWidth.setValue(0);
    }
  }, [searchModal]);
  useEffect(() => {
    if (starredMsgsScreen) {
      dispatch<SetStarredMsgsInput>({ type: "setStarredMsgsInput", payload: inp });
    }
  }, [inp]);
  return (
    <View style={styles.headerRight}>
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
            dispatch({ type: "setSearchModal", payload: true });
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
            setShowModal(true);
            Animated.parallel([
              Animated.timing(height, {
                toValue: 200,
                useNativeDriver: false,
                duration: 300
              }),
              Animated.timing(width, {
                toValue: 150,
                useNativeDriver: false,
                duration: 300
              })
            ]).start();
          }}
        >
          <View>
            <Ionicons name="ellipsis-vertical-sharp" size={20} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        height={height}
        width={width}
      />
      <SearchModal height={searchHeight} width={searchWidth} setInp={setInp} inp={inp} />
    </View>
  );
};

export default withNavigation(HomeHeaderRight);

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    width: "150%",
    justifyContent: "space-around"
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
