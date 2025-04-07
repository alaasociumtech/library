import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import UserManagement from "./pages/UserManagement";
import ClientProfile from "./pages/ClientProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import BookList from "./pages/BookList";
import ManageBooks from "./pages/ManageBooks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route element={<MainLayout />}>
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <UserManagement />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/client"
            element={
              <ProtectedRoute role="Client">
                <ClientProfile />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/bookList" element={<BookList />}></Route>
          <Route path="/manageBooks" element={<ManageBooks />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
