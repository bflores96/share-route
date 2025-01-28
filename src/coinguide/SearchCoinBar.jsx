import PropTypes from "prop-types"; // Importa PropTypes

const SearchCoinBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="search-section">
      <div className="search-container">
        <input
          type="text"
          id="search-coin"
          placeholder=" "
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="search-coin" className="search-label">
          Buscar por país...
        </label>
      </div>
    </section>
  );
};

// Añadir validaciones de PropTypes
SearchCoinBar.propTypes = {
  searchTerm: PropTypes.string.isRequired, // searchTerm debe ser una cadena y es requerido
  setSearchTerm: PropTypes.func.isRequired, // setSearchTerm debe ser una función y es requerido
};

export default SearchCoinBar;
