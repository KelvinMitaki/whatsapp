import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";

const stackNavigator = createStackNavigator({ Home: HomeScreen });

const App = createAppContainer(stackNavigator);

export default () => <App />;
