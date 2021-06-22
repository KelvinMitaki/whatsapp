import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GroupMsg, Message } from './generated/graphql';
const httpLink = createHttpLink({
  uri: 'https://kevin-whatsapp-api.herokuapp.com/graphql',
});
const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${await AsyncStorage.getItem('token')}` || '',
    },
  };
});
const webSocketLink = new WebSocketLink({
  uri: 'wss://kevin-whatsapp-api.herokuapp.com/graphql',
  options: {
    reconnect: true,
  },
});
const httpAuthLink = authLink.concat(httpLink);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  webSocketLink,
  httpAuthLink
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fetchMessages: {
            keyArgs: false,
            merge(existing: Message[] = [], incoming: Message[]) {
              let existingMessages = [...existing];
              incoming.forEach((msg) => {
                const msgIndex = existingMessages.findIndex((exMsg) => exMsg._id === msg._id);
                if (msgIndex !== -1) {
                  existingMessages[msgIndex] = msg;
                } else {
                  existingMessages = [msg, ...existingMessages];
                }
              });
              return existingMessages;
            },
          },
          fetchGroupMsgs: {
            keyArgs: false,
            merge(existing: GroupMsg[] = [], incoming: GroupMsg[]) {
              let existingMessages = [...existing];
              incoming.forEach((msg) => {
                const msgIndex = existingMessages.findIndex((exMsg) => exMsg._id === msg._id);
                if (msgIndex !== -1) {
                  existingMessages[msgIndex] = msg;
                } else {
                  existingMessages = [msg, ...existingMessages];
                }
              });
              return existingMessages;
            },
          },
          fetchUnreadGroupMsgs: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
