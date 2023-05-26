const selectLanguageMini = document.querySelector(
  ".input-language-select-mini"
);
const DICTIONARIES = {
  ru: RU,
  en: EN,
};

instalValueInputSelectLanguage();

function selectLanguage(event) {
  const target = event.target;
  localeKeys.lang =
    target.value === "English" || target.value === "ENG" ? "en" : "ru";
  storeLocaleKeys();
  changeLang(localeKeys.lang);
}

function instalValueInputSelectLanguage() {
  const selectLanguage = document.querySelector(".input-language-select");
  selectLanguage.value = localeKeys.lang === "en" ? "English" : "Русский";
  selectLanguageMini.value = "";
}

function changeLang(lang) {
  const langKeys = document.querySelectorAll("[data-lang-key]");
  const dictionary = DICTIONARIES[lang];
  langKeys.forEach((element) => {
    const translateKey = element.dataset.langKey;
    element.textContent = dictionary[translateKey];
  });
  selectLanguageMini.value = "";
  changePlaceholder();
}

function changePlaceholder() {
  const searchInput = document.querySelector("input[name='search']");
  const searchInputMini = document.querySelector("input[name='search-mini']");
  if (!searchInput) {
    return;
  }
  if (localeKeys.lang === "ru") {
    searchInput.placeholder = "Поиск по названию, эпизоду и году";
    searchInputMini.placeholder = "Поиск";
  } else {
    searchInput.placeholder = "Search By Title, Episode and Year";
    searchInputMini.placeholder = "Search";
  }
}
