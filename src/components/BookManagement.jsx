import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css"; // Import CSS file

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  const initialValues = {
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (editId !== null) {
      const updatedBooks = books.map((book) =>
        book.id === editId ? { ...values, id: editId } : book
      );
      setBooks(updatedBooks);
      setEditId(null);
    } else {
      const newBook = { ...values, id: idCounter };
      setIdCounter(idCounter + 1);
      setBooks([...books, newBook]);
    }
    resetForm();
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    initialValues.title = book.title;
    initialValues.author = book.author;
    initialValues.isbn = book.isbn;
    initialValues.publicationDate = book.publicationDate;
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <div className="container">
      <h1 className="heading">Manage Books</h1>
      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Book Title Required";
            }
            if (!values.author) {
              errors.author = "Author Required";
            }
            if (!values.isbn) {
              errors.isbn = "ISBN Number Required";
            }
            if (!values.publicationDate) {
              errors.publicationDate = "Publication Date Required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <div className="input-field">
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className="input"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-field">
                <Field
                  type="text"
                  name="author"
                  placeholder="Enter Author"
                  className="input"
                />
                <ErrorMessage
                  name="author"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-field">
                <Field
                  type="text"
                  name="isbn"
                  placeholder="Enter ISBN"
                  className="input"
                />
                <ErrorMessage
                  name="isbn"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-field">
                <Field
                  type="date"
                  name="publicationDate"
                  placeholder="Enter Publication Date"
                  className="input"
                />
                <ErrorMessage
                  name="publicationDate"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {editId !== null ? "Update Book" : "Add Book"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="card-container">
          {books.map((book) => (
            <div key={book.id} className="card">
              <div className="card-content">
                <div className="card-title">{book.title}</div>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">ISBN: {book.isbn}</p>
                <p className="card-text">
                  Publication Date: {book.publicationDate}
                </p>
              </div>
              <div className="button-container">
                <button
                  onClick={() => handleEdit(book)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
