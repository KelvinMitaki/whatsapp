import React from "react";
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
import { AntDesign } from "@expo/vector-icons";
import inspect from "../../inspect";

interface Props {
  searchScale: Animated.Value;
  height: Animated.Value;
  width: Animated.Value;
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<Props> = ({
  searchScale,
  showSearchModal,
  setShowSearchModal,
  height,
  width
}) => {
  const reset = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 0,
        useNativeDriver: false,
        duration: 3000
      }),
      Animated.timing(width, {
        toValue: 0,
        useNativeDriver: false,
        duration: 3000
      })
    ]).reset();
  };
  return (
    <Modal
      transparent
      onRequestClose={() => {
        setShowSearchModal(false);
        reset();
      }}
      visible={showSearchModal}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setShowSearchModal(false);
          reset();
        }}
      >
        <View style={{ height: "100%", width: "100%" }}>
          <Animated.View
            style={[
              {
                backgroundColor: "#14191d",
                flexDirection: "row",
                alignSelf: "flex-end"
              },
              { height, width }
            ]}
          >
            <View style={styles.search}>
              <View style={styles.iconPrt}>
                <View style={styles.icon}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#fff", true)}
                    onPress={() => {
                      setShowSearchModal(false);
                      reset();
                    }}
                  >
                    <View>
                      <AntDesign name="arrowleft" size={25} color="#fff" />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
              <TextInput placeholder="Search..." style={styles.input} placeholderTextColor="#fff" />
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
    marginLeft: "5%"
  }
});
