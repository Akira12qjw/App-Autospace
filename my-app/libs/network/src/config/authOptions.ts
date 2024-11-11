import JWT from "react-native-pure-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MAX_AGE = 1 * 24 * 60 * 60; // 1 day in seconds

export const authOptions = {
  async signToken(payload: any): Promise<string> {
    try {
      const token = await JWT.sign(
        payload,
        process.env.JWT_SECRET || "your-secret-key",
        {
          alg: "HS256",
          exp: Math.floor(Date.now() / 1000) + MAX_AGE,
        }
      );
      return token;
    } catch (error) {
      console.error("Error signing token:", error);
      throw error;
    }
  },

  async verifyToken(token: string) {
    try {
      const decoded = await JWT.sign(
        token,
        process.env.JWT_SECRET || "your-secret-key",
        {
          alg: "HS256",
        }
      );
      return decoded.payload;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  },

  async saveToken(token: string) {
    try {
      await AsyncStorage.setItem("@auth_token", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  },

  async getToken() {
    try {
      return await AsyncStorage.getItem("@auth_token");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  async removeToken() {
    try {
      await AsyncStorage.removeItem("@auth_token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },
};
