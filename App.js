import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./screens/RecentExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import ReceneExpences from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import "./screens/AllExpenses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const ButtomTabs = createBottomTabNavigator();
function ExpensesOverview() {
  return (
    <ButtomTabs.Navigator>
      <ButtomTabs.Screen name="Recent expenses" component={ReceneExpences} />
      <ButtomTabs.Screen name="All expenses" component={AllExpenses} />
    </ButtomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Manage expense screen"
            component={ManageExpenses}
          />
          <Stack.Screen name="Expenses overview" component={ExpensesOverview} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
