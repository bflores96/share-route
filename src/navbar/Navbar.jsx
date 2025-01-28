import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/img/logorute.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú hamburguesa
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ubicación actual

  // Función para manejar el scroll
  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/"); // Redirigir al usuario al inicio
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  // Usar useEffect para añadir el event listener de scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escuchar cambios de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Clases dinámicas para el navbar
  let navbarClasses = ["navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  // Manejo del menú hamburguesa
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Comprobamos si user.photoURL es válido antes de mostrar la imagen
  const userPhotoURL = user?.photoURL ? user.photoURL : null;

  return (
    <nav className={navbarClasses.join(" ")}>
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Explora Mi Ruta" className="navbar-logo" />
        </Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        <ul className={`navbar-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/coinguide"
              className={location.pathname === "/coinguide" ? "active" : ""}
            >
              Información sobre moneda
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={location.pathname === "/faq" ? "active" : ""}
            >
              Preguntas Frecuentes
            </Link>
          </li>
          <li>
            <Link
              to="/forum"
              className={location.pathname === "/forum" ? "active" : ""}
            >
              Foro
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            {userPhotoURL ? (
              <img src={userPhotoURL} alt="Avatar" className="user-avatar" />
            ) : (
              <span>No photo</span> // Si no hay foto, se muestra un texto alternativo
            )}
            <span>{user.displayName}</span> {/* Separado de la foto */}
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <button onClick={() => navigate("/forum")}>Iniciar sesión</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
