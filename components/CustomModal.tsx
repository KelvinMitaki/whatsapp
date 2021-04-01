import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import inspect from "../inspect";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

const CustomModal: React.FC<Props & NavigationInjectedProps> = ({
  setShowModal,
  showModal,
  navigation
}) => {
  return (
    <Modal
      transparent
      onRequestClose={() => setShowModal(false)}
      visible={showModal}
      animationType="fade"
    >
      <TouchableWithoutFeedback
        accessible={false}
        onPress={() => setShowModal(false)}
        touchSoundDisabled
      >
        <View style={{ height: "100%", width: "100%" }}>
          <View
            style={{
              backgroundColor: "#14191d",
              width: 150,
              alignSelf: "flex-end",
              marginRight: 5,
              marginTop: 5
            }}
          >
            <TouchableNativeFeedback
              onPress={() => {
                setShowModal(false);
                navigation.navigate("NewGroup");
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default withNavigation(CustomModal);

const styles = StyleSheet.create({});
