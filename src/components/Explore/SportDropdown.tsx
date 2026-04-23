import { useEffect, useState } from "react";
import { getAllSports } from "../../services/SportsService";
import "../../css/explore/sportDropdown.css";
import type { Sport } from "../../interfaces/interfaces";

interface SportDropdownProps {
  selectedSport: string;
  onChange: (value: string) => void;
}

export default function SportDropdown({ selectedSport, onChange }: SportDropdownProps) {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSports() {
      try {
        const data = await getAllSports();
        setSports(data.sports);
      } catch (err) {
        console.error("Error cargando deportes:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSports();
  }, []);

  return (
    <div className="sport-wrapper">
      {loading ? (
        <div className="sport-loading">Cargando...</div>
      ) : (
        <select
          className="sport-select"
          value={selectedSport}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Todos los deportes</option>
          {sports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
      )}

      <div className="sport-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#d6d6e6" />
        </svg>
      </div>
    </div>
  );
}
