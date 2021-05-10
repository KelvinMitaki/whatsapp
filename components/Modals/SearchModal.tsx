import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  TouchableNativeFeedback
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  Entypo
} from "@expo/vector-icons";
import inspect from "../../inspect";
import { NavigationEvents } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { SetSearchModal } from "../../screens/HomeScreen";

interface Props {
  height: Animated.Value;
  width: Animated.Value;
  hideFilter?: boolean;
}

const SearchModal: React.FC<Props> = ({ height, width, hideFilter }) => {
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const dispatch = useDispatch();
  const reset = () => {
    height.setValue(0);
    width.setValue(0);
  };
  if (!searchModal) return null;
  return (
    <View style={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}>
      <Animated.View
        style={[
          {
            backgroundColor: "#14191d",
            flexDirection: "column",
            alignSelf: "flex-end"
          },
          { height, width }
        ]}
      >
        <View style={[styles.search, hideFilter && { borderBottomWidth: 0, height: "100%" }]}>
          <View style={styles.iconPrt}>
            <View style={styles.icon}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#fff", true)}
                onPress={() => {
                  dispatch<SetSearchModal>({ type: "setSearchModal", payload: false });
                  reset();
                }}
              >
                <View>
                  <AntDesign name="arrowleft" size={25} color="#fff" />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <TextInput
            placeholder="Search..."
            style={styles.input}
            placeholderTextColor="#fff"
            autoFocus
          />
        </View>
        {!hideFilter && (
          <View style={styles.filterPrt}>
            <View style={styles.filter}>
              <FontAwesome name="photo" size={18} style={{ paddingRight: 5 }} color="#fff" />
              <Text style={{ color: "#fff" }}>Photos</Text>
            </View>
            <View style={styles.filter}>
              <FontAwesome name="video-camera" size={18} style={{ paddingRight: 5 }} color="#fff" />
              <Text style={{ color: "#fff" }}>Videos</Text>
            </View>
            <View style={styles.filter}>
              <Feather name="link-2" size={18} style={{ paddingRight: 5 }} color="#fff" />
              <Text style={{ color: "#fff" }}>Links</Text>
            </View>
            <View style={styles.filter}>
              <MaterialCommunityIcons
                name="headphones"
                size={18}
                style={{ paddingRight: 5 }}
                color="#fff"
              />
              <Text style={{ color: "#fff" }}>Audio</Text>
            </View>
            <View style={styles.filter}>
              <Entypo name="text-document" size={18} style={{ paddingRight: 5 }} color="#fff" />
              <Text style={{ color: "#fff" }}>Documents</Text>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#20272b"
  },
  iconPrt: {
    width: "13%",
    alignItems: "center"
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 50,
    width: "70%",
    color: "#fff",
    marginLeft: "2%"
  },
  filterPrt: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
    width: "100%",
    backgroundColor: "#14191d",
    overflow: "hidden"
  },
  filter: {
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: "#20272b",
    borderRadius: 400,
    flexDirection: "row",
    alignItems: "center",
    margin: 5
  }
});
