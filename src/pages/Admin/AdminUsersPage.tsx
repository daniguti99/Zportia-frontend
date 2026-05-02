import { useState } from "react";
import UserCard from "../../components/Admin/UserCard";
import UserSearchInput from "../../components/Admin/UserSearchInput";
import type { UserDetailsAdminDTO } from "../../interfaces/interfaces";

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState<UserDetailsAdminDTO | null>(null);

  return (
    <div className="admin-users-wrapper">

      <h1 className="admin-title">Gestión de Usuarios</h1>

      <div className="admin-center-box">
        <UserSearchInput onSelect={setSelectedUser} />

        {selectedUser && (
          <UserCard user={selectedUser} />
        )}
      </div>

    </div>
  );
}

