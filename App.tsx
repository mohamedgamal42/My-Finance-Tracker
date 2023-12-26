import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";

import HomeScreen from "./screens/homeScreen";
import AddExpense from "./screens/addExpense";
import ExpenseContextProvider from "./store/context/expense-context";
import MonthDetails from "./screens/monthDetails";
import { init } from './dataBase/databse';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#f000ff" },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddExpenseScreen" component={AddExpense} />
            <Stack.Screen name="MonthDetailsScreen" component={MonthDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
