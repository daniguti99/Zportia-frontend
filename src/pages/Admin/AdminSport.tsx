import AdminCreateSport from "../../components/Admin/AdminCreateSport";
import AdminSearchSport from "../../components/Admin/AdminSearchSport";
import "../../css/admin/adminSport.css";
import "../../css/admin/userSearch.css"; // 🔥 necesario para el estilo del search

export default function AdminSport() {
  return (
    <div className="admin-users-wrapper">

      <h1 className="admin-title">Gestión de Deportes</h1>

      {/* Crear deporte */}
      <div className="admin-center-box">
        <AdminCreateSport />
      </div>

      {/* Buscar y eliminar deporte */}
      <div className="admin-center-box">
        <AdminSearchSport />
      </div>

    </div>
  );
}
