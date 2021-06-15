import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Ionicons, FontAwesome, Octicons, AntDesign } from '@expo/vector-icons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import inspect from '../inspect';
import { useLazyQuery, useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_GROUPS, FETCH_MESSAGES_COUNT, FETCH_UNREAD_GROUP_MSGS } from '../graphql/queries';
import {
  useFetchChatsLazyQuery,
  useFetchCurrentUserLazyQuery,
  useFetchGroupLazyQuery,
  useFetchUnreadGroupMsgsLazyQuery,
  useFetchUsersLazyQuery,
} from '../generated/graphql';

interface Params {
  code: string;
  phoneNumber: string;
}

const NameScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [dataLoading, setdDataLoading] = useState<boolean>(false);
  const [keyboard, setKeyboardHeight] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const mounted = useRef<boolean>(true);
  useEffect(() => {
    if (mounted.current) {
      Keyboard.addListener('keyboardDidShow', keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    }

    return () => {
      mounted.current = false;
      Keyboard.removeListener('keyboardDidShow', () => {});
      Keyboard.removeListener('keyboardDidHide', () => {});
    };
  }, []);
  useEffect(() => {
    if (scrollViewRef.current && keyboard) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [keyboard]);
  const keyboardDidShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };
  const keyboardDidHide = (e: KeyboardEvent) => {
    setKeyboardHeight(0);
  };

  const [fetchCurrentUser, user] = useFetchCurrentUserLazyQuery();
  const currentUser = user.data;
  const [fetchChats] = useFetchChatsLazyQuery({
    onCompleted(chatData) {
      fetchMessagesCount({
        variables: {
          userIDs: chatData.fetchChats.map((c) =>
            c.sender._id === currentUser?.fetchCurrentUser._id ? c.recipient._id : c.sender._id
          ),
        },
      });
    },
  });
  const [fetchMessagesCount] = useLazyQuery(FETCH_MESSAGES_COUNT, {
    onCompleted() {
      setdDataLoading(false);
      navigation.replace('Tab');
    },
  });
  const [fetchUsers] = useFetchUsersLazyQuery();
  const [fetchGroups] = useFetchGroupLazyQuery();
  const [fetchUnreadGroupMsgs] = useFetchUnreadGroupMsgsLazyQuery();
  const [registerUser] = useMutation(REGISTER_USER, {
    async onCompleted(data) {
      await AsyncStorage.setItem('token', data.registerUser.token);
      fetchCurrentUser();
      fetchChats();
      fetchUsers();
      fetchGroups();
      fetchUnreadGroupMsgs();
    },
    onError(err) {
      setdDataLoading(false);
      console.log(err);
    },
  });
  const phoneNumber = navigation.getParam('phoneNumber');
  const code = navigation.getParam('code');
  return (
    <ScrollView ref={scrollViewRef}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ marginTop: '20%' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
            Profile info
          </Text>
          <Text style={{ color: 'rgba(255,255,255,.8)', textAlign: 'center', marginVertical: 20 }}>
            Please provide your name and an optional profile photo
          </Text>
          <View style={[styles.person]}>
            <Ionicons name="person" size={100} color="rgba(241, 241, 242, 0.8)" />
            <View style={[styles.cameraPrt]}>
              <TouchableNativeFeedback
                onPress={() => {}}
                background={TouchableNativeFeedback.Ripple('#fff', true)}
              >
                <View style={styles.camera}>
                  <FontAwesome name="camera" size={20} color="#fff" />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <TextInput style={styles.inp} autoFocus onChangeText={setName} />
            <Octicons name="smiley" color="rgba(241, 241, 242, 0.8)" size={25} />
          </View>
        </View>

        <TouchableNativeFeedback
          onPress={() =>
            name.trim().length &&
            registerUser({
              variables: {
                name,
                about: 'Hey there! I am using ChatApp',
                phoneNumber: parseInt(phoneNumber),
                countryCode: code,
                groups: [],
              },
            }) &&
            setdDataLoading(true)
          }
        >
          <View style={styles.btn}>
            <Text>NEXT</Text>
            {!dataLoading ? (
              <AntDesign name="arrowright" size={20} />
            ) : (
              <ActivityIndicator color="#191f23" size="small" />
            )}
          </View>
        </TouchableNativeFeedback>
      </View>
    </ScrollView>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  person: {
    height: 150,
    width: 150,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignSelf: 'center',
  },
  cameraPrt: {
    position: 'absolute',
    right: '-15%',
    bottom: '7%',
    backgroundColor: '#00af9c',
    borderRadius: 55,
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: 55,
  },
  inp: {
    borderBottomColor: '#00af9c',
    borderBottomWidth: 2,
    width: '80%',
    marginRight: 10,
    color: '#fff',
    paddingHorizontal: 5,
  },
  btn: {
    backgroundColor: '#00af9c',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
});
