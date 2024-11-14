import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountItem from "@/components/AccountItem";
import { useFocusEffect } from "@react-navigation/native";

const data = [
  { id: 1, name: "Đã xác nhận", img: require("@/assets/images/hoa_don.png") },
  {
    id: 2,
    name: "Đang xử lý",
    img: require("@/assets/images/ly_nuoc_dong_goi.png"),
  },
  { id: 3, name: "Đang giao", img: require("@/assets/images/shipper.png") },
];

export default function Account({ navigation }) {
  const [user, setUser] = useState();

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);
      setUser(data);
      console.log("Thông tin người dùng: ", data);
    }
  };

  const handleUpdateUser = (user) => {
    navigation.navigate("UpdateUser", { user });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ rowGap: 15 }}>
        <View style={styles.header}>
          <View style={styles.divider} />
          <View>
            {!user?.fullName ? (
              <Pressable onPress={() => handleUpdateUser(user)}>
                <Text style={styles.txtUpdate}>Cập nhật thông tin</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => handleUpdateUser(user)}>
                <Text style={[styles.txtTitle, { fontSize: fontSizes.medium }]}>
                  {user?.fullName ?? "Cập nhật"}
                </Text>
                <Text style={[styles.txtTitle, { fontWeight: "400" }]}>
                  {user?.phoneNumber}
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        <View style={styles.historySection}>
          <Foundation name="clipboard-notes" size={26} color={colors.primary} />
          <Text style={styles.txtTitle}>Lịch sử đơn hàng</Text>
        </View>

        <View style={styles.viewHistory}>
          {data.map((item, index) => (
            <View key={item.id} style={[styles.category, globalStyles.shadow]}>
              <Pressable
                onPress={() =>
                  item?.navigate && navigation.navigate(item.navigate)
                }
              >
                <Image source={item.img} style={styles.img_cate} />
              </Pressable>
              <Text style={styles.name_cate}>{item.name}</Text>
            </View>
          ))}
        </View>

        <View style={{ flex: 1, rowGap: 5 }}>
          <AccountItem userData={user} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    marginLeft: 30,
    marginTop: 10,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  divider: {
    height: 50,
    width: 1,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  historySection: {
    marginLeft: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  txtTitle: {
    fontSize: fontSizes.sz18,
    color: colors.primary,
    fontWeight: "bold",
  },
  viewHistory: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  category: {
    width: 100,
    height: 120,
    borderRadius: 5,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  img_cate: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },
  name_cate: {
    color: colors.primary,
    textAlign: "center",
    fontSize: fontSizes.sz14,
    fontWeight: "700",
  },
  txtUpdate: { color: colors.danger, fontSize: fontSizes.sz16 },
});
