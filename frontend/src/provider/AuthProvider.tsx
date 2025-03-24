import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../model/user.model";
import { api } from "../lib/api";
import Cookies from "js-cookie";

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

type LoginResponse = {
  token: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (
    username: string,
    password: string
  ): Promise<void | undefined> => {
    const response = await api.post<LoginResponse>("/api/auth/login", {
      username,
      password,
    });
    if (response.status !== 200)
      throw new Error("Error fetching data from server");
    Cookies.set("token", response.data.token);
    setIsAuthenticated(true);
    await fetchUserInfo();
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const fetchUserInfo = async (): Promise<void | undefined> => {
    const response = await api.get("/api/users/my-info");
    if (response.status !== 200)
      throw new Error("Error fetching data from server");
    setUser(response.data);
  };

  useEffect(() => {
    fetchUserInfo().catch(() => {
      setUser(null);
      Cookies.remove("token");
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider !");
  }
  return context;
};

export default AuthProvider;
