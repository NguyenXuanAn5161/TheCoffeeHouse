import React, { useState, useMemo, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Provider } from "react-native-paper";
import { globalStyles, colors, fontSizes } from "@/styles/globalStyles";
import CartItemPayment from "@components/CartItemPayment";
import FeeCard from "@components/FeeCard";
import OrderDetail from "@components/OrderDetail";
import PaymentMethodDialog from "@components/PaymentMethodDialog";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { order } from "@/service/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const paymentMethods = ["Tiền mặt", "Chuyển khoản", "Ví điện tử"];
const SHIPPING_FEE = 0;

const Payment = ({ navigation, route }) => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);
      setUser(data);
    }
  };

  const { selectedItems } = route.params;

  const orderData = (data) => {
    const objOutput = data.map((item) => {
      return {
        cartItemId: item.id,
        paymentMethod: "CASH_ON_DELIVERY",
      };
    });

    return objOutput;
  };

  const totalPrice = useMemo(
    () =>
      selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems]
  );
  const totalWithShipping = totalPrice + SHIPPING_FEE;

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    hideDialog();
  };

  const handleOrder = async () => {
    // check method payment
    if (selectedMethod !== "Tiền mặt") {
      Toast.show({
        type: "info",
        text1: "Thông báo",
        text2: "Chưa hỗ trợ phương thức thanh toán này!",
      });
      return;
    }

    const data = orderData(selectedItems);
    setLoading(true);
    try {
      const res = await order(user.id, data);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: res.message,
        });
        navigation.navigate("Home");
      } else {
        Toast.show({
          type: "error",
          text1: "Thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file payment: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Provider>
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 16 }}
        >
          <View style={{ rowGap: 10, marginTop: 10 }}>
            {selectedItems.map((item) => (
              <CartItemPayment key={item.id} item={item} />
            ))}
            <FeeCard fee={SHIPPING_FEE} label="Phí giao hàng" />

            <View style={[globalStyles.shadow, styles.noteContainer]}>
              <Text style={styles.noteText}>Ghi chú cho người bán:</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Nhập ghi chú (tuỳ chọn)"
                value={note}
                onChangeText={setNote}
              />
            </View>

            <OrderDetail
              totalPrice={totalPrice}
              shippingFee={SHIPPING_FEE}
              totalWithShipping={totalWithShipping}
            />
            <View style={styles.paymentMethods}>
              <Text style={styles.paymentMethodText}>
                Phương thức thanh toán:
              </Text>
              <TouchableOpacity style={styles.btnPayment} onPress={showDialog}>
                <Text style={styles.paymentMethodText}>{selectedMethod}</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <CustomButton
              loading={loading}
              title="Đặt hàng"
              onPress={() => handleOrder()}
            />
          </View>
        </ScrollView>

        <PaymentMethodDialog
          visible={visible}
          hideDialog={hideDialog}
          handleSelect={handleSelect}
          paymentMethods={paymentMethods}
        />
      </View>
    </Provider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  noteContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.pinkLight,
    borderRadius: 8,
    padding: 16,
  },
  paymentMethodText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: fontSizes.sz16,
  },
  btnPayment: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    columnGap: 5,
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    fontSize: fontSizes.medium,
    color: colors.white,
    fontWeight: "700",
  },
  noteText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "700",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
});
