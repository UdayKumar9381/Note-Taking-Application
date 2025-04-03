import { Link } from "react-router-dom";
import "./Home.css"; // Import the external CSS file

export default function Home() {
  return (
    <div className="home-container">
      
      {/* Background Animation */}
      <div className="background-animation">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="floating-circle" />
        ))}
      </div>

      {/* Glassmorphic Card */}
      <div className="glass-card">
        <h1 className="title">Welcome to Note Taking App</h1>
        
        <p className="description">
          Organize your thoughts and ideas easily. Our app provides a simple and 
          effective way to store and access your notes anytime, anywhere.
        </p>

        <div className="button-container">
          <button className="btn login-btn">
            <Link to="/login">Login</Link>
          </button>
          <button className="btn register-btn">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
