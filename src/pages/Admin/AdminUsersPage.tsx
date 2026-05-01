import { useState } from "react";
import UserCard from "../../components/Admin/UserCard";
import UserSearchInput from "../../components/Admin/UserSearchInput";
import type { UserDetailsAdminDTO } from "../../interfaces/interfaces";

export default function AdminUsersPage() {
const [selectedUser, setSelectedUser] = useState<UserDetailsAdminDTO | null>(null);


  return (
    <div className="admin-users-page">
      <h1 className="admin-title">Gestión de Usuarios</h1>

      <UserSearchInput onSelect={setSelectedUser} />

      {selectedUser && (
        <div className="admin-user-card-wrapper">
          <UserCard user={selectedUser} />
        </div>
      )}
    </div>
  );
}
