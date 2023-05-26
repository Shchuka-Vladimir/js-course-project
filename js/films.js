const quantityElementSkeleton =
  localeKeys.favorites.length && localeKeys.statusButtonFavorites
    ? localeKeys.favorites.length
    : 7;

let phrase;

start();

function start() {
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  if (page) {
    localeKeys.statusButtonFavorites = true;
    storeLocaleKeys();
    location.search = "";
  }
  changeLang(localeKeys.lang);
  addElementDisable();
  instalValueInputSelectSort();
  renderFilmsWithLang();
}

async function fetchFilms() {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/all.json`
  );
  let films = await response.json();
  if (localeKeys.favorites.length && localeKeys.statusButtonFavorites) {
    films = films.filter((film) => localeKeys.favorites.includes(`${film.id}`));
  }
  if (phrase) {
    films = searchFilms(films);
  }
  return films;
}

function searchFilms(films) {
  return films.filter((film) => {
    const title = `Star Wars: ${film.title}`.toLowerCase();
    const episode = `Episode ${film.episode_id}`.toLowerCase();
    return (
      title.includes(phrase) ||
      episode.includes(phrase) ||
      film.release_date.slice(0, 4).includes(phrase)
    );
  });
}

function generateTile(film) {
  return `
  <a
      class="tile link"
      href="./film-description.html?url=https://desfarik.github.io/star-wars/api/film/${
        film.id
      }.json"
    >
      <img
        class="tile__film-poster"
        src="./images/${film.title}.jpg"
        alt="${film.title}"
      />
      <div class="tile__film-content">
        <div>
          <div class="tile__film-title">
            <span data-lang-key="starWars">Star Wars: </span>
            <span data-lang-key="titleFilm${film.id}">${film.title}</span>
          </div>
          <div class="tile__film-data">
            <span data-lang-key="episode">Episode</span>
            <span>${film.episode_id},</span>
            <span>${film.release_date.slice(0, 4)}</span>
          </div>
        </div>
        <button
          class="button material icon-favorites"
          data-id="${film.id}"
          onclick="saveFavorites(event)"
        >
          star
        </button>
      </div>
    </a>
`;
}

function renderSkeletonTile(element) {
  for (let i = 0; i < quantityElementSkeleton; i++) {
    element.innerHTML += `
  <div class="tile">
    <div class="tile__film-poster skeleton"></div>
    <div class="tile__film-title tile__skeleton-title skeleton"></div>
    <div class="tile__film-data tile__skeleton-data skeleton"></div>
  </div>
  `;
  }
}

async function renderFilms() {
  const elementFilms = document.querySelector(".films");
  let promises = [];
  const render = getRender(elementFilms);
  const filmsOnRequest = await fetchFilms();
  sortFilms(filmsOnRequest).forEach((film) => promises.push(render(film)));
  const films = await Promise.all(promises);
  elementFilms.innerHTML = "";
  films.forEach((film) => (elementFilms.innerHTML += film));
  buttonFavorites.classList.remove("hide");
  pouringIconsFavorites(elementFilms);
}

function changeView(event, view) {
  const target = event.target;
  clearElementsViewDisable();
  target.classList.add("disable");
  if (localeKeys.view === view) {
    return;
  }
  localeKeys.view = view;
  storeLocaleKeys();
  loadStyleButtonFavorites();
  renderFilmsWithLang();
}

function getRender(element) {
  element.innerHTML = "";
  if (localeKeys.view === "tiles") {
    generateSkeletonTile(element);
    return generateTile;
  } else if (localeKeys.view === "list") {
    generateSkeletonItem(element);
    return generateItem;
  }
}

function generateSkeletonTile(element) {
  element.classList.remove("list");
  element.classList.add("tiles");
  renderSkeletonTile(element);
}

function generateSkeletonItem(element) {
  element.classList.remove("tiles");
  element.classList.add("list");
  renderSkeletonItem(element);
}

function generateItem(film) {
  return `
  <div class="item film item__film">
  <a
    class="link"
    href="./film-description.html?url=https://desfarik.github.io/star-wars/api/film/${
      film.id
    }.json"
  >
    <img
      class="item__film-poster"
      src="./images/${film.title}.jpg"
      alt="${film.title}"
    />
  </a>
  <a
    class="item__film-data link"
    href="./film-description.html?url=https://desfarik.github.io/star-wars/api/film/${
      film.id
    }.json"
  >
    <div class="item__film-title">
      <span data-lang-key="starWars">Star Wars: </span>
      <span data-lang-key="titleFilm${film.id}"></span>
    </div>
    <div>
      <span data-lang-key="episode">Episode</span>
      <span>${film.episode_id}</span>
    </div>
    <div class="item__film-date">${film.release_date.slice(0, 4)}</div>
  </a>
  <div class="flex-grow"></div>
  <button
    class="button material icon-favorites item__icon-favorites"
    data-id="${film.id}"
    onclick="saveFavorites(event)"
  >
    star
  </button>
</div>
 `;
}

function renderSkeletonItem(element) {
  for (let i = 0; i < quantityElementSkeleton; i++) {
    element.innerHTML += ` 
  <div class="item item__film">
    <div class="item__film-poster skeleton"></div>
    <div>
      <div class="item__film-title item__skeleton-title skeleton"></div>
      <div class="item__skeleton-episode skeleton"></div>
      <div class="item__film-date item__skeleton-date skeleton"></div>
    </div>
  </div>
  `;
  }
}

function selectSort(event) {
  const target = event.target;
  localeKeys.sortBy = target.value;
  storeLocaleKeys();
  renderFilmsWithLang();
}

function sortFilmsBy(films, direction) {
  if (localeKeys.sortBy === "Episode number") {
    return films
      .slice()
      .sort(
        (film1, film2) =>
          direction * film1.episode_id - direction * film2.episode_id
      );
  } else {
    return films
      .slice()
      .sort(
        (film1, film2) =>
          direction * film1.release_date.slice(0, 4) -
          direction * film2.release_date.slice(0, 4)
      );
  }
}

function instalValueInputSelectSort() {
  const elementSelectSort = document.querySelector(".input-sort-select");
  elementSelectSort.value = localeKeys.sortBy;
}

function changeDirection(event, direction) {
  const target = event.target;
  clearElementsDirectionDisable();
  target.classList.add("disable");
  if (localeKeys.sortDirection === direction) {
    return;
  }
  localeKeys.sortDirection = direction;
  storeLocaleKeys();
  renderFilmsWithLang();
}

function sortFilms(films) {
  if (localeKeys.sortDirection === "down") {
    return sortFilmsBy(films, 1);
  } else if (localeKeys.sortDirection === "up") {
    return sortFilmsBy(films, -1);
  }
}

function addElementDisable() {
  const buttonViewDisable = document.querySelector(
    `button[data-view="${localeKeys.view}"]`
  );
  const buttonDirectionDisable = document.querySelector(
    `button[data-direction="${localeKeys.sortDirection}"]`
  );
  clearElementsViewDisable();
  clearElementsDirectionDisable();
  buttonViewDisable.classList.add("disable");
  buttonDirectionDisable.classList.add("disable");
}

function clearElementsViewDisable() {
  const allDisable = document.querySelectorAll(".button-view.disable");
  allDisable.forEach((element) => element.classList.remove("disable"));
}

function clearElementsDirectionDisable() {
  const allDisable = document.querySelectorAll(".button-sort.disable");
  allDisable.forEach((element) => element.classList.remove("disable"));
}

function formEvent(event) {
  event.preventDefault();
}

function getPhraseSearch(event) {
  const target = event.target;
  phrase = target.value.toLowerCase();
  renderFilmsWithLang();
  hideTimeBlock(target);
}

async function renderFilmsWithLang() {
  await renderFilms();
  changeLang(localeKeys.lang);
}

function hideTimeBlock(target) {
  const timeBlock = document.querySelector(".time-block");
  timeBlock.classList.add("hidden");
  if (!target.value) {
    timeBlock.classList.remove("hidden");
  }
}
