// src/components/Header.jsx
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div id="header-main-container" className="header-main-container">
        {/* Logo Bölümü */}
        <div id="header-logo" className="header-logo">
          {/* public/logo1.mp4 içine koyduysanız: */}
          <video
            className="header-logo-video"
            src="/logo1.mp4"
            autoPlay
            loop
            muted
          />
        </div>

        {/* Navigasyon */}
        <div id="header-nav" className="header-nav">
          <ul className="nav-links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/babysitting-announcement">
                Babysitting announcement
              </Link>
            </li>
          </ul>
        </div>

        {/* Sosyal Medya İkonları */}
        <div id="header-social-media" className="header-social-media">
          <ul className="social-media-icons">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>

        {/* Auth Butonları */}
        <div id="header-auth-buttons" className="header-auth-buttons">
          <ul className="auth-buttons">
            <li>
              <Link to="/signin">
                <button className="SignIn-btn">Sign In</button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
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
