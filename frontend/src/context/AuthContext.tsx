import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import api from "../config/api";
import type { User } from "../types/userType";

type AuthContextProps = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  errorMessage: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const response = await axios.get(`${api}auth_user`, {
          withCredentials: true,
        });

        if (response.data.status === "success" && response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  const login = async (email: string, password: string) => {
    setErrorMessage(null);
    setLoading(true);

    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${api}login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === "success" && response.data.user) {
        setUser(response.data.user);
      } else {
        setErrorMessage(response.data.message || "Login failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Login failed");
      } else {
        setErrorMessage("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${api}logout`, {}, { withCredentials: true });
      setUser(null);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, errorMessage, loading }}>
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
