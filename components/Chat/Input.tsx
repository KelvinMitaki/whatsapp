import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableNativeFeedback, View } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import inspect from '../../inspect';
import AppColors from '../../Colors/color';
import { useAddNewGroupMsgMutation, useAddNewMessageMutation } from '../../generated/graphql';

export const MESSAGE_LIMIT = 50;

interface Props {
  screen: 'chat' | 'group';
  recipient?: string;
  group?: string;
  setKeyboardShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input: React.FC<Props> = ({ screen, recipient, group, setKeyboardShown }) => {
  const [inp, setInp] = useState<string>('');
  const [addNewMessage] = useAddNewMessageMutation();
  const [addNewGroupMsg] = useAddNewGroupMsgMutation();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShown(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false);
    });
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => {});
      Keyboard.removeListener('keyboardDidHide', () => {});
    };
  }, []);
  return (
    <View style={styles.prt}>
      <View style={styles.smiley}>
        <Fontisto name="smiley" color="#fff" size={25} />
      </View>
      <TextInput
        style={styles.inp}
        onChangeText={setInp}
        value={inp}
        placeholder="Type a message"
        placeholderTextColor="rgba(255,255,255,.5)"
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableNativeFeedback
          onPress={() => {
            if (inp.trim().length) {
              if (screen === 'chat' && recipient) {
                addNewMessage({ variables: { recipient, message: inp } });
              }
              if (screen === 'group' && group) {
                addNewGroupMsg({ variables: { group, message: inp } });
              }
              setInp('');
            }
          }}
        >
          <View style={styles.send}>
            <Ionicons name="send-sharp" size={25} color="#fff" style={{ marginLeft: '10%' }} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  prt: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    position: 'absolute',
    bottom: 5,
    width: '100%',
    backgroundColor: AppColors.primary,
  },
  inp: {
    width: '75%',
    backgroundColor: '#262d31',
    height: 45,
    fontSize: 20,
    color: '#fff',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  smiley: {
    backgroundColor: '#262d31',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    marginLeft: 5,
  },
  send: {
    height: 45,
    width: 45,
    backgroundColor: '#00af9c',
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
