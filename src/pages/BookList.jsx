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

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAvailability =
      availabilityFilter === "All"
        ? true
        : availabilityFilter === "Available"
        ? book.available
        : !book.available;

    return matchesSearch && matchesAvailability;
  });

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  const handleBorrow = (bookToBorrow) => {
    const updatedBooks = books.map((book) =>
      book.id === bookToBorrow.id ? { ...book, available: false } : book
    );

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setSnackbarMsg(`You've successfully borrowed "${bookToBorrow.title}"`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="dashBoard">
      <Sidebar role="Client" />
      <div className="content">
        <h2>Available Books</h2>
        <div className="bookSearchFilter">
          <input
            className="bookSearchInput"
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="bookSelect"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <TableContainer component={Paper} sx={{ mt: "10px" }}>
          <Table aria-label="books table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Author</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>
                  Availability
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      {book.available ? "Available" : "Not Available"}
                    </TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBorrow(book)}
                        disabled={!book.available}
                      >
                        Borrow
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

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BookList;
