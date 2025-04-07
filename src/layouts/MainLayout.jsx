import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

const MainLayout = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
