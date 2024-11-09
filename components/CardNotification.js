import { colors } from "@/styles/globalStyles";
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const CardNotification = ({ title, description, date, image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default CardNotification;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.backgroundGrey,
    padding: 12,
    columnGap: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: colors.text,
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: colors.text,
  },
});
