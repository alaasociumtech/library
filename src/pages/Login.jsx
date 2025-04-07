import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../schemas";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = storedUsers.find(
      (user) =>
        user.email.toLowerCase() === values.email.toLowerCase() &&
        user.password === values.password
    );

    if (foundUser) {
      localStorage.setItem("role", foundUser.role);
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate(foundUser.role === "Admin" ? "/admin" : "/client");
    } else {
      alert("invalid credentials");
    }

    setSubmitting(false);
  };

  return (
    <div className="login">
      <h2 className="title">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="login-form">
          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          <div>
            <p className="signup-text">Don't have an account?</p>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
