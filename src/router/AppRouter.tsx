import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NavBar from "../components/Navbar";
import Home from "../pages/Home";
import Explore from "../pages/Explora";
import ProfilePage from "../pages/Profile";
import ProtectedRoute from "../guards/ProtectedRoute";
import AdminRoute from "../guards/AdminRoute";
import CreatePost from "../pages/CreatePost";
import AdminHome from "../pages/Admin/AdminHome";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import EditProfile from "../pages/EditProfile";
import AdminPostsPage from "../pages/Admin/AdminPosts";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* NAVBAR ENVOLVIENDO TODAS LAS RUTAS */}
        <Route path="/" element={<NavBar />}>

          {/* HOME público */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          {/* PÚBLICAS */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* PROTEGIDAS (USER + ADMIN) */}
          <Route
            path="explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          <Route
            path="create-post"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit/:postId"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          {/* 🔥 RUTAS ADMIN */}
          <Route
            path="dashboard"
            element={
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            }
          />

          <Route
            path="admin/users"
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            }
          />

          <Route
            path="admin/posts"
            element={
              <AdminRoute>
                <AdminPostsPage />
              </AdminRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Home />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
