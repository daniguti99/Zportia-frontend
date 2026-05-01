import "../css/home/home.css";
import logo from "../assets/logoZportia.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ZportiaContext } from "../context/ZportiaContext";
import FriendsFeed from "../components/FriendsFeed";
import CreatePostButton from "../components/Buttons/CreatePostButton";

export default function LandingPage() {
  const navigate = useNavigate();
  const context = useContext(ZportiaContext);

  if (!context) return null;

  const { user, loading } = context;

  // Redirigir admins a /admin automáticamente
  useEffect(() => {
    if (user && user.role === "ADMIN") {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  if (loading) {
    return <div className="landing-container">Cargando...</div>;
  }

  // Si el usuario es admin, no mostrar nada (la redirección está en proceso)
  if (user && user.role === "ADMIN") {
    return null;
  }

if (user) {
  return (
    <div className="explore-wrapper">

      <aside className="explore-sidebar">
        <CreatePostButton />
      </aside>

      {/* FEED CENTRAL */}
      <div className="explore-container">
        <FriendsFeed />
      </div>

    </div>
  );
}


  // Si NO está autenticado → mostrar la landing pública
  return (
    <div className="landing-container">
      <div className="landing-background"></div>

      <div className="landing-card">
        <img src={logo} alt="Zportia Logo" className="landing-logo" />

        <h1 className="landing-title">
          <span className="title-highlight">Conecta</span>
          <br />
          con quienes viven el deporte como tú
        </h1>

        <p className="landing-subtitle">
          Únete a miles de deportistas que ya están mejorando su rendimiento,
          compartiendo experiencias y alcanzando sus metas con Zportia.
        </p>

        <div className="landing-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>

          <button className="btn-secondary" onClick={() => navigate("/register")}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
