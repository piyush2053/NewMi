import axios from "axios";
import { getToken, setToken } from "./function";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://NearWe-ccd3caa6gcetcaa5.centralindia-01.azurewebsites.net";
// const API_BASE_URL = 'http://NearWe-ccd3caa6gcetcaa5.centralindia-01.azurewebsites.net'

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
  getEventById: async (eventId: any) => {
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
  createMessage: async (messageData: {
    eventId: any;
    userId: any;
    messageText: any;
  }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${API_BASE_URL}/message`,
        messageData,
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

  // Update Message by ID
  updateMessage: async (
    messageId: string,
    messageData: {
      eventId: string;
      userId: string;
      messageText: string;
    }
  ) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${API_BASE_URL}/message/${messageId}`,
        messageData,
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

  // Get Messages By Event ID
  getMessagesByEvent: async (eventId: any) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${API_BASE_URL}/message/${eventId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  // Delete Message
  deleteMessage: async (messageId: string, userId: string) => {
    try {
      const token = getToken();
      const response = await axios.delete(
        `${API_BASE_URL}/message/${messageId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          data: { userId }, // DELETE with body
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getEventAttendees: async (eventId: any) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${API_BASE_URL}/event-attender/${eventId}`,
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
  addEventAttender: async ({
    eventId,
    userId,
  }: {
    eventId: any;
    userId: any;
  }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${API_BASE_URL}/event-attender`,
        { eventId, userId },
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
  getAlleventsJoinedbyUser: async (userId: string) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${API_BASE_URL}/event-attender/user/${userId}`,
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
  getParticipants: async (eventId: string) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${API_BASE_URL}/event-attender/${eventId}`,
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
  deleteEvent: async (eventId: string) => {
    try {
      const token = getToken();

      const response = await axios.delete(
        `${API_BASE_URL}/events/${eventId}`,
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
  getCategoryById: async (categoryId: string) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${API_BASE_URL}/event-category/${categoryId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
},

// Create Category
createCategory: async (data: {
  categoryName: string;
  categoryDesc: string;
}) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_BASE_URL}/event-category`,
      data,
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

// Update Category
updateCategory: async (
  categoryId: string,
  data: {
    categoryName: string;
    categoryDesc: string;
  }
) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${API_BASE_URL}/event-category/${categoryId}`,
      data,
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

// Delete Category
deleteCategory: async (categoryId: string) => {
  try {
    const token = getToken();
    const response = await axios.delete(
      `${API_BASE_URL}/event-category/${categoryId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
},
};
