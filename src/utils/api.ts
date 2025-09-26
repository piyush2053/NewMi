import axios from "axios";
import { getToken, setToken } from "./function";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5789"

export const core_services = {
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
            "X-API-Key": "",
          },
        }
      );
      const token = response.data.token;
      if (token) {
        setToken(token)
      }
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  registerUser: async ({
    name,
    age,
    email,
    password,
  }: {
    name: string;
    age: number;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        {
          name,
          age,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": "",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getUserData: async ({ id }: { id: string }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found !.");
      }

      const response = await axios.post(
        `${API_BASE_URL}/users/${id}`, // ID path me ja raha hai
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  getUserDataByEmail: async ({ email }: { email: string }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found !.");
      }

      const response = await axios.post(
        `${API_BASE_URL}/users/by-email`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getDepositList: async () => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found !.");
      }

      const response = await axios.get(
        `${API_BASE_URL}/users/transactions/depositList`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  getWithdrawList: async () => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found !.");
      }

      const response = await axios.get(
        `${API_BASE_URL}/users/transactions/withdrawList`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  depositAmount: async ({ amount }: { amount: number }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found.");
      }

      const response = await axios.post(
        `${API_BASE_URL}/users/transactions/deposit`,
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  withdrawAmount: async ({ ppoints }: { ppoints: number }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found.");
      }

      const response = await axios.post(
        `${API_BASE_URL}/users/transactions/withdraw`,
        { ppoints },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  getPredictPlusMatches: async () => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found!");
      }

      const response = await axios.get(
        `${API_BASE_URL}/games/getPredictPlusMatches`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  getAllBetsByUser: async ({ userId }: { userId: string }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found!");
      }

      const response = await axios.get(
        `${API_BASE_URL}/bets/all-by-users`,
        {
          params: { userId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
