import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login"
import Register from "../pages/Register"
import NavBar from "../components/Navbar";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavBar />}>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path='*' element={<h1>Error 404</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
