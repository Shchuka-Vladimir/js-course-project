function pouringIconsFavorites(elementFilms) {
  const iconFavorites = elementFilms.querySelectorAll(".icon-favorites");
  quantityFavoritesFilms.textContent = `(${localeKeys.favorites.length})`;
  iconFavorites.forEach((element) => {
    if (localeKeys.favorites.includes(element.dataset.id)) {
      element.classList.add("material-fill");
    }
  });
}
