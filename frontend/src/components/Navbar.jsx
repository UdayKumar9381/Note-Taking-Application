import { Link } from 'react-router-dom';
import { logout } from '../services/auth';
import './Navbar.css';

export default function Navbar() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}
