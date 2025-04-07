import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import BookForm from "../components/BookForm";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  const saveBooks = (updatedBooks, message) => {
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setSnackbarMsg(message);
    setSnackbarOpen(true);
  };

  const handleDelete = (id) => {
    const updated = books.filter((book) => book.id !== id);
    saveBooks(updated, "Book deleted.");
  };

  const handleToggleAvailability = (id) => {
    const updated = books.map((book) =>
      book.id === id ? { ...book, available: !book.available } : book
    );
    saveBooks(updated, "Availability updated.");
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };
  const handleAdd = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleFormSubmit = (newBook) => {
    let updated;
    if (editingBook) {
      updated = books.map((b) => (b.id === newBook.id ? newBook : b));
      saveBooks(updated, "Book updated.");
    } else {
      updated = [...books, newBook];
      saveBooks(updated, "Book added.");
    }
    setShowForm(false);
  };

  return (
    <div className="dashBoard">
      <Sidebar role="Admin" />
      <div className="content">
        <h2>Manage Books</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{
            my: "12px",
          }}
        >
          Add Book
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="books table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.length > 0 ? (
                books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>
                      {book.available ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ mr: "5px" }}
                        size="small"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleToggleAvailability(book.id)}
                      >
                        {book.available ? "Mark Unavailable" : "Mark Available"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Books found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {showForm && (
          <BookForm
            initialData={editingBook}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ManageBooks;
