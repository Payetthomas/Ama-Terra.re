import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TUser, TDecodedUser } from "../@types/userTypes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type TAuthContexte = {
    user: TUser | TDecodedUser |null;
    setUser: (user: TUser | TDecodedUser |null) => void;
    logout: () => void;
    isLoading: boolean;
};

type TAuthProvider = {
    children: ReactNode,
}; 

const AuthContext = createContext<TAuthContexte | undefined>(undefined);

export const AuthProvider = ({ children }: TAuthProvider) => {
    const [user, setUser] = useState<TUser | TDecodedUser |null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            console.log(`Ce que donne le jwtDecode: ${decoded}`);
            setUser(decoded);

            const res = await axios.get("http://localhost:1818/api/auth/token", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(res.data);
          } catch (error) {
            console.error("Erreur de la récupération du token dans le localStorage :", error);
            localStorage.removeItem("token");
            setUser(null);
          }
        }
      setIsLoading(false);
      };
  
      fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context = useContext(AuthContext); 

    if(!context) throw new Error("erruer context");

    return context;
};