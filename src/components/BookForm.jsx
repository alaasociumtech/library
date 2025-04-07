import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BookSchema } from "../schemas/index";

const BookForm = ({ initialData, onClose, onSubmit }) => {
  const initialValues = {
    title: initialData?.title || "",
    author: initialData?.author || "",
    description: initialData?.description || "",
  };
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={BookSchema}
          onSubmit={(values) => {
            const book = {
              ...initialData,
              ...values,
              available: initialData?.available ?? true,
              id: initialData?.id || Date.now().toString(),
            };
            onSubmit(book);
          }}
        >
          <Form>
            <div>
              <label>Title:</label>
              <Field as={TextField} name="title" />
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label>Author:</label>
              <Field as={TextField} name="author" />
              <ErrorMessage name="author" component="div" />
            </div>
            <div>
              <label>Description:</label>
              <Field as={TextField} name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {initialData ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;
