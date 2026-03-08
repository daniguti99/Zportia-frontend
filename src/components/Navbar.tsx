import { Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav>Mi navbar</nav>
      <Outlet />
    </>
  );
}