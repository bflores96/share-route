import "./itinerary.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ItineraryJapan2023 = () => {
  return (
    <div className="itinerary">
      <header className="header">
        <h1>Japón Marzo-Abril 2023 🇯🇵🌸</h1>
        <h2>
          Itinerario <strong>14 días</strong>
        </h2>
        <p>
          Un recorrido único entre ciudades vibrantes, paisajes de ensueño y
          cultura tradicional en <strong>primavera</strong>.
        </p>
      </header>

      <section className="intro">
        <h2>
          Primera experiencia en Japón de la mano de{" "}
          <strong>JAPÓN ENTRE AMIGOS</strong>
        </h2>
        <p>
          La primera vez que fuimos a Japón fue en primavera de 2023 para
          disfrutar del <strong>sakura</strong>. Viajamos de la mano de un guía,
          en un grupo, y fue la mejor decisión para nuestra primera visita. Con
          su ayuda, descubrimos los lugares más emblemáticos y resolvimos todas
          nuestras dudas al instante. Fue una experiencia increíble que, además,
          resultó aún más divertida gracias a las personas diferentes y únicas
          que conocimos en el grupo.
        </p>
        <p>
          Consulta el itinerario completo a continuación o descarga el PDF desde{" "}
          <a
            href="https://drive.google.com/file/d/1p_AfURjcQyTUsU6TDp0nFTZJckmeDWOo/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            este enlace
          </a>
          .
        </p>
      </section>

      <div className="pdf-embed">
        <iframe
          src="https://drive.google.com/file/d/1p_AfURjcQyTUsU6TDp0nFTZJckmeDWOo/preview"
          frameBorder="0"
          width="100%"
          height="600"
          title="Itinerario Japón 2023"
        ></iframe>
      </div>
    </div>
  );
};

export default ItineraryJapan2023;
