import React from "react";
import { Animated, Modal, StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
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
                backgroundColor: "#fff",
                alignItems: "center",
                alignSelf: "flex-end"
              },
              { height, width }
            ]}
          >
            <Text>SearchModal SearchModal</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({});
