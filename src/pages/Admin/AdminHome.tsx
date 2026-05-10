import { Link } from "react-router-dom";
import "../../css/admin/adminHome.css";

export default function AdminHome() {
  return (
    <div className="admin-home-wrapper">

      <div className="admin-home-header">
        <h1 className="admin-home-title">Panel de Administración</h1>
        <p className="admin-home-subtitle">
          Bienvenido al centro de control de Zportia.  
          Desde aquí puedes gestionar usuarios, publicaciones, comentarios y deportes.
        </p>
      </div>

      <div className="admin-home-grid">

        <Link to="/dashboard" className="admin-home-card">
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

        <Link to="/admin/comments" className="admin-home-card">
          <h2>Gestión de Comentarios</h2>
          <p>Buscar, revisar o eliminar comentarios.</p>
        </Link>

        <Link to="/admin/sports" className="admin-home-card">
          <h2>Gestión de Deportes</h2>
          <p>Crear, buscar o eliminar deportes.</p>
        </Link>

      </div>

    </div>
  );
}
