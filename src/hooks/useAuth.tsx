import { useContext } from "react";
import { ZportiaContext } from "../context/ZportiaContext";

export function useAuth() {
  const context = useContext(ZportiaContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un ZportiaProvider");
  }

  return context;
}
