// components/CustomButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CustomFooter_Product = ({navigation}) => (
  <View>
    <View style={styles.footer1}>
      <View style={styles.footer2}>
        <Pressable style={styles.btn} onPress={()=>navigation.navigate('Home')}>
            <FontAwesome name="home" size={40} color="white" style={{alignSelf:'center'}} />
            <Text style={styles.text_footer}>Trang chủ</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={()=>navigation.navigate('Product')}>
            <View style={styles.circle_footer}>
                <Image style={styles.img_coffee_ft} source={require('@/assets/images/icon_ly_cafe2.png')}/>
            </View> 
            <Text style={styles.text_footer}>Coffee</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={()=>navigation.navigate('Notification')}>
          <MaterialIcons name="notifications-none" size={40} color="white" style={{alignSelf:'center'}}/>
          <Text style={styles.text_footer}>Thông báo</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={()=>navigation.navigate('Account')}>
          <MaterialCommunityIcons name="account" size={40} color="white" style={{alignSelf:'center'}} />  
          <Text style={styles.text_footer}>Tài khoản</Text>
        </Pressable>
      </View>           
    </View>
  
  </View>
  

  
);

const styles = StyleSheet.create({
    footer1:{
        flexDirection:'row',
        width:'100%',
        height: 100,
    
    
    },
    footer2:{
        flexDirection:'row',
        backgroundColor:'#834637',
        height: 80,
        width:'100%',
        marginTop: 25,
        justifyContent:'space-around'
    },
    btn:{
        marginLeft: 10,
        marginTop: 5,
        marginRight: 10
    },
    img_coffee_ft:{
        width: 40,
        height: 40,
        resizeMode:'contain',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignSelf:'center'
    },
    text_footer:{
        color:'white',
        fontWeight:'bold',
        marginTop: 5,
        textAlign: 'center'
    },
    circle_footer:{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginTop: -40
    },
});

export default CustomFooter_Product;