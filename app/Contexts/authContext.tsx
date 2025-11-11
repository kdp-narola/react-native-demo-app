import api from "@/src/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface User {
  id?: string;
  username?: string;
  email?: string;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>; // 👈 new helper to call /auth/me manually if needed
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        if (savedToken) {
          api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
          setToken(savedToken);
          await fetchUser();
        }
      } catch (err) {
        console.log("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data?.user);
      await AsyncStorage.setItem("user", JSON.stringify(response.data?.user));
    } catch (err) {
      console.log("Failed to fetch user:", err);
      await logout();
    }
  };

  const refreshUser = async () => {
    return await fetchUser();
  };

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data?.user;

    setToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem("token", token);

    await fetchUser();
  };

  const signup = async (data: { username: string; email: string; password: string }) => {
    const response = await api.post("/auth/register", data);
    const { token } = response.data?.user;

    setToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem("token", token);

    await fetchUser();
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.multiRemove(["token", "user", "selectedCategory"]);
  };

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
