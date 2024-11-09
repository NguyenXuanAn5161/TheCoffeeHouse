import Products from "@/app/screens/Products";
import { colors, fontSizes } from "@/styles/globalStyles";
import { Fontisto, Ionicons, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "@screens/Account";
import Home from "@screens/Home";
import Notification from "@screens/Notification";
import { StyleSheet, View, Text } from "react-native";
import CustomHeader from "./CustomHeader";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: { height: 70 },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} />,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.focusedIconContainer,
              ]}
            >
              <Ionicons
                name="home"
                color={focused ? colors.primary : color}
                size={35}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? fontSizes.small : fontSizes.sz14,
                fontWeight: "700",
                color: colors.white,
              }}
            >
              Trang chủ
            </Text>
          ),
        })}
      />
      <Tab.Screen
        name="Product"
        component={Products}
        options={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} />,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.focusedIconContainer,
              ]}
            >
              <Fontisto
                name="coffeescript"
                size={35}
                color={focused ? colors.primary : color}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? fontSizes.small : fontSizes.sz14,
                fontWeight: "700",
                color: colors.white,
              }}
            >
              Coffee
            </Text>
          ),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={({ navigation }) => ({
          headerTitle: "Thông báo",
          headerTitleStyle: styles.headerTitleStyle,
          headerTintColor: colors.white,
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: colors.primary,
              }}
            />
          ),
          headerRight: () => <RightICon navigation={navigation} />,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.focusedIconContainer,
              ]}
            >
              <Ionicons
                name="notifications-outline"
                color={focused ? colors.primary : color}
                size={35}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? fontSizes.small : fontSizes.sz14,
                fontWeight: "700",
                color: colors.white,
              }}
            >
              Notification
            </Text>
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={({ navigation }) => ({
          headerTintColor: colors.white,
          headerTitle: "Tài khoản",
          headerTitleStyle: styles.headerTitleStyle,
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: colors.primary,
              }}
            />
          ),
          headerRight: () => <RightICon navigation={navigation} />,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.focusedIconContainer,
              ]}
            >
              <Ionicons
                name="person"
                color={focused ? colors.primary : color}
                size={35}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? fontSizes.small : fontSizes.sz14,
                fontWeight: "700",
                color: colors.white,
              }}
            >
              Account
            </Text>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const RightICon = ({ navigation }) => {
  return (
    <AntDesign
      onPress={() => navigation.navigate("ShoppingCart")}
      name="shoppingcart"
      size={26}
      color={colors.white}
      style={{ marginRight: 15, padding: 10 }}
    />
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  focusedIconContainer: {
    backgroundColor: colors.white,
    borderRadius: 90,
    marginBottom: 40,
  },
  headerTitleStyle: { color: colors.white, fontWeight: "700" },
});
