import type { RegisterForm } from "../schemas/registerSchema";

const URL_BASE = "http://localhost:8080/auth";

export async function loginRequest(email: string, password: string) {

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
    const response = await fetch(`${URL_BASE}/register`, {
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


export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el usuario");
  }

  return await response.json();
}



