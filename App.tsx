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

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Group: GroupScreen,
    Status: StatusScreen
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#1e2529"
      },
      indicatorStyle: {
        backgroundColor: "#fff"
      }
    }
  }
);
const stackNavigator = createStackNavigator({
  Tab: {
    screen: TabNavigator,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#1e2529"
      },
      headerTintColor: "white",
      headerTitle: "ChatApp"
    }
  }
});
const App = createAppContainer(stackNavigator);
const store = createStore(reducer);
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
