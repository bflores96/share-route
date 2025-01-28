import { useState } from "react";
import html2canvas from "html2canvas";
import "./coinguide.css";
import SearchCoinBar from "./SearchCoinBar";

const CoinGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const coinData = [
    { country: "Japón", rateToYen: 165.62 },
    { country: "Estados Unidos", rateToDollar: 1.1 },
  ];

  const filteredCoins = coinData.filter((coin) =>
    coin.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const euroAmounts = [1, 5, 10, 15, 20, 25, 30, 40, 50];

  const downloadImage = async (coinElement, country) => {
    const button = coinElement.querySelector(".btn-download");

    // Oculta el botón y desactiva las sombras y transiciones
    button.style.visibility = "hidden";
    coinElement.style.boxShadow = "none";
    coinElement.style.transition = "none";

    // Captura la imagen
    const canvas = await html2canvas(coinElement, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });

    // Restaura el botón, sombras y transiciones después de la captura
    button.style.visibility = "visible";
    coinElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    coinElement.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

    // Descarga la imagen
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${country}_conversions.png`;
    link.click();
  };

  return (
    <div className="coin-guide">
      <h1>Información de Monedas</h1>
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
              <div className="conversion-list">
                {euroAmounts.map((amount) => (
                  <p key={amount}>
                    {amount}€ ={" "}
                    {coin.rateToYen
                      ? `${(amount * coin.rateToYen).toFixed(2)}¥`
                      : `${(amount * coin.rateToDollar).toFixed(2)}$`}
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
