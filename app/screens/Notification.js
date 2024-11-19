import { colors } from "@/styles/globalStyles";
import CardNotification from "@components/CardNotification";
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

// Dữ liệu mẫu với ngày và hình ảnh
const notifications = [
  {
    id: "1",
    title: "Thông báo 1",
    description: "Đây là thông báo đầu tiên.",
    date: "2024-11-09",
    image: require("@/assets/images/mocha.png"),
  },
  {
    id: "2",
    title: "Thông báo 2",
    description: "Đây là thông báo thứ hai.",
    date: "2024-11-08",
    image: require("@/assets/images/mocha.png"),
  },
  {
    id: "3",
    title: "Thông báo 3",
    description: "Đây là thông báo thứ ba.",
    date: "2024-11-07",
    image: require("@/assets/images/mocha.png"),
  },
];

export default function Notification({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: colors.backgroundGrey }}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <CardNotification
              title={item.title}
              description={item.description}
              date={item.date}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: colors.white,
  },
});
