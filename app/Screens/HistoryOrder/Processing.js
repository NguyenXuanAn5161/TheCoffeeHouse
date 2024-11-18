import { FlatList, StyleSheet } from "react-native";
import React from "react";
import HistoryOrderCard from "@/components/HistoryOrderCard";

const Processing = ({ processingData }) => {
  return (
    <FlatList
      data={processingData}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

export default Processing;

const styles = StyleSheet.create({});
