import "../../css/profilePage/BlockedPages.css";

interface BlockedByUserPageProps {
  username: string;
  photo: string | null;
}

export default function BlockedByUserPage({ username, photo }: BlockedByUserPageProps) {
  return (
    <div className="blocked-page-container">
      <div className="blocked-card">

        <img
          src={photo ?? "/assets/default-profile.png"}
          alt="Foto de perfil"
          className="blocked-profile-photo"
        />

        <h2 className="blocked-title">@{username} te ha bloqueado</h2>

        <p className="blocked-text">
          No puedes ver su contenido ni interactuar con este usuario.
        </p>

      </div>
    </div>
  );
}
