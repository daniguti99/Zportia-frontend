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
  const [loading, setLoading] = useState(false); // ⭐ loading

  useEffect(() => {
    const m = searchParams.get("mode");
    if (m === "profile" || m === "photo" || m === "password") {
      setMode(m);
    }
  }, [searchParams]);

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

  async function handleProfileUpdate(data: any) {
    await updateProfile({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      isPrivate: data.isPrivate
    });
  }

  async function handlePhotoUpdate(data: any) {
    const formData = new FormData();

    if (data.photo instanceof FileList && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    } else {
      throw new Error("Debes seleccionar una imagen");
    }

    await updateProfilePhoto(formData);
  }

  async function handlePasswordUpdate(data: any) {
    await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      repeatPassword: data.repeatPassword
    });
  }

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (loading) return;

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  function handleCancel() {
    if (loading) return;
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
                    <input type="text" {...register("username")} disabled={loading} />
                    {errors.username && <span className="error">{String(errors.username.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" {...register("firstName")} disabled={loading} />
                    {errors.firstName && <span className="error">{String(errors.firstName.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Apellidos</label>
                    <input type="text" {...register("lastName")} disabled={loading} />
                    {errors.lastName && <span className="error">{String(errors.lastName.message)}</span>}
                  </div>

                  <div className="form-group checkbox-group">
                    <label>Perfil privado</label>
                    <input type="checkbox" {...register("isPrivate")} disabled={loading} />
                  </div>
                </>
              )}

              {/* MODO FOTO */}
              {mode === "photo" && (
                <div className="form-group">
                  <label>Foto de perfil</label>
                  <input type="file" accept="image/*" {...register("photo")} disabled={loading} />
                  {errors.photo && <span className="error">{String(errors.photo.message)}</span>}
                </div>
              )}

              {/* MODO CONTRASEÑA */}
              {mode === "password" && (
                <>
                  <div className="form-group">
                    <label>Contraseña actual</label>
                    <input type="password" {...register("currentPassword")} disabled={loading} />
                    {errors.currentPassword && <span className="error">{String(errors.currentPassword.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Nueva contraseña</label>
                    <input type="password" {...register("newPassword")} disabled={loading} />
                    {errors.newPassword && <span className="error">{String(errors.newPassword.message)}</span>}
                  </div>

                  <div className="form-group">
                    <label>Repetir nueva contraseña</label>
                    <input type="password" {...register("repeatPassword")} disabled={loading} />
                    {errors.repeatPassword && <span className="error">{String(errors.repeatPassword.message)}</span>}
                  </div>
                </>
              )}

              {/* BOTONES */}
              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button
                  type="submit"
                  className="btn-login"
                  disabled={loading}
                  style={{ opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-login"
                  disabled={loading}
                  style={{
                    background: "#444",
                    border: "1px solid #666",
                    opacity: loading ? 0.6 : 1
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
