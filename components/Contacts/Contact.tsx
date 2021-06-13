import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import inspect from '../../inspect';
import { useQuery } from '@apollo/client';
import { FETCH_CHATS, FETCH_USERS } from '../../graphql/queries';
import { Chat, User } from '../../interfaces/ChatInterface';
import { FetchUsersQuery, useFetchUsersQuery } from '../../generated/graphql';

interface Props {
  setContacts?: (usr: FetchUsersQuery['fetchUsers'][0]) => void;
  Contacts?: FetchUsersQuery['fetchUsers'];
  inp: string;
}

const Contact: React.FC<NavigationInjectedProps & Props> = (props) => {
  const { navigation, setContacts, Contacts, inp } = props;
  const { data } = useFetchUsersQuery();
  const chat = useQuery(FETCH_CHATS, { fetchPolicy: 'cache-only' });
  return (
    <>
      {data &&
        data.fetchUsers
          .filter((c) =>
            inp.trim().length
              ? c.name.trim().toLowerCase().includes(inp.trim().toLowerCase())
              : true
          )
          .map((usr) => (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#FFFFFF', false)}
              onPress={() => {
                if (!setContacts) {
                  navigation.navigate('Chat', {
                    recipient: usr,
                    chatID: (chat.data.fetchChats as Chat[]).find(
                      (c) => c.sender._id === usr._id || c.recipient._id === usr._id
                    ),
                  });
                } else {
                  setContacts(usr);
                }
              }}
              key={usr._id}
            >
              <View style={styles.contact}>
                <View>
                  <View style={styles.person}>
                    <Ionicons name="person" size={35} color="rgba(241, 241, 242, 0.8)" />
                  </View>
                  {Contacts && Contacts.find((ct) => ct._id === usr._id) && (
                    <View style={styles.selectedContact}>
                      <Octicons name="check" size={15} />
                    </View>
                  )}
                </View>
                <View style={styles.contactTxt}>
                  <View style={{ justifyContent: 'center', height: '100%' }}>
                    <Text style={{ fontSize: 22, color: '#fff' }} numberOfLines={1}>
                      {usr.name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: 'rgba(255,255,255,.6)',
                      }}
                    >
                      Hey there! I'm using WhatsApp
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
    </>
  );
};

export default withNavigation(Contact);

const styles = StyleSheet.create({
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 10,
  },
  contactTxt: {
    paddingLeft: 10,
    width: '87%',
    height: '100%',
    borderBottomColor: 'rgba(255,255,255,.3)',
    borderBottomWidth: 0.5,
  },
  person: {
    height: 45,
    width: 45,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  selectedContact: {
    position: 'absolute',
    right: '-10%',
    bottom: '-5%',
    backgroundColor: '#00af9c',
    borderRadius: 500,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#111',
    borderWidth: 1.5,
  },
});
