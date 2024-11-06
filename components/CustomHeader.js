// components/CustomButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, Pressable, Image, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


const CustomHeader = ({navigation}) => (
  <View style={styles.header}>
    <Image source={require('@/assets/images/avata1.png')} style={styles.avata}/>
    <View style={styles.address}>
      <AntDesign name="enviroment" size={24} color="#834637" style={styles.icon_address}/>
      <Text style={styles.text_address}>123D, Hồ Chí Minh</Text>   
    </View>
    <Pressable onPress={()=> navigation.navigate('ShoppingCart')}>
      <FontAwesome5 name="shopping-cart" size={24} color="#834637" style={styles.shopping_card}/>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    justifyContent:"space-around",
    alignItems:'center',
    marginTop: 25
  },
  avata:{
    resizeMode:'contain',
    height: 50, 
    width: 50,
    borderRadius: 25,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 2,
  },
  address:{
    flexDirection:'row',
    width: 200,
    height: 35,
    backgroundColor:'#D9D9D9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  icon_address:{
    shadowColor: '#f1f1f1',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  text_address:{
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#834637'
  },

  shopping_card:{
    shadowColor: '#f4f4f4',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CustomHeader;
