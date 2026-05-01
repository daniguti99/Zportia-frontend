import { Link } from "react-router-dom";
import "../../css/admin/adminHome.css";

export default function AdminHome() {
  return (
    <div className="admin-home-wrapper">

      <div className="admin-home-header">
        <h1 className="admin-home-title">Panel de Administración</h1>
        <p className="admin-home-subtitle">
          Bienvenido al centro de control de Zportia.  
          Desde aquí puedes gestionar usuarios, publicaciones y mantener la plataforma en perfecto estado.
        </p>
      </div>

      <div className="admin-home-grid">

        <Link to="/admin" className="admin-home-card">
          <h2>Dashboard</h2>
          <p>Resumen general del sistema y estadísticas clave.</p>
        </Link>

        <Link to="/admin/users" className="admin-home-card">
          <h2>Gestión de Usuarios</h2>
          <p>Buscar, bloquear, activar, eliminar o recuperar usuarios.</p>
        </Link>

        <Link to="/admin/posts" className="admin-home-card">
          <h2>Gestión de Publicaciones</h2>
          <p>Revisar, moderar o eliminar contenido inapropiado.</p>
        </Link>

      </div>

    </div>
  );
}
