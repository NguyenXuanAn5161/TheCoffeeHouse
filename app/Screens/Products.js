import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSearch from "@/components/CustomSearch";
import { colors, globalStyles } from "@/styles/globalStyles";
import ProductCard from "@/components/ProductCard";
import { getAllProduct } from "@/service/product";

const category = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Food" },
];

// const product = [
//   {
//     id: 1,
//     img: require("@/assets/images/capuchino.png"),
//     title: "Capuchino",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 1,
//   },
//   {
//     id: 2,
//     img: require("@/assets/images/americano.png"),
//     title: "Americano",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 1,
//   },
//   {
//     id: 3,
//     img: require("@/assets/images/mocha.png"),
//     title: "Mocha",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 1,
//   },
//   {
//     id: 4,
//     img: require("@/assets/images/vanilla.png"),
//     title: "Vanilla",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 1,
//   },
//   {
//     id: 5,
//     img: require("@/assets/images/vanilla.png"),
//     title: "Vanilla",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 1,
//   },
//   {
//     id: 6,
//     img: require("@/assets/images/vanilla.png"),
//     title: "Vanilla",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 1,
//   },
//   {
//     id: 7,
//     img: require("@/assets/images/banhmi.png"),
//     title: "Bánh mì",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 2,
//   },
//   {
//     id: 8,
//     img: require("@/assets/images/banh-mi-sung-bo.png"),
//     title: "Bánh mì",
//     price: "đ35.000",
//     discount: "With chocolate and milk",
//     categoryId: 2,
//   },
// ];

const Products = ({ navigation }) => {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category[0].name);
  const [loadding, setLoadding] = useState(false);

  const handleProductPress = (id) => {
    navigation.navigate("ProductDetail", { id });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("product useState: ", product);
  }, [product]);

  const getProducts = async () => {
    setLoadding(true);
    try {
      const res = await getAllProduct();
      console.log("data: ", res.data);
      if (res.success) {
        setProduct(res.data);
      }
    } catch (error) {
      console.log("Error file Product: ", error);
    } finally {
      setLoadding(false);
    }
  };

  const handleAddToCart = (id) => {
    Alert.alert("Success", "Thêm vào giỏ hàng thành công!");
    navigation.navigate("ShoppingCart", { id });
  };

  const handleCategoryPress = (id) => {
    setSelectedCategory(id);
  };

  // Lọc sản phẩm dựa trên category được chọn
  const filteredProducts = product.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={globalStyles.centered}>
          <CustomSearch />
        </View>
        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={styles.categoryScroll} horizontal>
            {category.map((item) => {
              const isSelected = selectedCategory === item.name;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => handleCategoryPress(item.name)}
                  style={[
                    styles.category,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.name_cate,
                      { color: isSelected ? colors.white : colors.primary },
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.productGrid}>
            {filteredProducts.map((item) => (
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
      </ScrollView>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContent: {
    // flex: 1,
    backgroundColor: colors.background,
    marginBottom: "5%",
  },
  categoryScroll: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  category: {
    backgroundColor: colors.primary,
    width: 185,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  name_cate: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
    rowGap: 5,
  },
});
