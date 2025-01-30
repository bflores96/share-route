import { Link } from "react-router-dom";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="about">
          <h3>
            <Link to="/about" className="footer-link">
              Sobre mí
            </Link>
          </h3>
          <p>
            "Apasionada viajera y programadora, aquí comparto mis itinerarios de
            viaje para inspirar tus aventuras."
          </p>
        </div>
        <div className="contact">
          <h3>Contacto</h3>
          <p>Email: shareroute@gmail.com</p>
          <p>Teléfono: +123 456 789</p>
          <div className="social-icons">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Share Route. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
