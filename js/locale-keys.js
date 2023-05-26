let localeKeys = restoreLocaleKeys();

function restoreLocaleKeys() {
  return (
    JSON.parse(localStorage.getItem("localeKeys")) || {
      view: "tiles",
      sortBy: "Episode number",
      sortDirection: "down",
      favorites: [],
      statusButtonFavorites: false,
      darkTheme: false,
      lang: "en",
    }
  );
}

function storeLocaleKeys() {
  localStorage.setItem("localeKeys", JSON.stringify(localeKeys));
}
