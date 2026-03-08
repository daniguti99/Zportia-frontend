import { createContext, useState, type ReactNode } from "react";

interface ZportiaContextType {
  token: string | null;
  login: (jwt: string) => void;
  logout: () => void;
}

export const ZportiaContext = createContext<ZportiaContextType | null>(null);

export function ZportiaProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (jwt: string) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <ZportiaContext.Provider value={{ token, login, logout }}>
      {children}
    </ZportiaContext.Provider>
  );
}


