// Contexts/authContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export type AuthType = {
  userData: { email?: string } | null;
  setUserData: (data: { email?: string } | null) => void;
};

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserDataState] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // load persisted login
  useEffect(() => {
    (async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) {
        setUserDataState({ email: storedEmail });
      }
      setLoading(false);
    })();
  }, []);

  const setUserData = async (data: { email?: string } | null) => {
    setUserDataState(data);
    if (data?.email) {
      await AsyncStorage.setItem("userEmail", data.email);
      await AsyncStorage.setItem("isLoggedIn", "true");
    } else {
      await AsyncStorage.removeItem("userEmail");
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
