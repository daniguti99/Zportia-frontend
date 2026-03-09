import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ZportiaContext } from "../context/ZportiaContext";

import "../css/navbar/navbar.css";
import logo from "../assets/logoZportia.png";

export default function Navbar() {
  const zportia = useContext(ZportiaContext);
  const user = zportia?.user;

  return (
    <>
      <nav className="navbar">

        {/* LEFT MENU */}
        <div className="nav-left">
          <Link to="/home" className="nav-item">Home</Link>

          <div className="nav-item dropdown">
            Explora
            <span className="arrow">▼</span>
          </div>

          <a className="nav-item">Forum</a>
          <a className="nav-item">Perfil</a>
        </div>

        {/* CENTER LOGO */}
        <div className="nav-center">
          <img src={logo} alt="Zportia Logo" className="nav-logo" />
        </div>

        {/* RIGHT PROFILE */}
        <div className="nav-right">

          <div className="profile">

            <div className="profile-hover">

              {user?.avatarUrl ? (
                <img src={user.avatarUrl} className="profile-avatar" />
              ) : (
                <div className="profile-avatar placeholder"></div>
              )}

              <span className="profile-name">
                {user?.name || "Anónimo"}
              </span>

            </div>

            <span className="arrow">▼</span>

          </div>

        </div>

      </nav>

      <Outlet />
    </>
  );
}