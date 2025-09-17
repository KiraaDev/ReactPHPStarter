import { createContext, useContext, type ReactNode, useState } from "react";
import axios from "axios";
import api from "../config/api";

type AuthContextProps = {
  login: (email: string, password: string) => Promise<void>;
  errorMessage: string | null;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const login = async (email: string, password: string) => {

    setErrorMessage(null);
    
    if (!email || !password) {
      return setErrorMessage("Email and Password are required");
    }

    try {
      const response = await axios.post(
        `${api}login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login success:", response.data);
      // later: set user state here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Login failed");
      } else {
        setErrorMessage("Unexpected error occurred");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ login, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
