import { useState } from "react";

const Digimon = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  let className = "digimon-card";

  if (!loaded) {
    className += " hidden";
  }

  const digimonDescription = data.descriptions.find(
    (description) => description.language === "jap");

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);

    // Guardar en el localStorage
    if (!isFavorite) {
      // Si no es favorito, agrégalo al localStorage
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push(data);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      // Si ya es favorito, quítalo del localStorage
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = favorites.filter((favorite) => favorite.id !== data.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <article className={className} onClick={handleToggleDetails}>
      <h2>{data.name.toUpperCase()}</h2>
      <img src={data.images[0].href} alt={`imagen de ${data.name}`} onLoad={() => setLoaded(true)} />

      <div>
        <button onClick={handleToggleFavorite}>
          {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>

      {showDetails && (
        <div>
          <p>{digimonDescription ? digimonDescription.description : 'Descripción no disponible'}</p>
        </div>
      )}
    </article>
  );
};

export default Digimon;
