import { useState } from "react";
import Swal from "sweetalert2";
import { createSportAdmin } from "../../services/AdminService";

export default function AdminCreateSport() {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const sport = await createSportAdmin(name);

      await Swal.fire({
        title: "Deporte creado",
        text: `Se creó el deporte: ${sport.name}`,
        icon: "success",
        background: "#111",
        color: "#fff",
      });

      setName("");

    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "No se pudo crear el deporte",
        icon: "error",
        background: "#111",
        color: "#fff",
      });
    }
  }

  return (
    <div className="admin-center-box">
      <h2 className="admin-title">Crear nuevo deporte</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="admin-input"
          placeholder="Nombre del deporte..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="admin-btn primary" type="submit">
          Crear deporte
        </button>
      </form>
    </div>
  );
}
