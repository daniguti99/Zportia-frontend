import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import "../css/navbar/navbar.css";
import logo from "../assets/logoZportia.png";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">

        {/* LEFT MENU */}
        <div className="nav-left">
          <Link to="/home" className="nav-item">Home</Link>

          <Link to="/explore" className="nav-item">
            Explora
          </Link>

          <a className="nav-item">Forum</a>
          <a className="nav-item">Perfil</a>
        </div>

        {/* CENTER LOGO */}
        <div className="nav-center">
          <img src={logo} alt="Zportia Logo" className="nav-logo" />
        </div>

          
        {/* RIGHT PROFILE */}
        <div className="nav-right">
        {/* NIVEL DESTACADO */}
          {user && (
            <div className="user-level-badge">
              {user.level}
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
                <Link to="/perfil" className="dropdown-item">Mi perfil</Link>
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
