import "../css/login/login.css";
import logo from "../assets/logoZportia.png";
import player from "../assets/img1Login.png";
import Swal from "sweetalert2";


import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "../schemas/loginSchema";
import { loginRequest } from "../services/AuthService";
import { useContext } from "react";
import { ZportiaContext } from "../context/ZportiaContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const zportia = useContext(ZportiaContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await loginRequest(data.email, data.password);

      // Guardamos token y disparamos la carga del usuario
      await zportia?.login(res.token);

      Swal.fire({
        title: "Login correcto",
        text: "Bienvenido de nuevo",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0099ff",
        customClass: {
          popup: "zportia-alert",
        }
      });

      // Esperamos a que el contexto cargue el usuario completamente
      const checkRoleAndNavigate = setInterval(() => {
        if (zportia?.user) {
          clearInterval(checkRoleAndNavigate);
          if (zportia.user.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }
      }, 50);

      // Fallback: si no carga en 3 segundos, ir a home
      setTimeout(() => {
        clearInterval(checkRoleAndNavigate);
        navigate("/home");
      }, 3000);

    } catch {
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
        customClass: {
          popup: "zportia-alert",
        }
      });
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

              <button type="submit" className="btn-login">Sign in</button>

              <label className="text-register">
                ¿Todavía no tienes cuenta?
              </label>

              <button className="btn-secondary" onClick={() => navigate("/register")}>
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