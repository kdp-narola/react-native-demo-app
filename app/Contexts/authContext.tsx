// Contexts/authContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export type AuthType = {
  userData: { username?: string } | null;
  setUserData: (data: { username?: string } | null) => void;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserDataState] = useState<{ username?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // load persisted login
  useEffect(() => {
    (async () => {
      const storedEmail = await AsyncStorage.getItem("username");
      if (storedEmail) {
        setUserDataState({ username: storedEmail });
      }
      setLoading(false);
    })();
  }, []);

  const setUserData = async (data: { username?: string } | null) => {
    setUserDataState(data);
    if (data?.username) {
      await AsyncStorage.setItem("username", data.username);
      await AsyncStorage.setItem("isLoggedIn", "true");
    } else {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("isLoggedIn");
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
