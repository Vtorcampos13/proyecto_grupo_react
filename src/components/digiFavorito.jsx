import React from "react";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div>
      <h2>Digimon Favoritos</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;