import type { AllSportsResponse } from "../interfaces/interfaces";

const URL_BASE = "http://localhost:8080/api";


export async function getAllSports(): Promise<AllSportsResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/sports`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudieron cargar los deportes");
  }

  return response.json();
}
