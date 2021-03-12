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
      tabStyle: {
        backgroundColor: "#323739"
      }
    }
  }
);
const stackNavigator = createStackNavigator({
  Tab: {
    screen: TabNavigator,
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#323739"
      }
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
