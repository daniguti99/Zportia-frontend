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

  const [loadingAccept, setLoadingAccept] = useState<number | null>(null);
  const [loadingReject, setLoadingReject] = useState<number | null>(null);

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
    if (loadingAccept || loadingReject) return;
    try {
      setLoadingAccept(id);
      await acceptFollow(id);
      setGlobalError("");
      loadRequests();
    } catch (err: any) {
      setGlobalError(err.message || "Error desconocido");
    } finally {
      setLoadingAccept(null);
    }
  }

  async function handleReject(id: number) {
    if (loadingAccept || loadingReject) return;
    try {
      setLoadingReject(id);
      await rejectFollow(id);
      setGlobalError("");
      loadRequests();
    } catch (err: any) {
      setGlobalError(err.message || "Error desconocido");
    } finally {
      setLoadingReject(null);
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

              <span
                className="neon-accept"
                onClick={() => handleAccept(u.id)}
                style={{ opacity: loadingAccept === u.id ? 0.5 : 1 }}
              >
                {loadingAccept === u.id ? "..." : "✔"}
              </span>

              <span
                className="neon-reject"
                onClick={() => handleReject(u.id)}
                style={{ opacity: loadingReject === u.id ? 0.5 : 1 }}
              >
                {loadingReject === u.id ? "..." : "✖"}
              </span>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
