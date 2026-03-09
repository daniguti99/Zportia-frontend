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

