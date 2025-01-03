// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "@components/AppNavigator";
import { SafeAreaView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
