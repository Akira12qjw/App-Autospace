import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useNavigation } from "expo-router";
export default function register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        clearButtonMode="while-editing"
        textContentType="emailAddress"
        autoComplete="email"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập tên tài khoản"
        keyboardType="default" // Đảm bảo sử dụng bàn phím mặc định
        autoCapitalize="none"
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Đã có tài khoản?{" "}
          <Link style={styles.link} href="/login">
            Đăng nhập ngay
          </Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 17,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ffd700",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  link: {
    color: "#ffd700",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
