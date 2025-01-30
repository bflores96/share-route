import { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import headerImage from "../assets/img/index.png";
import SearchBar from "./SearchBar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Array de itinerarios
  const itineraries = [
    {
      id: "paris-2024",
      title: "París Enero 2024 desde DisneyLand 🇫🇷",
      duration: "1 día",
      details: "Torre Eiffel, Museo del Louvre, Mercados Navideños.",
    },
    {
      id: "japan-2024",
      title: "Japón Noviembre 2024 🇯🇵🍂",
      duration: "2 semanas",
      details:
        "Tokio, Kioto, visita Kiyomizu-dera, alquiler de kimonos en Yumeyakata Gojo, etc.",
    },
    {
      id: "japan-2023",
      title: "Japón Abril 2023 🇯🇵🌸",
      duration: "2 semanas",
      details:
        "Primera vez en Japón, acompañada de un guía 'JAPÓN ENTRE AMIGOS', la mejor decisión.",
    },
  ];

  // Filtrar itinerarios según el término de búsqueda
  const filteredItineraries = itineraries.filter((itinerary) =>
    itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <section className="home-header">
        <img
          src={headerImage}
          alt="Rute Share - Encuentra inspiración para tus próximos viajes"
          className="header-image"
        />
      </section>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className="itineraries">
        {filteredItineraries.length > 0 ? (
          filteredItineraries.map((itinerary) => (
            <div key={itinerary.id} className="card-itinerary">
              <h3>{itinerary.title}</h3>
              <p>{itinerary.duration}</p>
              <p>{itinerary.details}</p>
              <Link to={`/itinerary/${itinerary.id}`} className="btn-see-more">
                Ver itinerario completo
              </Link>
            </div>
          ))
        ) : (
          <p>No se encontraron itinerarios.</p>
        )}

        {/* Tarjetas adicionales "Próximamente..." */}
        <div className="card-itinerary coming-soon">
          <h3>Próximamente...</h3>
          <p>Estamos preparando nuevos itinerarios para ti.</p>
        </div>
        <div className="card-itinerary coming-soon">
          <h3>Próximamente...</h3>
          <p>Pronto podrás explorar más destinos increíbles.</p>
        </div>
        <div className="card-itinerary coming-soon">
          <h3>Próximamente...</h3>
          <p>Permanece atento para más itinerarios emocionantes.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
