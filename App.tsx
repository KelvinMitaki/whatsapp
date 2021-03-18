import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducer";
import HomeScreen from "./screens/HomeScreen";
import GroupScreen from "./screens/GroupScreen";
import StatusScreen from "./screens/StatusScreen";
import ChatScreen from "./screens/ChatScreen";
import { enableScreens } from "react-native-screens";
import GroupChatScreen from "./screens/GroupChatScreen";
import MyStatusScreen from "./screens/MyStatusScreen";
import ContactScreen from "./screens/ContactScreen";
import HomeHeaderRight from "./components/HomeHeaderRight";
import { Platform } from "react-native";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NewGroupScreen from "./screens/NewGroupScreen";
import NewGroupInfoScreen from "./screens/NewGroupInfoScreen";

enableScreens();

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
    }
  }
);

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

const stackNavigator = createStackNavigator(
  {
    Tab: {
      screen: TabNavigator,
      ...stackScreenSettings,
      navigationOptions: {
        headerTitle: "ChatApp",
        ...stackScreenSettings.navigationOptions
      }
    },
    Chat: {
      screen: ChatScreen,
      ...stackScreenSettings
    },
    GroupChat: {
      screen: GroupChatScreen,
      ...stackScreenSettings
    },
    MyStatus: {
      screen: MyStatusScreen,
      ...stackScreenSettings
    },
    Contact: {
      screen: ContactScreen,
      ...stackScreenSettings
    },
    Settings: {
      screen: SettingsScreen,
      ...stackScreenSettings
    },
    Profile: {
      screen: ProfileScreen,
      ...stackScreenSettings
    },
    NewGroup: {
      screen: NewGroupScreen,
      ...stackScreenSettings
    },
    NewGroupInfo: {
      screen: NewGroupInfoScreen,
      ...stackScreenSettings
    }
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "transparent",
        opacity: 1,
        flex: 1,
        zIndex: 1,
        elevation: Platform.OS === "android" ? 1 : 0
      },
      cardStyleInterpolator: ({ current, closing }) => ({
        cardStyle: {
          opacity: current.progress
        }
      })
    }
  }
);
const App = createAppContainer(stackNavigator);
const store = createStore(reducer);
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
