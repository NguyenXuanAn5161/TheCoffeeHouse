// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/Screens/login";
import Register from "./app/Screens/register";
import Home from "./app/Screens/Home";
import Notification from "./app/Screens/Notification";
import Payment from "./app/Screens/Payment";
import Account from "./app/Screens/Account";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/> 
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
