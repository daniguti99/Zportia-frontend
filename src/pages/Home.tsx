import "../css/home/home.css";
import logo from "../assets/logoZportia.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ZportiaContext } from "../context/ZportiaContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const context = useContext(ZportiaContext);

  if (!context) return null; // seguridad

  const { user, loading } = context;

  if (loading) {
    return <div className="landing-container">Cargando...</div>;
  }

  return (
    <div className="landing-container">
      <div className="landing-background"></div>

      <div className="landing-card">
        <img src={logo} alt="Zportia Logo" className="landing-logo" />

        {!user ? (
          <>
            <h1 className="landing-title">
              <span className="title-highlight">Conecta</span>
              <br />
              con quienes viven el deporte como tú
            </h1>
            <br />

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
          </>
        ) : (
          <>
            <h1 className="landing-title">
              ¡Bienvenido de nuevo, {user.firstName}! 💪
            </h1>

            <p className="landing-subtitle">
              Gracias por confiar en Zportia. Cada entrenamiento cuenta,
              cada paso suma. Sigue superándote y conectando con la comunidad 🚀
            </p>

            <div className="landing-buttons">
              <button className="btn-primary" onClick={() => navigate("/dashboard")}>
                Ir a mi panel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}