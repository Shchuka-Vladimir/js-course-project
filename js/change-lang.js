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
  const selectLanguageMobile = document.querySelector(
    ".input-language-select-mobile"
  );
  selectLanguage.value = localeKeys.lang === "en" ? "English" : "Русский";
  selectLanguageMobile.value = localeKeys.lang === "en" ? "ENG" : "РУС";
}

function changeLang(lang) {
  const langKeys = document.querySelectorAll("[data-lang-key]");
  const dictionary = DICTIONARIES[lang];
  langKeys.forEach((element) => {
    const translateKey = element.dataset.langKey;
    element.textContent = dictionary[translateKey];
  });
  instalValueInputSelectLanguage();
  changePlaceholder();
}

function changePlaceholder() {
  const searchInput = document.querySelector("input[name='search']");
  const searchInputMobile = document.querySelector(
    "input[name='search-mobile']"
  );
  if (!searchInput) {
    return;
  }
  if (localeKeys.lang === "ru") {
    searchInput.placeholder = "Поиск по названию, эпизоду и году";
    searchInputMobile.placeholder = "Поиск";
  } else {
    searchInput.placeholder = "Search By Title, Episode and Year";
    searchInputMobile.placeholder = "Search";
  }
}
