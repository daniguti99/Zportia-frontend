import "../css/login/sportsModal.css";
import type { Sport } from "../interfaces/interfaces";

interface SportsModalProps {
  isOpen: boolean;
  sports: Sport[];
  selectedSports: number[];
  onToggle: (id: number) => void;
  onClose: () => void;
}

export default function SportsModal({
  isOpen,
  sports,
  selectedSports,
  onToggle,
  onClose
}: SportsModalProps) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Selecciona tus deportes</h2>

        <div className="sports-list">
          {sports.map((s) => (
            <label key={s.id} className="sport-item">
              <input
                type="checkbox"
                checked={selectedSports.includes(s.id)}
                onChange={() => onToggle(s.id)}
              />
              {s.name}
            </label>
          ))}
        </div>

        <button className="btn-login" onClick={onClose}>
          Guardar selección
        </button>

      </div>
    </div>
  );
}
