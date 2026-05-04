import "../css/login/login.css";
import logo from "../assets/logoZportia.png";
import player from "../assets/img1Login.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { registerRequest } from "../services/AuthService";
import { getAllSports } from "../services/SportsService";
import { createRegisterSchema, type RegisterForm } from "../schemas/registerSchema";
import SportsModal from "../components/SportsModal";
import "../css/login/sportsModal.css";

export default function Register() {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");

  // Deportes
  const [sports, setSports] = useState<{ id: number; name: string }[]>([]);
  const [selectedSports, setSelectedSports] = useState<number[]>([]);
  const [isSportsModalOpen, setIsSportsModalOpen] = useState(false);

  // Cargar deportes al montar
  useEffect(() => {
    getAllSports().then((res) => setSports(res.sports));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue // 👈 AÑADIDO
  } = useForm<RegisterForm>({
    resolver: zodResolver(createRegisterSchema()),
    mode: "onChange"
  });

  function toggleSport(id: number) {
    setSelectedSports((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  }

  async function onSubmit(data: RegisterForm) {
    setBackendError("");

    try {
      await registerRequest({
        ...data,
        sports: selectedSports
      });

      await Swal.fire({
        title: "Registro exitoso",
        text: "Usuario registrado correctamente",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0099ff",
      });

      navigate("/login");
    } catch (err: any) {
      setBackendError(err.message);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">
          <div className="login-card">
            <img src={logo} alt="Sportia Logo" className="login-logo" />

            <h2 className="login-title">REGISTRO</h2>

            {backendError && <p className="error">{backendError}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">

              <div className="form-group">
                <label>Nombre de usuario</label>
                <input type="text" {...register("username")} />
                {errors.username && <span className="error">{errors.username.message}</span>}
              </div>

              <div className="form-group">
                <label>Nombre</label>
                <input type="text" {...register("firstName")} />
                {errors.firstName && <span className="error">{errors.firstName.message}</span>}
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input type="text" {...register("lastName")} />
                {errors.lastName && <span className="error">{errors.lastName.message}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" {...register("email")} />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" {...register("password")} />
                {errors.password && <span className="error">{errors.password.message}</span>}
              </div>

              <div className="form-group">
                <label>Repetir contraseña</label>
                <input type="password" {...register("repeatPassword")} />
                {errors.repeatPassword && (
                  <span className="error">{errors.repeatPassword.message}</span>
                )}
              </div>

              {/* BOTÓN PARA ABRIR MODAL */}
              <div className="form-group">
                <label>Deportes</label>
                <button
                  type="button"
                  className="btn-login"
                  onClick={() => setIsSportsModalOpen(true)}
                >
                  Seleccionar deportes ({selectedSports.length})
                </button>
                {errors.sports && <span className="error">{errors.sports.message}</span>}
              </div>

              <div className="form-group checkbox-group">
                <label>Perfil privado</label>
                <input type="checkbox" {...register("isPrivate")} />
              </div>

              <button type="submit" className="btn-login">Crear cuenta</button>

              <label className="text-register">
                ¿Ya tienes cuenta?
              </label>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <img src={player} alt="Player" className="login-image" />
        </div>

      </div>

      {/* MODAL DE DEPORTES */}
      <SportsModal
        isOpen={isSportsModalOpen}
        sports={sports}
        selectedSports={selectedSports}
        onToggle={toggleSport}
        onClose={() => {
          setValue("sports", selectedSports);
          setIsSportsModalOpen(false);
        }}
      />

    </div>
  );
}
