import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GroupMessageCount, MessageCount } from './generated/graphql';

interface MergeObject {
  __ref: string;
}

const defaultMerge = ({
  existing,
  incoming,
}: {
  existing: MergeObject[];
  incoming: MergeObject[];
}): MergeObject[] => {
  let existingData = [...existing];
  incoming.forEach((msg) => {
    const msgIndex = existingData.findIndex((exMsg) => exMsg.__ref === msg.__ref);
    if (msgIndex !== -1) {
      existingData[msgIndex] = msg;
    } else {
      existingData = [msg, ...existingData];
    }
  });
  return existingData;
};

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
            merge(existing: MergeObject[] = [], incoming: MergeObject[]) {
              return defaultMerge({ existing, incoming });
            },
          },
          fetchGroupMsgs: {
            keyArgs: false,
            merge(existing: MergeObject[] = [], incoming: MergeObject[]) {
              return defaultMerge({ existing, incoming });
            },
          },
          fetchUnreadGroupMsgs: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return incoming;
            },
          },
          fetchMessagesCount: {
            keyArgs: false,
            merge(existing: MessageCount[] = [], incoming: MessageCount[]) {
              let existingData = [...existing];
              incoming.forEach((msg) => {
                const msgIndex = existingData.findIndex((exMsg) => exMsg.chatID === msg.chatID);
                if (msgIndex !== -1) {
                  existingData[msgIndex] = msg;
                } else {
                  existingData = [msg, ...existingData];
                }
              });
              return existingData;
            },
          },
          fetchGroupMessagesCount: {
            keyArgs: false,
            merge(existing: GroupMessageCount[] = [], incoming: GroupMessageCount[]) {
              let existingData = [...existing];
              incoming.forEach((msg) => {
                const msgIndex = existingData.findIndex((exMsg) => exMsg.groupID === msg.groupID);
                if (msgIndex !== -1) {
                  existingData[msgIndex] = msg;
                } else {
                  existingData = [msg, ...existingData];
                }
              });
              return existingData;
            },
          },
        },
      },
      Subscription: {
        fields: {
          updateReadMessages: {
            keyArgs: false,
            merge(existing: MergeObject[], incoming: MergeObject[]) {
              return defaultMerge({ existing, incoming });
            },
          },
        },
      },
    },
  }),
});

export default client;
