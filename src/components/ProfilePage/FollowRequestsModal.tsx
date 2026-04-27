import { useEffect, useState } from "react";
import { getPendingRequests, acceptFollow, rejectFollow } from "../../services/ProfileService";
import "../../css/profilePage/FollowRequestsModal.css";
import type { SimpleUser } from "../../interfaces/interfaces";

interface FollowRequestsModalProps {
  onClose: () => void;
}

export default function FollowRequestsModal({ onClose }: FollowRequestsModalProps) {
  const [requests, setRequests] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState("");

  async function loadRequests() {
    try {
      setLoading(true);
      const data = await getPendingRequests();
      setRequests(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function handleAccept(id: number) {
    try {
      await acceptFollow(id);
      setGlobalError("");
      loadRequests();
    } catch (err: any) {
      setGlobalError(err.message || "Error desconocido");
    }
  }

  async function handleReject(id: number) {
    try {
      await rejectFollow(id);
      setGlobalError("");
      loadRequests();
    } catch (err: any) {
      setGlobalError(err.message || "Error desconocido");
    }
  }

  return (
    <div className="requests-modal-overlay">
      <div className="requests-modal">

        <button className="close-btn" onClick={onClose}>✕</button>

        <h2 className="modal-title">Solicitudes de seguimiento</h2>

        {globalError && (
          <p className="global-error">{globalError}</p>
        )}

        {loading && <p className="loading-text">Cargando...</p>}

        {!loading && requests.length === 0 && (
          <p className="no-requests">No tienes solicitudes pendientes</p>
        )}

        {requests.map((u) => (
          <div key={u.id} className="request-item">
            <img
              src={u.photo ?? "/assets/default-profile.png"}
              className="request-photo"
            />

            <div className="request-info">
              <p className="request-username">@{u.username}</p>
            </div>

            <div className="request-actions">
              <button className="btn-accept" onClick={() => handleAccept(u.id)}>
                Aceptar
              </button>
              <button className="btn-reject" onClick={() => handleReject(u.id)}>
                Rechazar
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
