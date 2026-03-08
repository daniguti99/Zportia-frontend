import "../css/login/login.css";
import logo from "../assets/logoZportia.png";
import player from "../assets/img1Login.png";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "../schemas/loginSchema";
import { loginRequest } from "../services/AuthService";
import { useContext } from "react";
import { ZportiaContext } from "../context/ZportiaContext";

export default function Login() {
  const zportia = useContext(ZportiaContext);

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
      zportia?.login(res.token);
      alert("Login correcto");
    } catch {
      alert("Credenciales incorrectas");
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

              <button type="button" className="btn-google">
                Sign in with Google
              </button>

              <p className="signup-text">
                Don't have an account? <a>Sign up for free!</a>
              </p>
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