import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import type { User, SimpleUser } from "../../interfaces/interfaces";

import FollowersModal from "../../components/ProfilePage/FollowersModal";
import FollowRequestsModal from "../../components/ProfilePage/FollowRequestsModal";

import {
  getFollowers,
  getFollowing,
  getPendingRequests
} from "../../services/ProfileService";

import FollowBlockButtons from "../../components/ProfilePage/FollowBlockButton";

import "../../css/profilePage/ProfileButtons.css";
import "../../css/profilePage/ProfileHeader.css";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
}

export default function ProfileHeader({
  user,
  isOwnProfile
}: ProfileHeaderProps) {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUsers, setModalUsers] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState(false);

  // FOTO PERFIL MODAL
  const [photoOpen, setPhotoOpen] = useState(false);

  // 🔔 NOTIFICACIONES
  const [requestsCount, setRequestsCount] = useState(0);
  const [requestsOpen, setRequestsOpen] = useState(false);

  function getLevelClass(level: string) {
    return `level-box-${level.toLowerCase()}`;
  }

  // ============================
  // CARGAR SOLICITUDES
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
  // FOLLOWERS
  // ============================
  async function openFollowers() {
    try {

      setLoading(true);

      const data = await getFollowers(user.id);

      setModalUsers(data);
      setModalTitle("Seguidores");

      setModalOpen(true);

    } catch (err: any) {

      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
      });

    } finally {
      setLoading(false);
    }
  }

  // ============================
  // FOLLOWING
  // ============================
  async function openFollowing() {

    try {

      setLoading(true);

      const data = await getFollowing(user.id);

      setModalUsers(data);
      setModalTitle("Seguidos");

      setModalOpen(true);

    } catch (err: any) {

      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="profile-header-container">

        {/* FOTO */}
        <div
          className={`profile-photo-wrapper level-${user.level.toLowerCase()}`}
        >
          <img
            src={user.photo ?? "/assets/default-profile.png"}
            alt="Foto de perfil"
            className="profile-photo"
            onClick={() => setPhotoOpen(true)}
          />
        </div>

        {/* INFO */}
        <div className="profile-header-info">

          <h2 className="profile-name">
            {user.firstName} {user.lastName}
          </h2>

          <p className="profile-username">
            @{user.username}
          </p>

          {/* NOTIFICACIONES */}
          {isOwnProfile && (
            <div
              className="notifications-box"
              onClick={() => setRequestsOpen(true)}
            >

              <div className="notif-left">
                <span className="notif-icon">🔔</span>
                <span className="notif-text">Notificaciones</span>
              </div>

              {requestsCount > 0 && (
                <span className="notif-count">
                  {requestsCount}
                </span>
              )}
            </div>
          )}

          {/* BOTONES */}
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
              <span className="points-text">
                {user.points} pts
              </span>
            </div>

          </div>

          {/* SPORTS */}
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

            <div
              className="stat clickable"
              onClick={openFollowers}
            >
              <strong>{user.followersCount}</strong>
              <span>Seguidores</span>
            </div>

            <div
              className="stat clickable"
              onClick={openFollowing}
            >
              <strong>{user.followingCount}</strong>
              <span>Seguidos</span>
            </div>

          </div>
        </div>
      </div>

      {/* FOTO MODAL */}
      {photoOpen && (
        <div
          className="profile-photo-overlay"
          onClick={() => setPhotoOpen(false)}
        >

          <div
            className="profile-photo-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-photo-btn"
              onClick={() => setPhotoOpen(false)}
            >
              ✕
            </button>

            <img
              src={user.photo ?? "/assets/default-profile.png"}
              alt={user.username}
              className="profile-photo-large"
            />

          </div>
        </div>
      )}

      {/* MODAL FOLLOWERS */}
      {modalOpen && (
        <FollowersModal
          title={modalTitle}
          users={modalUsers}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* MODAL REQUESTS */}
      {requestsOpen && (
        <FollowRequestsModal
          onClose={() => setRequestsOpen(false)}
        />
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