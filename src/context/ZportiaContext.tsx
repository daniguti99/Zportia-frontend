import { createContext, useState, useEffect, type ReactNode } from "react";
import { getCurrentUser } from "../services/AuthService";
import type { User } from "../interfaces/interfaces"; // <-- tu interfaz externa

interface ZportiaContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (jwt: string) => Promise<void>;
  logout: () => void;
}

export const ZportiaContext = createContext<ZportiaContextType | null>(null);

export function ZportiaProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario automáticamente al iniciar la app
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await getCurrentUser();
        setUser(me);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      }

      setLoading(false);
    }

    loadUser();
  }, [token]);

  // LOGIN
  const login = async (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);

    try {
      const me = await getCurrentUser();
      setUser(me);
    } catch {
      logout();
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <ZportiaContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </ZportiaContext.Provider>
  );
}
