import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TUser, TDecodedUser } from "../@types/userTypes";

type TAuthContexte = {
  user: TUser | TDecodedUser | null;
  setUser: (user: TUser | TDecodedUser | null) => void;
  login: (token: string) => void;
  logout: () => void;
};

type TAuthProvider = {
  children: ReactNode;
};

const AuthContext = createContext<TAuthContexte | undefined>(undefined);

export const AuthProvider = ({ children }: TAuthProvider) => {
  const [user, setUser] = useState<TUser | TDecodedUser | null>(null);

  const login = async (token: string) => {
    localStorage.setItem("token", token);

    try {
      const decoded = jwtDecode<TDecodedUser>(token);
      setUser(decoded);

      const res = await axios.get("http://localhost:1818/api/auth/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.error("Erreur pendant le login()", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode<TDecodedUser>(token);
          setUser(decoded);

          const res = await axios.get("http://localhost:1818/api/auth/token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(res.data);
        } catch (error) {
          console.error("Erreur dans le fetchUser()", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
