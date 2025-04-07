import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <nav>
      <h1>Library Management</h1>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
