import { createStackNavigator, createAppContainer } from "react-navigation";
import ExpenseList from "../pages/ExpenseList";
import ExpenseDetail from "../pages/ExpenseDetail";

const AppNavigator = createStackNavigator(
  {
    List: {
      screen: ExpenseList
    },
    Detail: {
      screen: ExpenseDetail
    }
  },
  {
    initialRouteName: "List"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
