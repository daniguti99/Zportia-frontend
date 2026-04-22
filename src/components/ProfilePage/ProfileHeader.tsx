import { useState, useEffect } from "react";
import type { User, SimpleUser } from "../../interfaces/interfaces";

import FollowersModal from "../../components/ProfilePage/FollowersModal";
import FollowRequestsModal from "../../components/ProfilePage/FollowRequestsModal";

import { getFollowers, getFollowing, getPendingRequests } from "../../services/ProfileService";

import FollowBlockButtons from "../../components/ProfilePage/FollowBlockButton";

import "../../css/profilePage/ProfileButtons.css";
import "../../css/profilePage/ProfileHeader.css";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
}

export default function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUsers, setModalUsers] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔔 NOTIFICACIONES
  const [requestsCount, setRequestsCount] = useState(0);
  const [requestsOpen, setRequestsOpen] = useState(false);

  function getLevelClass(level: string) {
    return `level-box-${level.toLowerCase()}`;
  }

  // ============================
  // CARGAR SOLICITUDES PENDIENTES
  // ============================
  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await getPendingRequests();
        setRequestsCount(data.length);
      } catch (err) {
        console.error("Error cargando solicitudes:", err);
      }
    }

    if (isOwnProfile) loadRequests();
  }, [isOwnProfile]);

  // ============================
  // MODALES DE FOLLOWERS / FOLLOWING
  // ============================
  async function openFollowers() {
    try {
      setLoading(true);
      const data = await getFollowers(user.id);
      setModalUsers(data);
      setModalTitle("Seguidores");
      setModalOpen(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function openFollowing() {
    try {
      setLoading(true);
      const data = await getFollowing(user.id);
      setModalUsers(data);
      setModalTitle("Seguidos");
      setModalOpen(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="profile-header-container">

        {/* FOTO + MARCO */}
        <div className={`profile-photo-wrapper level-${user.level.toLowerCase()}`}>
          <img
            src={user.photo ?? "/assets/default-profile.png"}
            alt="Foto de perfil"
            className="profile-photo"
          />
        </div>

        {/* NOMBRE + USERNAME */}
        <div className="profile-header-info">
          <h2 className="profile-name">
            {user.firstName} {user.lastName}
          </h2>
          <p className="profile-username">@{user.username}</p>

{/* 🔔 NOTIFICACIONES (solo si es mi perfil) */}
{isOwnProfile && (
  <div className="notifications-box" onClick={() => setRequestsOpen(true)}>
    <div className="notif-left">
      <span className="notif-icon">🔔</span>
      <span className="notif-text">Notificaciones</span>
    </div>

    {requestsCount > 0 && (
      <span className="notif-count">{requestsCount}</span>
    )}
  </div>
)}


          {/* 🔥 BOTONES SEGUIR / BLOQUEAR (solo si NO es mi perfil) */}
          {!isOwnProfile && (
            <FollowBlockButtons
              userId={user.id}
              followedByMe={user.followedByMe}
              requestedByMe={user.requestedByMe}
              blockedByMe={user.blockedByMe}
              blockedMe={user.blockedMe}
              isPrivate={user.isPrivate}
              onUpdate={() => window.location.reload()}
            />
          )}

          {/* LEVEL + POINTS */}
          <div className="profile-level-points-bar">
            <div className={`level-box ${getLevelClass(user.level)}`}>
              <span className="level-icon">⭐</span>
              <span className="level-text">{user.level}</span>
            </div>

            <div className="points-box">
              <span className="points-icon">🔥</span>
              <span className="points-text">{user.points} pts</span>
            </div>
          </div>

          {/* DEPORTES */}
          {user.sports && user.sports.length > 0 && (
            <div className="profile-sports">
              {user.sports.map((sport) => (
                <span key={sport} className="sport-badge">
                  {sport}
                </span>
              ))}
            </div>
          )}

          {/* STATS */}
          <div className="profile-header-stats">
            <div className="stat">
              <strong>{user.postsCount}</strong>
              <span>Publicaciones</span>
            </div>

            <div className="stat clickable" onClick={openFollowers}>
              <strong>{user.followersCount}</strong>
              <span>Seguidores</span>
            </div>

            <div className="stat clickable" onClick={openFollowing}>
              <strong>{user.followingCount}</strong>
              <span>Seguidos</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FOLLOWERS / FOLLOWING */}
      {modalOpen && (
        <FollowersModal
          title={modalTitle}
          users={modalUsers}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* MODAL SOLICITUDES */}
      {requestsOpen && (
        <FollowRequestsModal onClose={() => setRequestsOpen(false)} />
      )}

      {/* LOADING */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}
