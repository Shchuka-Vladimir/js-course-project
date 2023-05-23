const DICTIONARIES = {
  Русский: RU,
  English: EN,
};

instalValueInputSelectLanguage();

function selectLanguage(event) {
  const target = event.target;
  localeKeys.lang = target.value;
  storeLocaleKeys();
  changeLang(localeKeys.lang);
}

function instalValueInputSelectLanguage() {
  const selectLanguage = document.querySelector(".input-language-select");
  selectLanguage.value = localeKeys.lang;
}

function changeLang(lang) {
  const langKeys = document.querySelectorAll("[data-lang-key]");
  const dictionary = DICTIONARIES[lang];
  langKeys.forEach((element) => {
    const translateKey = element.dataset.langKey;
    element.textContent = dictionary[translateKey];
  });
  changePlaceholder();
}

function changePlaceholder() {
  const searchInput = document.querySelector(".search__input");
  if (!searchInput) {
    return;
  }
  if (localeKeys.lang === "Русский") {
    searchInput.placeholder = "Поиск по названию, эпизоду и году";
  } else {
    searchInput.placeholder = "Search By Title, Episode and Year";
  }
}
