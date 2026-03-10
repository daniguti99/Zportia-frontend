import type { RegisterForm } from "../schemas/registerSchema";

export async function loginRequest(email: string, password: string) {
    const URL_BASE = "http://localhost:8080/auth";
    const response = await fetch(`${URL_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if(!response.ok) {
        throw new Error("Credenciales erróneas");
    }

    return response.json();
}

export async function registerRequest(data: RegisterForm) {
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
}




