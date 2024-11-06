import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomHeader from '@/components/CustomHeader';
import CustomSearch from '@/components/CustomSearch';
import CustomFooter_Product from '@/components/CustomFooter_Product';
// import CustomFooter_Home from '@/components/CustomFooter_Home';
// import CustomFooter_Account from '@/components/CustomFooter_Account';
// import CustomFooter_Notification from '@/components/CustomFooter_Notification';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Payment() {
  return (
    <View style={styles.container}>
      <View>
        <CustomHeader/>
      </View>
      <View>
        <CustomSearch/>
      </View>

      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
 
  },
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
  },
  text_footer:{
    color:'white',
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
