import logoCoffee from "@/assets/images/TheCoffeHouse.png";
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
    <View style={styles.container}>
      <View style={styles.viewLogo}>
        <Image source={logoCoffee} style={styles.logo} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.viewInput}
      >
        <TextInput
          style={[styles.input, styles.txtInput]}
          placeholder="Tài khoản"
        />
        <TextInput
          style={[styles.input, styles.txtInput]}
          placeholder="Mật khẩu"
        />
        <View style={styles.viewBtn}>
          <TouchableOpacity onPress={() => {}} style={styles.btn}>
            <Text style={styles.txtBtn}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={[styles.txtInput, { fontSize: 17 }]}>
              Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity onPress={() => handleRegister()}>
              <Text
                style={[styles.txtInput, { fontSize: 17, fontWeight: "700" }]}
              >
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E2E2",
  },
  viewLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: "10%",
    height: "90%",
    width: "90%",
    resizeMode: "contain",
  },
  viewInput: {
    marginTop: "30%",
    flex: 2,
    gap: 30,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "90%",
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  txtInput: { fontSize: 20, fontWeight: "400", color: "#834637" },
  txtBtn: {
    fontSize: 26,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#ffffff",
  },
  viewBtn: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    backgroundColor: "#834637",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "90%",
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "#834637",
  },
});
