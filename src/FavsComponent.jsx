// función para añadir o quitar digimons de favoritos en localStorage
function addOrRemoveFavs(idDigimon) {
    const favs = JSON.parse(localStorage.getItem("favs")) || {};

    if (!favs[idDigimon]) {
        favs[idDigimon] = true;
    } else {
        delete favs[idDigimon];
    }

    localStorage.setItem("favs", JSON.stringify(favs));
}

// función para comprobar si es fav o no
function isFav(idDigimon) {
    const favs = JSON.parse(localStorage.getItem("favs")) || {};
    return favs[idDigimon] || false;
}

export {
    addOrRemoveFavs,
    isFav,
};
