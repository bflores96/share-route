import "./Faq.css";

const Faq = () => {
  return (
    <div className="faq-container">
      <div className="faq-content">
        <div className="faq-text">
          <h1>Preguntas Frecuentes</h1>
          <p>
            Aquí encontrarás respuestas a las preguntas más comunes sobre
            nuestra plataforma y cómo utilizarla.
          </p>
        </div>
        <div className="faq-questions">
          <div className="faq-item">
            <h2>¿Cuál es el propósito de Compartir Ruta?</h2>
            <p>
              Compartir Ruta es una web dedicada a compartir itinerarios de
              viaje detallados para ayudar e inspirar a otros viajeros.
            </p>
          </div>
          <div className="faq-item">
            <h2>¿Es gratis usar la plataforma?</h2>
            <p>
              Sí, nuestra plataforma es completamente gratuita y accesible para
              todos los usuarios.
            </p>
          </div>
          <div className="faq-item">
            <h2>¿Hay planes para añadir más destinos?</h2>
            <p>
              Sí, seguimos explorando nuevos destinos y actualizando la web con
              más itinerarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
