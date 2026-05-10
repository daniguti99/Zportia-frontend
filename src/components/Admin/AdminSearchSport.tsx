import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getSportByIdAdmin, deleteSportAdmin } from "../../services/AdminService";
import type { SportResponse } from "../../interfaces/interfaces";
import "../../css/admin/userSearch.css";

export default function AdminSearchSport() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState<SportResponse | null>(null);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSport(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const result = await getSportByIdAdmin(Number(query));
        setSport(result);
      } catch (err: any) {
        setSport(null);

        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          background: "#111",
          color: "#fff",
        });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  async function handleDelete() {
    if (!sport) return;

    const ok = await Swal.fire({
      title: "¿Eliminar deporte?",
      text: `Se eliminará: ${sport.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!ok.isConfirmed) return;

    try {
      await deleteSportAdmin(sport.id);

      Swal.fire({
        title: "Deporte eliminado",
        icon: "success",
        background: "#111",
        color: "#fff",
      });

      setSport(null);
      setQuery("");

    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "#111",
        color: "#fff",
      });
    }
  }

  return (
    <div className="admin-center-box">
      <h2 className="admin-title">Buscar deporte por ID</h2>

      <input
        type="number"
        className="admin-input"
        placeholder="Introduce ID del deporte..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {sport && (
        <div className="admin-item">
          <span>{sport.name}</span>

          <button className="admin-btn danger" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
