import BookManagement from "./BookManagement";
import AuthorManagement from "./AuthorManagement";
import "../App.css";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1 className="heading">Admin Dashboard - Library Management System</h1>
      <div className="grid">
        <div>
          <h2 className="sub-heading">Book Management</h2>
          <BookManagement />
        </div>
        <div>
          <h2 className="sub-heading">Author Management</h2>
          <AuthorManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
