import React from 'react';
import { Animated, Dimensions, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import SearchModal from '../Modals/SearchModal';
import { SetSearchModal } from '../../screens/HomeScreen';
import { Dispatch } from 'redux';
import { User } from '../../interfaces/ChatInterface';
import { FetchUsersQuery } from '../../generated/graphql';

interface Params {
  slctn: 'myContactsExc' | 'onlyShareWith';
  selected: number;
  selectAll: boolean;
  setChecked: React.Dispatch<React.SetStateAction<FetchUsersQuery['fetchUsers']>>;
  dispatch: Dispatch<any>;
  searchHeight: Animated.Value;
  searchWidth: Animated.Value;
  headerHeight: number;
  contacts: FetchUsersQuery['fetchUsers'];
  setInp: React.Dispatch<React.SetStateAction<string>>;
  inp: string;
}

const SelectContactsHeader: NavigationStackScreenComponent<Params>['navigationOptions'] = ({
  navigation,
}) => {
  const slctn = navigation.getParam('slctn');
  const selected = navigation.getParam('selected');
  const selectAll = navigation.getParam('selectAll');
  const setChecked = navigation.getParam('setChecked');
  const searchHeight = navigation.getParam('searchHeight');
  const searchWidth = navigation.getParam('searchWidth');
  const headerHeight = navigation.getParam('headerHeight');
  const dispatch = navigation.getParam('dispatch');
  const contacts = navigation.getParam('contacts');
  const inp = navigation.getParam('inp');
  const setInp = navigation.getParam('setInp');
  return {
    headerTitle: () => (
      <View>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          {slctn === 'myContactsExc' ? 'Hide status from...' : 'Share status with...'}
        </Text>
        <Text style={{ color: '#fff' }}>
          {!selected
            ? slctn === 'myContactsExc'
              ? 'No contacts excluded'
              : 'No contacts selected'
            : `${selected.toLocaleString()} ${selected === 1 ? 'contact' : 'contacts'} ${
                slctn === 'myContactsExc' ? 'excluded' : 'selected'
              }`}
        </Text>
      </View>
    ),
    headerRight: () => (
      <>
        <SearchModal
          width={searchWidth}
          height={searchHeight}
          hideFilter
          setInp={setInp}
          inp={inp}
        />
        <View style={styles.headerIconsPrt}>
          <View style={styles.ellipsis}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#fff', true)}
              onPress={() => {
                dispatch<SetSearchModal>({ type: 'setSearchModal', payload: true });
                Animated.parallel([
                  Animated.timing(searchHeight, {
                    toValue: headerHeight,
                    useNativeDriver: false,
                    duration: 300,
                  }),
                  Animated.timing(searchWidth, {
                    toValue: Dimensions.get('screen').width,
                    useNativeDriver: false,
                    duration: 300,
                  }),
                ]).start();
              }}
            >
              <View>
                <MaterialIcons name="search" size={25} color="#fff" />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.ellipsis}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#fff', true)}
              onPress={() => {
                navigation.setParams({ selectAll: !selectAll });
                if (!selectAll) {
                  setChecked(contacts);
                } else {
                  setChecked([]);
                }
              }}
            >
              <View>
                <MaterialIcons name="playlist-add-check" size={25} color="#fff" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </>
    ),
  };
};

export default SelectContactsHeader;

const styles = StyleSheet.create({
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  headerIconsPrt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 90,
    marginHorizontal: 10,
  },
});
