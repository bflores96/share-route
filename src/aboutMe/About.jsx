import "./about.css";
import aboutImage from "../assets/img/aboutjapan.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faFaceLaughWink } from "@fortawesome/free-regular-svg-icons";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>Sobre mí</h1>
          <p>
            Hola, mi nombre es <strong>Bárbara</strong> y me encanta viajar.
            Tengo un <strong>Grado Superior</strong> en Guía, Información y
            Asistencias Turísticas y ahora, combinando mi pasión con la{" "}
            <strong>programación</strong>, he creado esta web para compartir mis
            itinerarios de viaje. Espero que te sirvan de{" "}
            <strong>inspiración</strong> y descubras lugares nuevos.
            <FontAwesomeIcon
              icon={faFaceLaughWink}
              className="fa-face-laugh-wink"
            />
          </p>

          <div className="tiktok-announcement">
            <h2>¿Necesitas un itinerario personalizado?</h2>
            <p>
              Si buscas un <strong>itinerario a medida</strong>, puedo diseñarlo
              según tus preferencias de alojamiento y actividades. Escríbeme a{" "}
              <strong>shareroute@gmail.com</strong> y te ayudaré a un{" "}
              <strong>precio simbólico</strong>. Me encanta investigar destinos
              y así podré añadirlos a la web para otros viajeros. ✈️🌍
            </p>
            <p>
              También puedes seguirme en <strong>TikTok</strong> y ayudarme a
              seguir creando contenido sobre viajes.{" "}
              <strong>¡Únete a la comunidad viajera!</strong>
            </p>
            <div className="tiktok-info">
              <FontAwesomeIcon
                icon={faTiktok}
                size="2x"
                className="tiktok-icon"
              />
              <span className="tiktok-username"> @barbixflor</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="Foto Bárbara en Japón" />
        </div>
      </div>
    </div>
  );
};

export default About;
