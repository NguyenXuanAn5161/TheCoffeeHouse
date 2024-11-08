import React from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import Login from "@screens/login";
import Register from "@screens/register";
import ShoppingCart from "@screens/ShoppingCart";
import ProductDetail from "@screens/ProductDetail";
import { colors, globalStyles } from "@/styles/globalStyles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const HeaderBackButton = ({ navigation }) => (
  <Pressable onPress={() => navigation.goBack()} style={styles.headerButton}>
    <View style={[globalStyles.shadow, styles.buttonContainer]}>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={30}
        color={colors.primary}
      />
    </View>
  </Pressable>
);

const HeaderCartButton = ({ navigation }) => (
  <Pressable
    onPress={() => navigation.navigate("ShoppingCart")}
    style={styles.headerButton}
  >
    <Ionicons name="cart" size={30} color={colors.white} />
  </Pressable>
);

const AppNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="BottomTab">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShoppingCart"
          component={ShoppingCart}
          options={{ title: "Giỏ hàng" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={({ navigation }) => ({
            headerTitle: "",
            headerStyle: styles.headerStyle,
            headerLeft: () => <HeaderBackButton navigation={navigation} />,
            headerRight: () => <HeaderCartButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerButton: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: colors.white,
    borderRadius: 90,
  },
});

export default AppNavigator;
