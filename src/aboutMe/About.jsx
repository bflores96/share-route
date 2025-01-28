import "./about.css";
import aboutImage from "../assets/img/aboutjapan.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>Sobre mí</h1>
          <p>
            Hola, mi nombre es <strong>Bárbara</strong> y me encanta viajar
            tanto como a ti. Tengo un <strong>grado superior</strong> en guía,
            información y asistencias turísticas. Ahora que he cambiado mi rumbo
            laboral hacia la <strong>programación</strong>, quiero juntar las
            dos cosas que me apasionan: <strong>crear una web</strong> donde
            compartir mis itinerarios de viajes a diferentes destinos y de
            diversa duración. Espero que esta web te sirva de{" "}
            <strong>inspiración</strong> para tus aventuras y que descubras
            lugares que quizás no habías considerado antes. ¡Espero que te
            guste!
          </p>
          <div className="tiktok-announcement">
            <FontAwesomeIcon
              icon={faTiktok}
              size="2x"
              className="tiktok-icon"
            />
            <p>
              <strong>¡Próximo directo en TikTok!</strong> Voy a hacer directos
              en mi próximo viaje a Japón. Recuerda que puedes ver mi
              itinerario.
              <br />
              <strong>📅 Día 10 de Noviembre en Odaiba:</strong> te mostraré el
              evento <strong>Tokyo Drift</strong>. <br />
              <em>
                Ten en cuenta que el horario de Japón es 8 horas más que en
                España.
              </em>{" "}
              <br />
              <strong>¡Sígueme para no perdértelo!</strong>{" "}
              <span className="tiktok-username">@barbixflor</span>
            </p>
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
