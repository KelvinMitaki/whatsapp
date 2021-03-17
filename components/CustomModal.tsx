import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback
} from "react-native";

const CustomModal = () => {
  return (
    <Modal transparent>
      <View
        style={{
          backgroundColor: "#14191d",
          width: "35%",
          alignSelf: "flex-end"
        }}
      >
        <TouchableNativeFeedback
          onPress={() => {}}
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#FFFFFF", false)
          }
        >
          <View>
            <Text style={{ color: "#fff", padding: 10 }}>Name</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#FFFFFF", false)
          }
        >
          <View>
            <Text style={{ color: "#fff", padding: 10 }}>Name</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#FFFFFF", false)
          }
        >
          <View>
            <Text style={{ color: "#fff", padding: 10 }}>Name</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={
            //@ts-ignore
            TouchableNativeFeedback.Ripple("#FFFFFF", false)
          }
        >
          <View>
            <Text style={{ color: "#fff", padding: 10 }}>Name</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({});
