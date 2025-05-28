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
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const ButtomTabs = createBottomTabNavigator();
function ExpensesOverview() {
  return (
    <ButtomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.primary200,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Manage expense screen");
            }}
          />
        ),
      })}
    >
      <ButtomTabs.Screen
        name="Recent expenses"
        component={ReceneExpences}
        options={{
          title: "Recent expenses",
          tabBarLabel: "Recent expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
          // headerRight: ({ tintColor }) => (
          //   <Ionicons
          //     name="add"
          //     size={24}
          //     color={tintColor}
          //     onPress={() => {
          //       console.log("Pressed");
          //     }}
          //   />
          // ),
        }}
      />
      <ButtomTabs.Screen
        name="All expenses"
        component={AllExpenses}
        options={{
          title: "All expenses",
          tabBarLabel: "All expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons
              name="add"
              size={24}
              color={tintColor}
              onPress={() => {
                console.log("Pressed");
              }}
            />
          ),
        }}
      />
    </ButtomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="Expenses overview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Manage expense screen"
              component={ManageExpenses}
              options={{
                //modal effect:
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
