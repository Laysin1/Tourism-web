import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Authentication API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    location?: string;
    bio?: string;
  }) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/login", credentials);
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    localStorage.removeItem("auth_token");
    return response.data;
  },

  getUser: async () => {
    const response = await api.get("/user");
    return response.data;
  },

  updateProfile: async (userData: {
    name?: string;
    email?: string;
    location?: string;
    bio?: string;
  }) => {
    const response = await api.put("/user/profile", userData);
    return response.data;
  },
};

// Destinations API
export const destinationsAPI = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    sort_by?: string;
    sort_direction?: "asc" | "desc";
    page?: number;
    per_page?: number;
  }) => {
    const response = await api.get("/destinations", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  },

  create: async (destinationData: {
    name: string;
    description: string;
    location: string;
    price: number;
    category_id: number;
    images: string[];
  }) => {
    const response = await api.post("/destinations", destinationData);
    return response.data;
  },

  update: async (
    id: string,
    destinationData: {
      name?: string;
      description?: string;
      location?: string;
      price?: number;
      category_id?: number;
      images?: string[];
    },
  ) => {
    const response = await api.put(`/destinations/${id}`, destinationData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  getDestinations: async (id: string, page = 1, perPage = 12) => {
    const response = await api.get(`/categories/${id}/destinations`, {
      params: { page, per_page: perPage },
    });
    return response.data;
  },

  create: async (categoryData: {
    name: string;
    description: string;
    image: string;
  }) => {
    const response = await api.post("/categories", categoryData);
    return response.data;
  },

  update: async (
    id: string,
    categoryData: {
      name?: string;
      description?: string;
      image?: string;
    },
  ) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

// Reviews API
export const reviewsAPI = {
  getByDestination: async (destinationId: string) => {
    const response = await api.get(`/destinations/${destinationId}/reviews`);
    return response.data;
  },

  getUserReviews: async () => {
    const response = await api.get("/user/reviews");
    return response.data;
  },

  create: async (
    destinationId: string,
    reviewData: {
      rating: number;
      comment: string;
      images?: string[];
    },
  ) => {
    const response = await api.post(
      `/destinations/${destinationId}/reviews`,
      reviewData,
    );
    return response.data;
  },

  update: async (
    reviewId: string,
    reviewData: {
      rating?: number;
      comment?: string;
      images?: string[];
    },
  ) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  delete: async (reviewId: string) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};

// Favorites API
export const favoritesAPI = {
  getUserFavorites: async () => {
    const response = await api.get("/user/favorites");
    return response.data;
  },

  addFavorite: async (destinationId: string) => {
    const response = await api.post("/user/favorites", {
      destination_id: destinationId,
    });
    return response.data;
  },

  removeFavorite: async (destinationId: string) => {
    const response = await api.delete(`/user/favorites/${destinationId}`);
    return response.data;
  },

  toggleFavorite: async (destinationId: string) => {
    const response = await api.post(`/destinations/${destinationId}/favorite`);
    return response.data;
  },
};

export default api;
