import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import inspect from "../../inspect";
interface Props {
  setStatusVisible: React.Dispatch<React.SetStateAction<boolean>>;
  statusVisible: boolean;
}
const MuteStatusModal: React.FC<Props> = ({ setStatusVisible, statusVisible }) => {
  return (
    <Overlay
      isVisible={statusVisible}
      onBackdropPress={() => setStatusVisible(false)}
      overlayStyle={{ backgroundColor: "#20272b", width: "85%" }}
      animationType="fade"
    >
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Mute Kevin's status updates?</Text>
        <Text style={{ color: "#fff", paddingVertical: 10 }}>
          New status updates won't appear under recent updates anymore
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingVertical: 10 }}>
        <Text style={{ color: "#00af9c", marginLeft: 30 }} onPress={() => setStatusVisible(false)}>
          CANCEL
        </Text>
        <Text
          style={{ color: "#00af9c", marginLeft: 30, marginRight: 20 }}
          onPress={() => setStatusVisible(false)}
        >
          MUTE
        </Text>
      </View>
    </Overlay>
  );
};

export default MuteStatusModal;

const styles = StyleSheet.create({});
