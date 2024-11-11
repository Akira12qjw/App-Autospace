import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFormLogin } from "@/libs/forms/src/login";
import { Form } from "@/libs/ui/src/components/atoms/Form";
import { Link, useRouter } from "expo-router";
import SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { signIn } from "next-auth/react";
import { HtmlLabel } from "@/libs/ui/src/components/atoms/HtmlLabel";
import { HtmlInput } from "@/libs/ui/src/components/atoms/HtmlInput";
import { ILoginFormProps } from "@/libs/ui/src/components/templates/LoginForm";
// import { signIn } from "@/service/authService";

export default function Login({ className }: ILoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: { message?: string };
    password?: { message?: string };
  }>({});

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({
          email: { message: "Email hoặc mật khẩu không chính xác" },
        });
      } else {
        console.log("success");
        // Redirect sau khi đăng nhập thành công
        router.push("/search");
      }
    } catch (error) {
      setErrors({
        email: { message: "Có lỗi xảy ra, vui lòng thử lại" },
      });
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Chưa có tài khoản?</Text>
        <Pressable
          onPress={() => {
            // Handle navigation here
            router.navigate("/register");
          }}
        >
          <Text style={styles.link}>Đăng Ký</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 17,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  errorSummary: {
    color: "#666",
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 17,
    color: "#666",
  },
  link: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    textDecorationLine: "underline",
    marginTop: 4,
  },
});
