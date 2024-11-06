import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput, FlatList } from 'react-native';
import CustomFooter_Home from '@/components/CustomFooter_Home';
import CustomHeader from '@/components/CustomHeader';
import CustomSearch from '@/components/CustomSearch';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

const category =[
    {
      id: 1,
      name: 'Coffee',
      img:require('@/assets/images/americano.png')
    },
    {
      id: 2,
      name: 'Cookies',
      img:require('@/assets/images/banhmi.png')
    },
    {
      id: 3,
      name: 'Chocolate',
      img:require('@/assets/images/chocolate.png')
    },
  ]

  const product =[
    { 
      id: 1,
      img: require('@/assets/images/capuchino.png'),
      title: "Capuchino",
      price: 'đ35.000',
      discount: 'With chocolate and milk',    
    },
    { 
      id: 2,
      img: require('@/assets/images/americano.png'),
      title: "Americano",
      price: 'đ35.000',
      discount: 'With chocolate and milk',
     
    },
    { 
      id: 3,
      img: require('@/assets/images/mocha.png'),
      title: "Mocha",
      price: 'đ35.000',
      discount: 'With chocolate and milk',
     
    },
    { 
      id: 4,
      img: require('@/assets/images/vanilla.png'),
      title: "Vanilla",
      price: 'đ35.000',
      discount: 'With chocolate and milk',
     
    },
    
  ]
export default function Home({navigation}) {
  const [dataCategory, setDataCategory]= useState(category);
  const [dataProduct, setDataProduct]= useState(product);
 
  return (
    <View style={styles.container}>
      <View>
         <CustomHeader/>
      </View>

      <View>
        <CustomSearch/>
      </View>
      <View>
        <ScrollView style={styles.content} contentContainerStyle={{flexGrow: 1}} scrollEnabled={true}>
          <View style={styles.banner}>
              <Image source={require('@/assets/images/banner1.png')} style={styles.img_banner}/>
              <View style={styles.circle}>
                  <FontAwesome name="circle" size={15} color="#834637" style={{marginRight:5}} />
                  <FontAwesome name="circle" size={15} color="grey" style={{marginRight:5}} />
                  <FontAwesome name="circle" size={15} color="grey" />
              </View>
          </View>
          
          <View>
              <ScrollView horizontal>
                  {dataCategory.map((item, index) => (
                      <View key={index} style={{justifyContent:'space-around', alignItems: 'center'}}>
                          <Pressable onPress={()=> navigation.navigate('Product')} style={styles.category}>
                              <Image source={item.img} style={styles.img_cate}/>
                          </Pressable>
                          <Text style={styles.name_cate}>{item.name}</Text>                        
                      </View>
                  ))}
              </ScrollView>
          </View>
          
          <View>
              <Text style={styles.text_title_product}>Sản phẩm mới</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                  {dataProduct.map((item, index) => (
                      <View key={index} style={styles.new_product}>
                          <Pressable onPress={()=> navigation.navigate('ProductDetail')} style={styles.product}>
                              <Image source={item.img} style={styles.img_product}/>
                              <View style={styles.info_product}>
                                  <Text style={styles.title_product}>{item.title}</Text>
                                  <Text style={styles.discount_product}>{item.discount}</Text>
                                  <Text style={styles.price_product}>{item.price}</Text>
                              </View>
                          </Pressable>
                          <Pressable style={styles.btn_add}>
                              <FontAwesome5 name="plus" size={18} color="white" style={styles.icon_plus} />
                          </Pressable>
                      </View>
                  ))}
              </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>      
        <CustomFooter_Home/>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:'100%',
    backgroundColor: '#fff',
  },
  content: {
    // flex: 1,
    height: '60%',
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  banner: {
    marginTop: 20,
    borderRadius: 5,
    width: '95%',
    alignSelf: 'center',
  },
  img_banner: {
    resizeMode: 'contain',
    height: 200,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  category: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#834637',
    marginLeft: 10,
    marginRight: 20,
  },
  img_cate: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 5,
  },
  name_cate: {
    color: '#834637',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: -10,
  },
  text_title_product: {
    fontSize: 18,
    color: '#834637',
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  new_product: {
    width: '45%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#834637',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  product: {
    alignItems: 'center',
  },
  img_product: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  info_product: {
    alignItems: 'center',
    marginTop: 10,
  },
  title_product: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#834637',
    textAlign: 'center',
  },
  discount_product: {
    fontSize: 13,
    color: '#6d6d6d',
    marginTop: 5,
    textAlign: 'center',
  },
  price_product: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#834637',
    textAlign: 'center',
    marginTop: 5,
  },
  btn_add: {
    width: 40,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#834637',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon_plus: {
    fontSize: 18,
    color: '#fff',
  },
  

  footer: {
    // marginRight: 100
  },

});
