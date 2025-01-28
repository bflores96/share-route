import { useState } from "react";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import "./coinguide.css";
import SearchCoinBar from "./SearchCoinBar";

const CoinGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const coinData = [
    { country: "Japón", currency: "Yen", rateToYen: 165.62 },
    { country: "Estados Unidos", currency: "Dólar", rateToDollar: 1.1 },
    { country: "Reino Unido", currency: "Libra Esterlina", rateToPound: 0.85 },
    { country: "Suiza", currency: "Franco Suizo", rateToFranc: 1.03 },
    { country: "México", currency: "Peso Mexicano", rateToPeso: 21.75 },
    {
      country: "Canadá",
      currency: "Dólar Canadiense",
      rateToCanadianDollar: 1.45,
    },
    { country: "China", currency: "Yuan Chino", rateToYuan: 7.75 },
    { country: "Brasil", currency: "Real Brasileño", rateToReal: 5.5 },
    { country: "Suecia", currency: "Corona Sueca", rateToKrona: 10.25 },
  ];

  const filteredCoins = coinData.filter((coin) =>
    coin.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const euroAmounts = [1, 5, 10, 15, 20, 25, 30, 40, 50];

  const downloadImage = async (coinElement, country) => {
    const button = coinElement.querySelector(".btn-download");

    button.style.visibility = "hidden";
    coinElement.style.boxShadow = "none";
    coinElement.style.transition = "none";

    const canvas = await html2canvas(coinElement, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });

    button.style.visibility = "visible";
    coinElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    coinElement.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${country}_conversions.png`;
    link.click();
  };

  return (
    <div className="coin-guide">
      <div className="title-container">
        <h1>
          Información de Monedas
          <FontAwesomeIcon icon={faCommentsDollar} className="title-icon" />
        </h1>
      </div>
      <h2 className="subtitle">
        Busca la moneda de un país y conoce su valor en euros. También puedes
        descargar la imagen de la conversión para tenerla siempre a mano durante
        tu próximo viaje.
      </h2>

      <div className="search-section">
        <SearchCoinBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div
        className="coin-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin, index) => (
            <div
              key={index}
              className="card-coin"
              ref={(el) => (coin.ref = el)}
            >
              <h3>{coin.country}</h3>
              <p className="currency-name">{coin.currency}</p>
              <div className="conversion-list">
                {euroAmounts.map((amount) => (
                  <p key={amount}>
                    {amount}€ ={" "}
                    {coin.rateToYen
                      ? `${(amount * coin.rateToYen).toFixed(2)}¥`
                      : coin.rateToDollar
                      ? `${(amount * coin.rateToDollar).toFixed(2)}$`
                      : coin.rateToPound
                      ? `${(amount * coin.rateToPound).toFixed(2)}£`
                      : coin.rateToFranc
                      ? `${(amount * coin.rateToFranc).toFixed(2)}CHF`
                      : coin.rateToPeso
                      ? `${(amount * coin.rateToPeso).toFixed(2)}MXN`
                      : coin.rateToCanadianDollar
                      ? `${(amount * coin.rateToCanadianDollar).toFixed(2)}CAD`
                      : coin.rateToYuan
                      ? `${(amount * coin.rateToYuan).toFixed(2)}CNY`
                      : coin.rateToReal
                      ? `${(amount * coin.rateToReal).toFixed(2)}BRL`
                      : coin.rateToKrona
                      ? `${(amount * coin.rateToKrona).toFixed(2)}SEK`
                      : `${amount}€`}
                  </p>
                ))}
              </div>
              <button
                onClick={() => downloadImage(coin.ref, coin.country)}
                className="btn-download"
              >
                Descargar Imagen
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron datos de moneda para ese país.</p>
        )}
      </div>
    </div>
  );
};

export default CoinGuide;
