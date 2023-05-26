const quantityFavoritesFilms = document.querySelector(
  ".quantity-favorites-films"
);
const buttonFavorites = document.querySelector(".button-favorites");
const numberOfCharactersToLoad = 10;

let counter = 0;
let film;

start();

async function start() {
  const spinnerContainer = document.querySelector(".spinner-container");
  instalValueInputSelectLanguage();
  await renderFilm();
  loadMore();
  buttonFavorites.classList.remove("hide");
}

buttonFavorites.addEventListener("click", (event) => {
  if (!localeKeys.favorites.length) {
    event.preventDefault();
  }
});

async function fetchFilm() {
  const searchParams = new URLSearchParams(location.search);
  const url = searchParams.get("url");
  const response = await fetch(url);
  return await response.json();
}

async function renderFilm() {
  const elementFilmContainer = document.querySelector(".film-container");
  film = await fetchFilm();
  elementFilmContainer.classList.remove("temp-height");
  elementFilmContainer.innerHTML = generateFilm(film);
  pouringIconsFavorites(elementFilmContainer);
}

function generateFilm(film) {
  return `
  <div class="film">
  <img
    class="poster"
    src="./images/${film.title}.jpg"
    alt="${film.title}"
  />
  <div class="content">
    <h1 class="title">
      <span data-lang-key="starWars"></span>
      <span data-lang-key="episode"></span>
      <span>${film.episode_id} - </span>
      <span data-lang-key="titleFilm${film.id}"></span>
    </h1>
    <div class="subtitle-container">
      <h3 class="subtitle" data-lang-key="movieInfo">Movie info</h3>
      <button
        class="button material icon-favorites"
        data-id="${film.id}"
        onclick="saveFavorites(event)"
      >
        star
      </button>
    </div>
    <div
      class="description"
      data-lang-key="descriptionFilm${film.id}"
    ></div>
    <div class="list">
      <div class="item-label" data-lang-key="productionYear">Production year</div>
      <div>${film.release_date.slice(0, 4)}</div>
      <div class="item-label" data-lang-key="country">Country</div>
      <div data-lang-key="usa">USA</div>
      <div class="item-label" data-lang-key="releaseDate">Release date</div>
      <div>${film.release_date}</div>
      <div class="item-label" data-lang-key="director">Director</div>
      <div data-lang-key="${film.director}"></div>
      <div class="item-label" data-lang-key="producer">Produce</div>
      <div data-lang-key="${film.producer}"></div>
    </div>
  </div>
</div>
<h2 class="character-title">
  <span data-lang-key="characters">CHARACTERS</span>
  <span>(${film.characters.length})</span>
</h2>
`;
}

async function fetchCharacters(i) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/people/${i}.json`
  );
  return await response.json();
}

async function generateCharacter(i) {
  const character = await fetchCharacters(i);
  return `
<a class="character" href="./character-description.html?url=https://desfarik.github.io/star-wars/api/people/${character.id}.json">
  <img class="character__image" src="${character.image}" alt="${character.name}" />
  <div class="character__name">${character.name}</div>
</a>
  `;
}

async function loadMore(more) {
  const elementCharacters = document.querySelector(".characters");
  let promises = [];
  const length = film.characters.length;
  if (counter > length - 1) {
    return;
  }
  for (let i = counter; i < counter + numberOfCharactersToLoad; i++) {
    const character = film.characters[i];
    promises.push(generateCharacter(character));
    elementCharacters.innerHTML += generateCharacterSkeleton();
    if (i === length - 1) {
      break;
    }
  }
  counter += numberOfCharactersToLoad;
  renderButtonLoadMore(length, more);
  changeLang(localeKeys.lang);
  const characters = await Promise.all(promises);
  removeCharactersSkeleton(elementCharacters);
  characters.forEach((character) => (elementCharacters.innerHTML += character));
}

function removeCharactersSkeleton(elementCharacters) {
  const charactersSkeleton = elementCharacters.querySelectorAll(
    ".character-skeleton"
  );
  charactersSkeleton.forEach((element) => element.remove());
}

function renderButtonLoadMore(length, more) {
  const loadMore = document.querySelector(".load-more");
  const remainder = length - counter;
  const nextQuantity =
    remainder === length % numberOfCharactersToLoad
      ? remainder
      : numberOfCharactersToLoad;
  loadMore.innerHTML = `
  <button class="button button-load-more" onclick="loadMore(true)">
      <span data-lang-key="showMore">SHOW MORE</span>
      <span>&nbsp;(${nextQuantity})</span>
    </button>
  `;
  if (more) {
    loadMore.scrollIntoView({ behavior: "smooth" });
  }
  if (remainder <= 0) {
    loadMore.classList.add("hide");
  }
}

function generateCharacterSkeleton() {
  return `
  <div class="character character-skeleton">
    <div class="character__image skeleton"></div>
    <div class="character__name character__skeleton-name skeleton"></div>
  </div>
    `;
}

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
  }
  storeLocaleKeys();
  quantityFavoritesFilms.textContent = `${localeKeys.favorites.length}`;
}
