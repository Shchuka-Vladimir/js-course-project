instalValueInputSelectLanguage();
renderCharacter();

async function fetchCharacter() {
  const searchParams = new URLSearchParams(location.search);
  const url = searchParams.get("url");
  const response = await fetch(url);
  return await response.json();
}

async function fetchFilms(i) {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/${i}.json`
  );
  return await response.json();
}

async function generateFilms(id) {
  const film = await fetchFilms(id);
  return `
  <a class="link link-film" href="./film-description.html?url=https://desfarik.github.io/star-wars/api/film/${film.id}.json">Star Wars: ${film.title} (Episode ${film.episode_id})</a>
  `;
}

async function renderCharacter() {
  const elementCharacter = document.querySelector(".character");
  let promises = [];
  const character = await fetchCharacter();
  character.films.forEach((id) => {
    promises.push(generateFilms(id));
  });
  const films = await Promise.all(promises);
  elementCharacter.classList.remove("temp-height");
  elementCharacter.innerHTML = generateCharacter(character, films);
  changeLang(localeKeys.lang);
}

function generateCharacter(character, films) {
  return `
<img class="poster" src="${character.image}" alt="${character.name}" />
<div class="content">
  <h1 class="title">${character.name}</h1>
  <h3 class="subtitle" data-lang-key="aboutCharacter">About character</h3>
  <div class="list">
    <div class="item-label" data-lang-key="age">Age</div>
    <div>${parseInt(character.birth_year) || "N/A"}</div>
    <div class="item-label" data-lang-key="height">Height</div>
    <div>${+character.height || "N/A"}</div>
    <div class="item-label" data-lang-key="eyeColor">Eye Color</div>
    <div class="item-value">${character.eye_color}</div>
    <div class="item-label" data-lang-key="gender">Gender</div>
    <div class="item-value">${character.gender}</div>
    <div class="item-label" data-lang-key="mass">Mass</div>
    <div>${+character.mass || "N/A"}</div>
    <div class="item-label" data-lang-key="species">Species</div>
    <div class="item-value">${character.species}</div>
    <div class="item-label" data-lang-key="homeWorld">Home world</div>
    <div class="item-value">${character.homeworld}</div>
    <div class="item-label" data-lang-key="skinColor">Skin color</div>
    <div class="item-value">${character.skin_color}</div>
    <div class="item-label" data-lang-key="films">Films</div>
    <div class="item-value-films">${films.join("")}</div>
    <div class="item-label" data-lang-key="totalFilms">Total films</div>
    <div class="item-value-films">${character.films.length}</div>
  </div>
</div>
`;
}
