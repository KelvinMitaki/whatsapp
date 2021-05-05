import React from "react";
import { Platform } from "react-native";
import { enableScreens } from "react-native-screens";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs
} from "react-navigation-stack";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducer";
import HomeScreen from "./screens/HomeScreen";
import GroupScreen from "./screens/GroupScreen";
import StatusScreen from "./screens/StatusScreen";
import ChatScreen from "./screens/ChatScreen";
import GroupChatScreen from "./screens/GroupChatScreen";
import MyStatusScreen from "./screens/MyStatusScreen";
import ContactScreen from "./screens/ContactScreen";
import HomeHeaderRight from "./components/Home/HomeHeaderRight";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NewGroupScreen from "./screens/NewGroupScreen";
import NewGroupInfoScreen from "./screens/NewGroupInfoScreen";
import StarredMessagesScreen from "./screens/StarredMessagesScreen";
import BroadcastScreen from "./screens/BroadcastScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
import StatusPrivacyScreen from "./screens/StatusPrivacyScreen";
import SelectContactsScreen from "./screens/SelectContactsScreen";
import inspect from "./inspect";
import StatusViewScreen from "./screens/StatusViewScreen";
import StartScreen from "./screens/StartScreen";
import PhoneNumberScreen from "./screens/PhoneNumberScreen";
import CountryScreen from "./screens/CountryScreen";
import VerificationScreen from "./screens/VerificationScreen";
import NameScreen from "./screens/NameScreen";
import BlankScreen from "./screens/BlankScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMainDefinition } from "@apollo/client/utilities";
import { NavigationCommonTabOptions } from "react-navigation-tabs/lib/typescript/src/types";

enableScreens();

const stackScreenSettings = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: "#20272b"
    },
    headerTintColor: "white",
    cardStyle: {
      backgroundColor: "#191f23"
    }
  }
};

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Group: GroupScreen,
    Status: StatusScreen
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#20272b",
        zIndex: 1,
        elevation: Platform.OS === "android" ? 1 : 0
      },
      indicatorStyle: {
        backgroundColor: "#00af9c",
        zIndex: 1,
        elevation: Platform.OS === "android" ? 1 : 0
      },
      activeTintColor: "#00af9c"
    },
    navigationOptions: {
      headerRight: () => <HomeHeaderRight />
    } as NavigationCommonTabOptions
  }
);

const stackNavigator = createStackNavigator(
  {
    Blank: {
      screen: BlankScreen,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        headerShown: false
      }
    },
    Start: {
      screen: StartScreen,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        headerShown: false
      }
    },
    Tab: {
      screen: TabNavigator,
      ...stackScreenSettings,
      navigationOptions: {
        headerTitle: "ChatApp",
        ...stackScreenSettings.navigationOptions
      }
    },
    PhoneNumber: {
      screen: PhoneNumberScreen,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        headerShown: false
      }
    },
    Country: {
      // @ts-ignore
      screen: CountryScreen,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        headerShown: false
      }
    },
    Verification: {
      // @ts-ignore
      screen: VerificationScreen,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        headerShown: false
      }
    },
    Name: {
      // @ts-ignore
      screen: NameScreen,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        headerShown: false
      }
    },
    Chat: {
      // @ts-ignore
      screen: ChatScreen,
      ...stackScreenSettings
    },
    GroupChat: {
      // @ts-ignore
      screen: GroupChatScreen,
      ...stackScreenSettings
    },
    MyStatus: {
      screen: MyStatusScreen,
      ...stackScreenSettings
    },
    Contact: {
      // @ts-ignore
      screen: ContactScreen,
      ...stackScreenSettings
    },
    Settings: {
      screen: SettingsScreen,
      ...stackScreenSettings
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        cardStyleInterpolator: ({ current, closing }) => ({
          cardStyle: {
            opacity: current.progress
          }
        })
      }
    },
    NewGroup: {
      screen: NewGroupScreen,
      ...stackScreenSettings
    },
    NewGroupInfo: {
      screen: NewGroupInfoScreen,
      ...stackScreenSettings,
      navigationOptions: {
        ...stackScreenSettings.navigationOptions,
        cardStyle: {
          // backgroundColor: "#191f23"
          backgroundColor: "#12171a"
        }
      }
    },
    StarredMessages: {
      screen: StarredMessagesScreen,
      ...stackScreenSettings
    },
    Broadcast: {
      screen: BroadcastScreen,
      ...stackScreenSettings
    },
    Privacy: {
      screen: PrivacyScreen,
      ...stackScreenSettings
    },
    StatusPrivacy: {
      screen: StatusPrivacyScreen,
      ...stackScreenSettings
    },
    SelectContacts: {
      // @ts-ignore
      screen: SelectContactsScreen,
      ...stackScreenSettings
    },
    StatusView: {
      screen: StatusViewScreen,
      navigationOptions: {
        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        headerShown: false
      }
    }
  },
  {
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    },
    mode: "modal"
  }
);
const App = createAppContainer(stackNavigator);
const store = createStore(reducer);
const httpLink = createHttpLink({
  uri: "https://kevin-whatsapp-api.herokuapp.com/graphql"
});
const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${await AsyncStorage.getItem("token")}` || ""
    }
  };
});
const webSocketLink = new WebSocketLink({
  uri: "wss://kevin-whatsapp-api.herokuapp.com/graphql",
  options: {
    reconnect: true
  }
});
const httpAuthLink = authLink.concat(httpLink);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
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
            merge(existing = [], incoming) {
              return [...incoming, ...existing];
            }
          }
        }
      }
    }
  })
});
export default () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
