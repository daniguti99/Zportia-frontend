import "../css/home/home.css";
import logo from "../assets/logoZportia.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      <div className="landing-background"></div>

      <div className="landing-card">
        <img src={logo} alt="Zportia Logo" className="landing-logo" />

        <h1 className="landing-title">
          <span className="title-highlight">Conecta</span>
          <br />
          con quienes viven el deporte como tú
        </h1><br />

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