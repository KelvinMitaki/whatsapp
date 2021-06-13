import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import { NavigationStackScreenComponent, useHeaderHeight } from 'react-navigation-stack';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import inspect from '../inspect';
import Contact from '../components/Contacts/Contact';
import { FETCH_USERS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import SearchModal from '../components/Modals/SearchModal';
import { SetSearchModal } from './HomeScreen';
import { NavigationEvents } from 'react-navigation';
import { Redux } from '../interfaces/Redux';
import ContactScreenHeader from '../components/Contacts/ContactScreenHeader';
import { useFetchUsersQuery } from '../generated/graphql';

interface Params {
  contacts: number;
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  setInp: React.Dispatch<React.SetStateAction<string>>;
  inp: string;
  headerHeight: number;
}

const ContactScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const { data } = useFetchUsersQuery();
  const [inp, setInp] = useState<string>('');
  const searchHeight = useRef(new Animated.Value(20)).current;
  const searchWidth = useRef(new Animated.Value(20)).current;
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    navigation.setParams({ searchHeight, searchWidth, dispatch, setInp, headerHeight });
  }, [searchHeight, searchWidth, dispatch, setInp, headerHeight]);
  useEffect(() => {
    navigation.setParams({ inp });
  }, [inp]);
  useEffect(() => {
    navigation.setParams({ contacts: data?.fetchUsers.length });
  }, [data && data.fetchUsers]);
  return (
    <>
      {searchModal && <View style={{ height: headerHeight / 3 }}></View>}
      <ScrollView>
        <NavigationEvents
          onWillFocus={() => dispatch<SetSearchModal>({ type: 'setSearchModal', payload: false })}
        />
        <View>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#fff', false)}
            onPress={() => navigation.navigate('NewGroup')}
          >
            <View style={styles.meta}>
              <View style={styles.person}>
                <MaterialCommunityIcons name="account-group" size={25} color="#fff" />
              </View>
              <View style={styles.textPrt}>
                <View>
                  <Text style={styles.metaText}>New Group</Text>
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#fff', false)}
            onPress={() => {}}
          >
            <View style={styles.meta}>
              <View style={styles.person}>
                <Ionicons name="person-add" size={25} color="#fff" />
              </View>
              <View style={styles.textPrt}>
                <Text style={styles.metaText}>New Contact</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
        <Contact inp={inp} />
      </ScrollView>
    </>
  );
};

ContactScreen.navigationOptions = ContactScreenHeader;

export default ContactScreen;

const styles = StyleSheet.create({
  person: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00af9c',
    height: 45,
    width: 45,
    borderRadius: 55,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    height: 70,
  },
  textPrt: {
    justifyContent: 'center',
    height: '100%',
    width: '85%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,.3)',
  },
  metaText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 17,
  },
});
