import { FlatList, StyleSheet } from "react-native";
import React from "react";
import HistoryOrderCard from "@/components/HistoryOrderCard";

const Processing = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

export default Processing;

const styles = StyleSheet.create({});
