import AdminCreateSport from "../../components/Admin/AdminCreateSport";
import AdminSearchSport from "../../components/Admin/AdminSearchSport";
import "../../css/admin/adminSport.css";
import "../../css/admin/userSearch.css";

export default function AdminSport() {
  return (
    <div className="admin-users-wrapper">

      <h1 className="admin-title">Gestión de Deportes</h1>

      <div className="admin-center-box">
        <AdminCreateSport />
      </div>

      <div className="admin-center-box">
        <AdminSearchSport />
      </div>

    </div>
  );
}
