import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Animated
} from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import inspect from "../../inspect";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  height: Animated.Value;
  width: Animated.Value;
}

const CustomModal: React.FC<Props & NavigationInjectedProps> = ({
  setShowModal,
  showModal,
  navigation,
  height,
  width
}) => {
  const reset = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 200,
        useNativeDriver: false,
        duration: 1000
      }),
      Animated.timing(width, {
        toValue: 150,
        useNativeDriver: false,
        duration: 1000
      })
    ]).reset();
  };
  return (
    <Modal
      transparent
      onRequestClose={() => {
        setShowModal(false);
        reset();
      }}
      visible={showModal}
    >
      <TouchableWithoutFeedback
        accessible={false}
        onPress={() => {
          setShowModal(false);
          reset();
        }}
        touchSoundDisabled
      >
        <View style={{ height: "100%", width: "100%" }}>
          <Animated.View
            style={[
              {
                backgroundColor: "#14191d",
                alignSelf: "flex-end",
                marginRight: 5,
                marginTop: 5,
                overflow: "hidden"
              },
              { height, width }
            ]}
          >
            <TouchableNativeFeedback
              onPress={() => {
                setShowModal(false);
                navigation.navigate("NewGroup");
                reset();
              }}
              background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
            >
              <View>
                <Text
                  style={{
                    color: "#fff",
                    paddingVertical: 15,
                    paddingLeft: 15
                  }}
                >
                  New group
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setShowModal(false);
                navigation.navigate("Broadcast");
                reset();
              }}
              background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
            >
              <View>
                <Text
                  style={{
                    color: "#fff",
                    paddingVertical: 15,
                    paddingLeft: 15
                  }}
                >
                  New broadcast
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setShowModal(false);
                navigation.navigate("StarredMessages");
                reset();
              }}
              background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
            >
              <View>
                <Text
                  style={{
                    color: "#fff",
                    paddingVertical: 15,
                    paddingLeft: 15
                  }}
                >
                  Starred messages
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setShowModal(false);
                navigation.navigate("Settings");
                reset();
              }}
              background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
            >
              <View>
                <Text
                  style={{
                    color: "#fff",
                    paddingVertical: 15,
                    paddingLeft: 15
                  }}
                >
                  Settings
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default withNavigation(CustomModal);

const styles = StyleSheet.create({});
