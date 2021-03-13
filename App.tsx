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
        backgroundColor: "#20272b"
      },
      indicatorStyle: {
        backgroundColor: "#00af9c"
      },
      activeTintColor: "#00af9c"
    }
  }
);
const stackNavigator = createStackNavigator(
  {
    Tab: {
      screen: TabNavigator,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#20272b"
        },
        headerTintColor: "white",
        headerTitle: "ChatApp",
        cardStyle: {
          backgroundColor: "#191f23"
        }
      }
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#20272b"
        },
        headerTintColor: "white",
        cardStyle: {
          backgroundColor: "#191f23"
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "transparent", opacity: 1, flex: 1 },
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
