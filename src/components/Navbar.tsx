import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../css/navbar/navbar.css";
import logo from "../assets/logoZportia.png";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [flipLevel, setFlipLevel] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <nav className="navbar">

        {/* LEFT MENU */}
        <div className="nav-left">

          {user?.role === "ADMIN" ? (
            <>
              <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
              <NavLink to="/admin/users" className="nav-item">Usuarios</NavLink>
              <NavLink to="/admin/posts" className="nav-item">Posts</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/home" className="nav-item">Home</NavLink>
              <NavLink to="/explore" className="nav-item">Explora</NavLink>
              <NavLink to={`/profile/${user?.id}`} className="nav-item">Mi perfil</NavLink>
            </>
          )}

        </div>

        {/* CENTER LOGO */}
        <div className="nav-center">
          <img
            src={logo}
            alt="Zportia Logo"
            className={`nav-logo ${isAdminPage ? "admin-glow" : ""}`}
          />
        </div>

        {/* RIGHT PROFILE */}
        <div className="nav-right">

          {/* BADGE DE NIVEL (solo usuarios normales) */}
          {user && user.role !== "ADMIN" && (
            <div
              className={`user-level-badge-container ${flipLevel ? "flipped" : ""}`}
              onClick={() => setFlipLevel(!flipLevel)}
            >
              <div className={`user-level-badge front level-${user.level.toLowerCase()}`}>
                {user.level}
              </div>
              <div className="user-level-badge back">
                {user.points} pts
              </div>
            </div>
          )}

          {/* PERFIL */}
          <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="profile-hover">
              {user?.photo ? (
                <img src={user.photo} className="profile-avatar" />
              ) : (
                <div className="profile-avatar placeholder"></div>
              )}

              <span className="profile-name">
                {user ? (
                  <>
                    {user.firstName}
                    <br />
                    {user.lastName}
                  </>
                ) : (
                  "Invitado"
                )}
              </span>
            </div>

            {/* DROPDOWN MENU */}
            {user && showDropdown && (
              <div className="profile-dropdown">
                <button className="dropdown-item logout" onClick={logout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      <Outlet />
    </>
  );
}
