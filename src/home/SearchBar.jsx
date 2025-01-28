import PropTypes from "prop-types";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="search-section">
      <div className="search-container">
        {" "}
        {/* Contenedor adicional */}
        <input
          type="text"
          id="search"
          placeholder=" "
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="search" className="search-label">
          Buscar itinerarios...
        </label>
      </div>
    </section>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
