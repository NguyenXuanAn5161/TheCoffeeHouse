import Products from "@/app/screens/Products";
import { colors, fontSizes } from "@/styles/globalStyles";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "@screens/Account";
import Home from "@screens/Home";
import Notification from "@screens/Notification";
import { StyleSheet, View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: { height: 70 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
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
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={Products}
        options={{
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
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
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
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
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
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
  },
  focusedIconContainer: {
    backgroundColor: colors.white,
    borderRadius: 90,
    marginBottom: 40,
  },
});
