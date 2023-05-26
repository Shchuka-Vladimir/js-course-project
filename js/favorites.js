const quantityFavoritesFilms = document.querySelector(
  ".quantity-favorites-films"
);
const buttonFavorites = document.querySelector(".button-favorites");

buttonFavorites.addEventListener("click", () => showFavorites());

loadStyleButtonFavorites();

function saveFavorites(event) {
  event.preventDefault();
  const target = event.target;
  if (!target.classList.contains("material-fill")) {
    target.classList.add("material-fill");
    localeKeys.favorites.push(target.dataset.id);
  } else {
    target.classList.remove("material-fill");
    localeKeys.favorites = localeKeys.favorites.filter(
      (id) => target.dataset.id !== id
    );
    removeFilm(target);
  }
  storeLocaleKeys();
  quantityFavoritesFilms.textContent = `${localeKeys.favorites.length}`;
}

function removeFilm(target) {
  if (localeKeys.statusButtonFavorites) {
    const parent = target.closest(".tile") || target.closest(".item");
    parent.remove();
    goToAllFilms();
  }
}

function goToAllFilms() {
  if (!localeKeys.favorites.length) {
    loadStyleButtonFavorites();
    renderFilmsWithLang();
  }
}

function showFavorites() {
  if (!localeKeys.favorites.length && !localeKeys.statusButtonFavorites) {
    return;
  }
  localeKeys.statusButtonFavorites = !localeKeys.statusButtonFavorites;
  storeLocaleKeys();
  toggleStyleButtonFavorites();
  renderFilmsWithLang();
}

function loadStyleButtonFavorites() {
  const firstElementChild = buttonFavorites.firstElementChild;
  if (localeKeys.favorites.length && localeKeys.statusButtonFavorites) {
    buttonFavorites.classList.add("favorites-active");
    firstElementChild.classList.add("favorites-active");
    firstElementChild.classList.add("material-fill");
  } else {
    buttonFavorites.classList.remove("favorites-active");
    firstElementChild.classList.remove("favorites-active");
    firstElementChild.classList.remove("material-fill");
  }
  changeStatusButtonFavorites();
}

function changeStatusButtonFavorites() {
  if (!localeKeys.favorites.length) {
    localeKeys.statusButtonFavorites = false;
    storeLocaleKeys();
  }
}

function toggleStyleButtonFavorites() {
  const firstElementChild = buttonFavorites.firstElementChild;
  buttonFavorites.classList.toggle("favorites-active");
  firstElementChild.classList.toggle("favorites-active");
  firstElementChild.classList.toggle("material-fill");
}
