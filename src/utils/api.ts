import axios from "axios";
import { getToken, setToken } from "./function";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5010";

export const core_services = {
  // Login API
  loginUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      if (token) {
        setToken(token);
      }

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Register API
  registerUser: async ({
    username,
    email,
    password,
    location,
  }: {
    username: string;
    email: string;
    password: string;
    location: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        {
          username,
          email,
          password,
          location,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
