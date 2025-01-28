import PropTypes from "prop-types"; // Importa PropTypes

const SearchCoinBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-coin-bar">
      <input
        type="text"
        placeholder="Buscar por país..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

// Añadir validaciones de PropTypes
SearchCoinBar.propTypes = {
  searchTerm: PropTypes.string.isRequired, // searchTerm debe ser una cadena y es requerido
  setSearchTerm: PropTypes.func.isRequired, // setSearchTerm debe ser una función y es requerido
};

export default SearchCoinBar;
