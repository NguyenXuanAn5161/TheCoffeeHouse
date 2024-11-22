import React from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import Login from "@/app/screens/login";
import Register from "@/app/screens/register";
import ShoppingCart from "@/app/screens/ShoppingCart";
import ProductDetail from "@/app/screens/ProductDetail";
import { colors, globalStyles } from "@/styles/globalStyles";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Payment from "@/app/screens/Payment";
import UpdateUser from "@/app/screens/UpdateUser";
import HistoryOrder from "@/app/screens/HistoryOrder/HistoryOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const HeaderBackButton = ({ navigation, withBackground = true, color }) => {
  const handleGoBack = async () => {
    const value = await AsyncStorage.getItem("HistoryOrderBack");
    if (value) {
      navigation.pop(2); // Quay lại 2 màn hình trước
    } else {
      navigation.goBack();
    }
  };

  return (
    <Pressable onPress={() => handleGoBack()} style={styles.headerButton}>
      <View
        style={[
          styles.buttonContainer,
          withBackground && globalStyles.shadow,
          { backgroundColor: withBackground ? colors.white : "transparent" },
        ]}
      >
        <MaterialIcons
          name="keyboard-arrow-left"
          size={30}
          color={color ? colors.white : colors.primary}
        />
      </View>
    </Pressable>
  );
};

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
      <Stack.Navigator initialRouteName="Login">
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
          options={({ navigation }) => ({
            headerTitle: "Giỏ hàng",
            headerTitleStyle: styles.headerTitleStyle,
            headerStyle: styles.headerStyle,
            headerLeft: () => (
              <HeaderBackButton
                withBackground={false}
                color={colors.white}
                navigation={navigation}
              />
            ),
          })}
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
          name="Payment"
          component={Payment}
          options={({ navigation }) => ({
            headerTitle: "Thanh toán",
            headerTitleStyle: styles.headerTitleStyle,
            headerStyle: styles.headerStyle,
            headerLeft: () => (
              <HeaderBackButton
                withBackground={false}
                color={colors.white}
                navigation={navigation}
              />
            ),
          })}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={({ navigation }) => ({
            headerTitle: "Thông tin",
            headerTitleStyle: styles.headerTitleStyle,
            headerStyle: styles.headerStyle,
            headerLeft: () => (
              <HeaderBackButton
                withBackground={false}
                color={colors.white}
                navigation={navigation}
              />
            ),
          })}
        />
        <Stack.Screen
          name="HistoryOrder"
          component={HistoryOrder}
          options={({ navigation }) => ({
            headerTitle: "Lịch sử đơn hàng",
            headerTitleStyle: styles.headerTitleStyle,
            headerStyle: styles.headerStyle,
            headerLeft: () => (
              <HeaderBackButton
                withBackground={false}
                color={colors.white}
                navigation={navigation}
              />
            ),
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
  headerTitleStyle: { color: colors.white },
  headerButton: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: colors.white,
    borderRadius: 90,
  },
});

export default AppNavigator;
