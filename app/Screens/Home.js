import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import CustomSearch from "@/components/CustomSearch";
import React, { useEffect, useState } from "react";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";
import ProductCard from "@/components/ProductCard";
import CustomBanner from "@/components/CustomBanner";
import { getAllProduct } from "@/service/product";
import { addShoppingCart } from "@/service/shoppingCart";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const category = [
  {
    id: 1,
    name: "Coffee",
    img: require("@/assets/images/americano.png"),
  },
  {
    id: 2,
    name: "Food",
    img: require("@/assets/images/banhmi.png"),
  },
  {
    id: 3,
    name: "Chocolate",
    img: require("@/assets/images/chocolate.png"),
  },
];

export default function Home({ navigation }) {
  const [dataCategory, setDataCategory] = useState(category);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProduct();
      console.log("data: ", res.data);
      if (res.success) {
        setProduct(res.data);
      }
    } catch (error) {
      console.log("Error file Home: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    setLoading(true);
    try {
      const res = await addShoppingCart(user.id, productId, "S", "1");
      console.log("data: ", res.data);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: res.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file Home", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (id) => {
    navigation.navigate("ProductDetail", { id });
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ alignItems: "center" }}>
          <CustomSearch />
        </View>
        <View style={styles.mainContent}>
          <View style={{ flex: 1 / 3 }}>
            <CustomBanner />
          </View>

          <View style={{ flex: 2 / 3 }}>
            <ScrollView
              contentContainerStyle={styles.categoryScroll}
              horizontal
            >
              {dataCategory.map((item, index) => (
                <View key={index}>
                  <Pressable
                    onPress={() => navigation.navigate("Product")}
                    style={styles.category}
                  >
                    <Image source={item.img} style={styles.img_cate} />
                  </Pressable>
                  <Text style={styles.name_cate}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View>
            <Text style={styles.text_title_product}>Sản phẩm mới</Text>

            <View style={styles.viewProduct}>
              {product.map((item, index) => (
                <View key={item.id} style={{ width: "45%" }}>
                  <ProductCard
                    product={item}
                    onPress={() => handleProductPress(item.id)}
                    onAdd={() => handleAddToCart(item.id)}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: colors.background,
    marginBottom: "5%",
  },
  categoryScroll: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  category: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  img_cate: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 5,
  },
  name_cate: {
    color: colors.primary,
    textAlign: "center",
    fontSize: fontSizes.sz15,
    fontWeight: "700",
    marginLeft: -10,
  },
  text_title_product: {
    fontSize: fontSizes.sz18,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  viewProduct: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 5,
  },
});
