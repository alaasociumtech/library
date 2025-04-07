import { ErrorMessage, Field, Form, Formik } from "formik";
import { SignUpSchema } from "../schemas";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
    dateOfBirth: "",
    gender: "",
    description: "",
    image: null,
  };

  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(
      (user) => user.email === values.email
    );

    if (userExists) {
      alert("Email is alread registered");
      return;
    }

    if (values.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const userData = {
          ...values,
          image: reader.result,
        };
        const updatedUsers = [...existingUsers, userData];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        navigate("/");
      };
      reader.readAsDataURL(values.image);
    } else {
      const userData = {
        ...values,
        image: "",
      };
      const updatedUsers = [...existingUsers, userData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      navigate("/");
    }
  };
  return (
    <div className="signup">
      <h2 className="title">Signup</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="signup-form">
            <div>
              <div className="input-field">
                <label>Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div className="input-field">
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="input-field">
                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
            </div>
            <div>
              <div className="input-field">
                <label>Role:</label>
                <Field as="select" name="role">
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Client">Client</option>
                </Field>
                <ErrorMessage name="role" component="div" />
              </div>
              <div>
                <label>Date of Birth:</label>
                <Field type="date" name="dateOfBirth" />
                <ErrorMessage name="dateOfBirth" component="div" />
              </div>
              <div>
                <label>Gender:</label>
                <Field as="select" name="gender">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" />
              </div>
            </div>
            <div>
              <div>
                <label>Description</label>
                <Field as="textarea" name="description" />
                <ErrorMessage name="description" component="div" />
              </div>
              <div>
                <label>Profile picture</label>
                <input
                  type="file"
                  onChange={(event) =>
                    setFieldValue("image", event.currentTarget.files[0])
                  }
                />
                <ErrorMessage name="image" component="div" />
              </div>
            </div>
            <div className="signup-btn">
              <button type="submit">Signup</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
