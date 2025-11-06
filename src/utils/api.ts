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
  
  // Get All Events
  getAllEvents: async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/events`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Create Event
  createEvent: async (eventData: {
    eventTitle: string;
    eventDesc: string;
    categoryId: string;
    location: string;
    userId: string;
    eventTime: string;
  }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_BASE_URL}/events`, eventData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Update Event by ID
  updateEvent: async (
    eventId: string,
    eventData: {
      eventTitle: string;
      eventDesc: string;
      categoryId: string;
      location: string;
      userId: string;
      eventTime: string;
    }
  ) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${API_BASE_URL}/events/${eventId}`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Get Event by ID
  getEventById: async (eventId: string) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/events/${eventId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getCategories: async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_BASE_URL}/event-category`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};
