import "../css/login/login.css";
import logo from "../assets/logoZportia.png";
import player from "../assets/img1Login.png";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { useAuth } from "../hooks/useAuth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { editProfileSchema } from "../schemas/editProfileSchema";
import { photoSchema } from "../schemas/photoSchema";
import { passwordSchema } from "../schemas/passwordSchema";

import {
  updatePassword,
  updateProfile,
  updateProfilePhoto
} from "../services/ProfileService";

export default function EditProfile() {
  const { user, refreshUser } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"profile" | "photo" | "password">("profile");

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "profile" || m === "photo" || m === "password") {
      setMode(m);
    }
  }, [searchParams]);

  // Resolver dinámico
  const schema =
    mode === "profile"
      ? editProfileSchema
      : mode === "photo"
      ? photoSchema
      : passwordSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<any>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues:
      mode === "profile"
        ? {
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            isPrivate: user?.isPrivate
          }
        : {}
  });


  async function handleProfileUpdate(data: { username: string; firstName: string; lastName: string; isPrivate: boolean }) {
    await updateProfile({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      isPrivate: data.isPrivate
    });
  }

  async function handlePhotoUpdate(data: { photo: FileList }) {
    const formData = new FormData();

    if (data.photo instanceof FileList && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    } else {
      throw new Error("Debes seleccionar una imagen");
    }

    await updateProfilePhoto(formData);
  }

  async function handlePasswordUpdate(data: { currentPassword: string; newPassword: string; repeatPassword: string }) {
    await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      repeatPassword: data.repeatPassword
    });
  }


  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      if (mode === "profile") await handleProfileUpdate(data);
      if (mode === "photo") await handlePhotoUpdate(data);
      if (mode === "password") await handlePasswordUpdate(data);

      await refreshUser();

      Swal.fire({
        title: "Cambios guardados",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0099ff",
      });

      reset();

      navigate(`/profile/${user?.id}`);

    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
      });
    }
  };


  function handleCancel() {
    navigate(`/profile/${user?.id}`);
  }



  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <div className="login-card">
            <img src={logo} alt="Zportia Logo" className="login-logo" />

            <h2 className="login-title">
              {mode === "profile" && "EDITAR PERFIL"}
              {mode === "photo" && "CAMBIAR FOTO"}
              {mode === "password" && "CAMBIAR CONTRASEÑA"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">

              {/* MODO PERFIL */}
              {mode === "profile" && (
                <>
                  <div className="form-group">
                    <label>Nombre de usuario</label>
                    <input type="text" {...register("username")} />
                    {errors.username && <span className="error">{String(errors.username.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" {...register("firstName")} />
                    {errors.firstName && <span className="error">{String(errors.firstName.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Apellidos</label>
                    <input type="text" {...register("lastName")} />
                    {errors.lastName && <span className="error">{String(errors.lastName.message)}</span>}
                  </div>

                  <div className="form-group checkbox-group">
                    <label>Perfil privado</label>
                    <input type="checkbox" {...register("isPrivate")} />
                  </div>
                </>
              )}

              {/* MODO FOTO */}
              {mode === "photo" && (
                <div className="form-group">
                  <label>Foto de perfil</label>
                  <input type="file" accept="image/*" {...register("photo")} />
                  {errors.photo && <span className="error">{String(errors.photo.message)}</span>}
                </div>
              )}

              {/* MODO CONTRASEÑA */}
              {mode === "password" && (
                <>
                  <div className="form-group">
                    <label>Contraseña actual</label>
                    <input type="password" {...register("currentPassword")} />
                    {errors.currentPassword && <span className="error">{String(errors.currentPassword.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Nueva contraseña</label>
                    <input type="password" {...register("newPassword")} />
                    {errors.newPassword && <span className="error">{String(errors.newPassword.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Repetir nueva contraseña</label>
                    <input type="password" {...register("repeatPassword")} />
                    {errors.repeatPassword && <span className="error">{String(errors.repeatPassword.message)}</span>}
                  </div>
                </>
              )}

              {/* BOTONES */}
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button type="submit" className="btn-login">Guardar cambios</button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-login"
                  style={{
                    background: "#444",
                    border: "1px solid #666"
                  }}
                >
                  Cancelar
                </button>
              </div>

            </form>
          </div>
        </div>

        <div className="login-right">
          <img src={player} alt="Player" className="login-image" />
        </div>

      </div>
    </div>
  );
}
