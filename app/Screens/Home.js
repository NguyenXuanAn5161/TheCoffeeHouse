import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import CustomSearch from "@/components/CustomSearch";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";
import ProductCard from "@/components/ProductCart";
import CustomBanner from "@/components/CustomBanner";

const category = [
  {
    id: 1,
    name: "Coffee",
    img: require("@/assets/images/americano.png"),
  },
  {
    id: 2,
    name: "Cookies",
    img: require("@/assets/images/banhmi.png"),
  },
  {
    id: 3,
    name: "Chocolate",
    img: require("@/assets/images/chocolate.png"),
  },
];

const product = [
  {
    id: 1,
    img: require("@/assets/images/capuchino.png"),
    title: "Capuchino",
    price: "đ35.000",
    discount: "With chocolate and milk",
  },
  {
    id: 2,
    img: require("@/assets/images/americano.png"),
    title: "Americano",
    price: "đ35.000",
    discount: "With chocolate and milk",
  },
  {
    id: 3,
    img: require("@/assets/images/mocha.png"),
    title: "Mocha",
    price: "đ35.000",
    discount: "With chocolate and milk",
  },
  {
    id: 4,
    img: require("@/assets/images/vanilla.png"),
    title: "Vanilla",
    price: "đ35.000",
    discount: "With chocolate and milk",
  },
];

export default function Home({ navigation }) {
  const [dataCategory, setDataCategory] = useState(category);
  const [dataProduct, setDataProduct] = useState(product);

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
          <CustomBanner />

          <View>
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
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                rowGap: 5,
              }}
            >
              {dataProduct.map((item, index) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onPress={() => handleProductPress(item.id)}
                  onAdd={() => handleAddToCart(item.id)}
                />
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
});
