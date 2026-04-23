import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NavBar from "../components/Navbar";
import Home from "../pages/Home";
import Explore from "../pages/Explora";
import ProfilePage from "../pages/Profile";
import ProtectedRoute from "../guards/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          {/* HOME público */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* PÚBLICAS */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTEGIDAS */}
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
