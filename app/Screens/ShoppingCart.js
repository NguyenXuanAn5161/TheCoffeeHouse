import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import CartItemCard from "@components/CartItemCard";
import { colors, fontSizes } from "@/styles/globalStyles";
import { Checkbox } from "react-native-paper";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 4,
      img: require("@/assets/images/vanilla.png"),
      title: "Vanilla",
      price: "đ35.000",
      selectedSize: "M",
    },
    {
      id: 5,
      img: require("@/assets/images/chocolate.png"),
      title: "Chocolate",
      price: "đ40.000",
      selectedSize: "L",
    },
  ]);

  const [isChecked, setIsChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  // Handle individual item checkbox change
  const handleCheckItem = (id) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Handle "Select All" checkbox change
  const handleSelectAll = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    // Update selectedItems for all cart items
    const updatedSelectedItems = cartItems.reduce((acc, item) => {
      acc[item.id] = newCheckedStatus;
      return acc;
    }, {});
    setSelectedItems(updatedSelectedItems);
  };

  // Handle removing an item
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            product={item}
            isChecked={selectedItems[item.id]}
            onCheck={() => handleCheckItem(item.id)}
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </ScrollView>

      {/* Checkout Section */}
      <View style={styles.checkoutContainer}>
        {/* Select All Checkbox */}
        <TouchableOpacity
          onPress={() => handleSelectAll()}
          style={styles.checkboxWrapper}
        >
          <Checkbox
            status={
              Object.values(selectedItems).every((val) => val)
                ? "checked"
                : "unchecked"
            }
            color={colors.primary}
            value={isChecked}
          />
          <Text style={styles.checkboxLabel}>Tất cả</Text>
        </TouchableOpacity>

        {/* Total Price and Checkout Button */}
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Text style={styles.totalPriceLabel}>Tổng tiền:</Text>
          <Text style={styles.totalPrice}>50000đ</Text>
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert("Success", "Mua thành công!")}
          style={styles.checkoutButton}
        >
          <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // Avoid overlap with checkout button
  },
  checkoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundGrey,
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPrice: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: fontSizes.sz16,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShoppingCart;
