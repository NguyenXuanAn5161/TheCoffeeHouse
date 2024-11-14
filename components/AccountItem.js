import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontSizes } from "@/styles/globalStyles";
import {
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const items = [
  {
    id: 1,
    name: "Địa chỉ đã lưu",
    icon: <Ionicons name="location" size={24} color={colors.primary} />,
  },
  {
    id: 2,
    name: "Yêu thích",
    icon: <FontAwesome6 name="heart" size={24} color={colors.primary} />,
  },
  {
    id: 3,
    name: "Hóa đơn",
    icon: <Ionicons name="receipt" size={24} color={colors.primary} />,
  },
  {
    id: 4,
    name: "Đánh giá ứng dụng",
    icon: <FontAwesome6 name="star" size={24} color={colors.primary} />,
  },
  {
    id: 5,
    name: "Hỗ trợ",
    icon: (
      <MaterialIcons name="support-agent" size={24} color={colors.primary} />
    ),
  },
  {
    id: 6,
    name: "Điều khoản",
    icon: (
      <MaterialCommunityIcons
        name="file-document-edit-outline"
        size={24}
        color={colors.primary}
      />
    ),
  },
];

const AccountItem = ({ userData, navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  const handleUpdateUser = (user) => {
    console.log("data ac item: ", user);
    navigation.navigate("UpdateUser", { user });
  };

  return (
    <>
      {items.map((item) => (
        <View key={item.id}>
          <View style={styles.itemLine} />
          <Pressable
            onPress={() => item?.navigate && navigation.navigate(item.navigate)}
          >
            <View style={styles.item}>
              <View style={{ width: 35 }}>{item.icon}</View>
              <Text style={styles.txtItems}>{item.name}</Text>
            </View>
          </Pressable>
        </View>
      ))}
      <View>
        <View style={styles.itemLine} />
        <Pressable onPress={() => handleUpdateUser(userData)}>
          <View style={styles.item}>
            <View style={{ width: 35 }}>
              <FontAwesome5 name="user-cog" size={24} color={colors.primary} />
            </View>
            <Text style={styles.txtItems}>Cập nhật thông tin</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <View style={styles.itemLine} />
        <Pressable onPress={() => handleLogout()}>
          <View style={styles.item}>
            <View style={{ width: 35 }}>
              <SimpleLineIcons name="logout" size={24} color={colors.primary} />
            </View>
            <Text style={styles.txtItems}>Đăng xuất</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default AccountItem;

const styles = StyleSheet.create({
  itemLine: { width: "100%", borderWidth: 0.2, borderColor: "grey" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  txtItems: {
    color: colors.primary,
    textAlign: "center",
    fontSize: fontSizes.sz16,
    fontWeight: "700",
  },
});
