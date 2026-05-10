import AdminCreateSport from "../../components/Admin/AdminCreateSport";
import AdminSearchSport from "../../components/Admin/AdminSearchSport";
import "../../css/admin/adminSport.css";


export default function AdminSport() {
  return (
    <div className="admin-users-wrapper">

      <h1 className="admin-title">Gestión de Deportes</h1>

      {/* Crear deporte */}
      <AdminCreateSport />

      {/* Buscar y eliminar deporte por ID */}
      <AdminSearchSport />

    </div>
  );
}
