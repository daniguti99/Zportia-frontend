import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import "../css/navbar/navbar.css";
import logo from "../assets/logoZportia.png";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [flipLevel, setFlipLevel] = useState(false);

  return (
    <>
      <nav className="navbar">

        {/* LEFT MENU */}
        <div className="nav-left">
          <Link to="/home" className="nav-item">Home</Link>

          <Link to="/explore" className="nav-item">
            Explora
          </Link>

          <Link to={`/profile/${user?.id}`} className="nav-item">
            Mi perfil
          </Link>

        </div>

        {/* CENTER LOGO */}
        <div className="nav-center">
          <img src={logo} alt="Zportia Logo" className="nav-logo" />
        </div>

        {/* RIGHT PROFILE */}
        <div className="nav-right">

          {/* BADGE DE NIVEL GIRATORIO */}
          {user && (
            <div
              className={`user-level-badge-container ${flipLevel ? "flipped" : ""}`}
              onClick={() => setFlipLevel(!flipLevel)}
            >
              {/* CARA FRONTAL → NIVEL */}
              <div className={`user-level-badge front level-${user.level.toLowerCase()}`}>
                {user.level}
              </div>

              {/* CARA TRASERA → PUNTOS */}
              <div className="user-level-badge back">
                {user.points} pts
              </div>
            </div>
          )}

          <div className="profile">

            <div className="profile-hover">

              {/* FOTO DEL USUARIO */}
              {user?.photo ? (
                <img src={user.photo} className="profile-avatar" />
              ) : (
                <div className="profile-avatar placeholder"></div>
              )}

              {/* NOMBRE DEL USUARIO */}
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
            {user && (
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
