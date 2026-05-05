import type { AllSportsResponse } from "../interfaces/interfaces";

const URL_BASE = "https://api-25-26-daniguti99.onrender.com/api";


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
