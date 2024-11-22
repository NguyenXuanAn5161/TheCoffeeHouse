import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CartItemCard from "@components/CartItemCard";
import { colors, fontSizes } from "@/styles/globalStyles";
import { Checkbox } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAllShoppingCart,
  removeCartItem,
  udpateQuantityCartItem,
} from "@/service/shoppingCart";
import Toast from "react-native-toast-message";
import CartItemCardSkeleton from "@/components/skeleton/CartItemCardSkeleton";

const ShoppingCart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

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
      await getShoppingCart(data.id);
    }
  };

  const getShoppingCart = async (userId) => {
    setLoading(true);
    try {
      const res = await getAllShoppingCart(userId);
      if (res.success) {
        setCartItems(res.data.items);
      }
    } catch (error) {
      console.log("Error file shopping cart: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsChecked(
      selectedItems.length === cartItems.length && cartItems.length > 0
    );
  }, [selectedItems, cartItems]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedItems]);

  const handleCheckItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      // Kiểm tra sản phẩm đã có trong mảng `selectedItems` chưa
      const isItemSelected = prevSelectedItems.find((i) => i.id === item.id);

      if (isItemSelected) {
        // Nếu sản phẩm đã được chọn, bỏ chọn bằng cách loại bỏ nó khỏi mảng
        return prevSelectedItems.filter((i) => i.id !== item.id);
      } else {
        // Nếu sản phẩm chưa được chọn, thêm nó vào mảng
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleSelectAll = () => {
    const allSelected = selectedItems.length === cartItems.length;
    if (allSelected) {
      // Nếu tất cả sản phẩm đã được chọn, bỏ chọn tất cả
      setSelectedItems([]);
      setIsChecked(false);
    } else {
      // Nếu chưa chọn tất cả, chọn toàn bộ sản phẩm
      setSelectedItems(cartItems);
      setIsChecked(true);
    }
  };

  // Handle removing an item
  const handleRemoveItem = async (cartItemId) => {
    setLoading(true);
    try {
      const res = await removeCartItem(user.id, cartItemId);
      console.log("check res: ", res.message);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: res.message,
        });
        // Loại bỏ sản phẩm ra khỏi mảng `selectedItems` nếu nó tồn tại
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((item) => item.id !== cartItemId)
        );
        await getShoppingCart(user.id);
      } else {
        Toast.show({
          type: "error",
          text1: "Thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file shopping cart: ", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    const total = selectedItems.reduce((sum, item) => {
      const price = parseInt(item.price);
      return sum + price * item.quantity;
    }, 0);

    setTotalPrice(total);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    // setLoading(true);
    try {
      // Cập nhật số lượng trong local state
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Cập nhật số lượng trong `selectedItems` nếu sản phẩm đã được chọn
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Gọi API cập nhật số lượng
      const res = await udpateQuantityCartItem(user.id, productId, newQuantity);
      if (!res.success) {
        Toast.show({
          type: "error",
          text1: "Cập nhật thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file shopping cart: ", error);
    } finally {
      // setLoading(false);
      calculateTotalPrice();
    }
  };

  const handleOrderPayment = () => {
    navigation.navigate("Payment", {
      selectedItems,
      resetSelectedItems: () => setSelectedItems([]), // truyền hàm reset
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <CartItemCardSkeleton />
        ) : (
          cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              product={item}
              isChecked={selectedItems.some((i) => i.id === item.id)} // Kiểm tra sản phẩm có trong mảng selectedItems không
              onCheck={() => handleCheckItem(item)}
              onRemove={() => handleRemoveItem(item.id)}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}
      </ScrollView>

      {/* Checkout Section */}
      <View style={styles.checkoutContainer}>
        {/* Select All Checkbox */}
        <TouchableOpacity
          onPress={() => handleSelectAll()}
          style={styles.checkboxWrapper}
        >
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            color={colors.primary}
            value={isChecked}
          />
          <Text style={styles.checkboxLabel}>Tất cả</Text>
        </TouchableOpacity>

        {/* Total Price and Checkout Button */}
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Text style={styles.totalPriceLabel}>Tổng tiền:</Text>
          <Text style={styles.totalPrice}>
            {totalPrice.toLocaleString("vi-VN")}đ
          </Text>
        </View>
        <TouchableOpacity
          disabled={selectedItems.length === 0 ? true : false}
          onPress={() => handleOrderPayment()}
          style={[
            styles.checkoutButton,
            {
              backgroundColor:
                selectedItems.length === 0 ? colors.greyBold : colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.checkoutButtonText,
              { color: selectedItems.length === 0 ? "#000" : colors.white },
            ]}
          >
            Đặt hàng
          </Text>
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
