import "../css/login/login.css";
import logo from "../assets/logoZportia.png";
import player from "../assets/img1Login.png";
import Swal from "sweetalert2";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "../schemas/loginSchema";
import { loginRequest } from "../services/AuthService";
import { useContext, useState } from "react";
import { ZportiaContext } from "../context/ZportiaContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const zportia = useContext(ZportiaContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    if (loading) return; // evita doble click
    setLoading(true);

    try {
      const res = await loginRequest(data.email, data.password);
      await zportia?.login(res.token);

      Swal.fire({
        title: "Login correcto",
        text: "Bienvenido de nuevo",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0099ff",
        customClass: { popup: "zportia-alert" }
      });

      const checkRoleAndNavigate = setInterval(() => {
        if (zportia?.user) {
          clearInterval(checkRoleAndNavigate);
          if (zportia.user.role === "ADMIN") navigate("/admin/dashboard");
          else navigate("/home");
        }
      }, 50);

      setTimeout(() => {
        clearInterval(checkRoleAndNavigate);
        navigate("/home");
      }, 3000);

    } catch (err: any) {
      const msg = err.message?.toUpperCase?.() || "";

      if (msg.includes("BLOQUEADO")) {
        Swal.fire({
          title: "Usuario bloqueado",
          text: "Tu cuenta ha sido bloqueada por un administrador.",
          icon: "error",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#ff006e",
          customClass: { popup: "zportia-alert" }
        });
        return;
      }

      if (msg.includes("ELIMINADO")) {
        Swal.fire({
          title: "Usuario eliminado",
          text: "Tu cuenta ha sido eliminada por un administrador.",
          icon: "error",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#ff006e",
          customClass: { popup: "zportia-alert" }
        });
        return;
      }

      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
        customClass: { popup: "zportia-alert" }
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">
          <div className="login-card">
            <img src={logo} alt="Sportia Logo" className="login-logo" />

            <h2 className="login-title">INICIO DE SESIÓN</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">

              <div className="form-group">
                <label>Email</label>
                <input type="email" {...register("email")} />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" {...register("password")} />
                {errors.password && <span className="error">{errors.password.message}</span>}
              </div>

              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" /> Remember me
                </label>
                <a className="forgot">Forgot password?</a>
              </div>

              {/* BOTÓN LOGIN BLOQUEADO MIENTRAS CARGA */}
              <button
                type="submit"
                className="btn-login"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Sign in"}
              </button>

              <label className="text-register">
                ¿Todavía no tienes cuenta?
              </label>

              <button
                className="btn-secondary"
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
              >
                Registrarse
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <img src={player} alt="Player" className="login-image" />
        </div>

      </div>
    </div>
  );
}
