import logoCoffee from "@/assets/images/TheCoffeHouse.png";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { fontSizes, globalStyles } from "@/styles/globalStyles";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = ({ navigation }) => {
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.centered, { flex: 1 }]}>
        <Image source={logoCoffee} style={globalStyles.logo} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.viewInput}
      >
        <CustomInput placeholder={"Tài khoản"} />
        <CustomInput placeholder={"Mật khẩu"} secureTextEntry={true} />
        <CustomButton title={"Đăng nhập"} onPress={()=>navigation.navigate('Home')}/>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={[globalStyles.inputText, { fontSize: fontSizes.small }]}>
            Bạn chưa có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => handleRegister()}>
            <Text
              style={[
                globalStyles.inputText,
                { fontSize: fontSizes.small, fontWeight: "700" },
              ]}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewInput: {
    marginTop: "30%",
    flex: 2,
    gap: 30,
    alignItems: "center",
  },
});
