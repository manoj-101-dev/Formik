import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../App.css"; // Import CSS file

const AuthorManagement = () => {
  const [authors, setAuthors] = useState([]);
  const [editId, setEditId] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  const initialValues = {
    name: "",
    biography: "",
    dob: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (editId !== null) {
      const updatedAuthors = authors.map((author) =>
        author.id === editId ? { ...values, id: editId } : author
      );
      setAuthors(updatedAuthors);
      setEditId(null);
    } else {
      const newAuthor = { ...values, id: idCounter };
      setIdCounter(idCounter + 1);
      setAuthors([...authors, newAuthor]);
    }
    resetForm();
  };

  const handleEdit = (author) => {
    setEditId(author.id);
    initialValues.name = author.name;
    initialValues.biography = author.biography;
    initialValues.dob = author.dob;
  };

  const handleDelete = (id) => {
    const updatedAuthors = authors.filter((author) => author.id !== id);
    setAuthors(updatedAuthors);
  };

  return (
    <div className="container">
      <h1 className="heading">Manage Authors</h1>

      <div>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Please enter the author name";
            }
            if (!values.biography) {
              errors.biography = "Please enter the author Bio";
            }
            if (!values.dob) {
              errors.dob = "Date Required";
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
                  name="name"
                  placeholder="Enter Author's Name"
                  className="input"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-field">
                <Field
                  type="text"
                  name="biography"
                  placeholder="Enter Author's Biography"
                  className="input"
                />
                <ErrorMessage
                  name="biography"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-field">
                <Field
                  type="date"
                  name="dob"
                  placeholder="Enter Author's DOB"
                  className="input"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {editId !== null ? "Update Author" : "Add Author"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="card-container">
          {authors.map((author) => (
            <div key={author.id} className="card">
              <div className="card-content">
                <div className="card-title">{author.name}</div>
                <p className="card-text">{author.biography}</p>
                <p className="card-text">DOB: {author.dob}</p>
              </div>
              <div className="button-container">
                <button
                  onClick={() => handleEdit(author)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(author.id)}
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

export default AuthorManagement;
