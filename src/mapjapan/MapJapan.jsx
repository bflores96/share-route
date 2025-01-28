const MapJapan = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1fY15f0FUp6WHsX06leHvlmi2rPD8VK4&ehbc=2E312F"
        width="100%"
        height="500"
        style={{
          border: "0",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        allowFullScreen
        loading="lazy"
        title="Mapa Japón"
      ></iframe>
    </div>
  );
};

export default MapJapan;
