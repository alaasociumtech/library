import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <h2>Library</h2>
      <ul>
        {role === "Admin" ? (
          <>
            <li>
              <Link to="/admin">Dasboard</Link>
            </li>
            <li>
              <Link to="/manageBooks">Manage Books</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/client">Profile</Link>
            </li>
            <li>
              <Link to="/bookList">Books</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
