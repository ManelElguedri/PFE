import "./Header.css";
import { Link } from "react-router-dom";
import logoVideo from './logo1.mp4';
function Header() {
  return (
    <header>
      <div id="header-main-container" className="header-main-container">
        <div id="header-logo">
          {/* Utiliser la vidéo comme logo */}
          <video className="header-logo-video" autoPlay loop muted>
            <source src={logoVideo} type="video/mp4" />
          </video>
        </div>
        <div id="header-nav">
          <ul className="nav-links">
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Babysitting-announcement">Babysitting announcement</Link>
            </li>
          </ul>
        </div>
        <div id="header-social-media">
          <ul className="social-media-icons">
            <li>
              <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
        <div id="header-auth-buttons">
          <ul className="auth-buttons">
            <li>
              <Link to="/Signin">
                <button className="SignIn-btn">Sign In</button>
              </Link>
            </li>
            <li>
              <Link to="/Signup">
                <button className="SignUp-btn">Sign Up</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;


