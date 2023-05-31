const DICTIONARIES = {
  ru: RU,
  en: EN,
};

instalValueInputSelectLanguage();

function selectLanguage(event, type) {
  const dropdown = document.querySelector(`.dropdown-${type}`);
  const target = event.target;
  localeKeys.lang =
    target.textContent.trim() === "English" ||
    target.textContent.trim() === "ENG"
      ? "en"
      : "ru";
  storeLocaleKeys();
  changeContentSelectHeaderSort();
  changeLang(localeKeys.lang);
  dropdown.classList.add("dropdown--height");
  blockDropdownClose.classList.add("hidden");
}

function instalValueInputSelectLanguage() {
  const selectHeaderLanguage = document.querySelector(
    ".select-header-language"
  );
  const selectHeaderLanguageMobile = document.querySelector(
    ".select-header-language-mobile"
  );
  selectHeaderLanguage.textContent =
    localeKeys.lang === "en" ? "English" : "Русский";
  selectHeaderLanguageMobile.textContent =
    localeKeys.lang === "en" ? "ENG" : "РУС";
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

function changeContentSelectHeaderSort() {
  if (localeKeys.lang === "ru") {
    localeKeys.sortBy =
      localeKeys.sortBy === "Episode Number"
        ? "Номер эпизода"
        : "Дата премьеры";
  } else {
    localeKeys.sortBy =
      localeKeys.sortBy === "Номер эпизода" ? "Episode Number" : "Release Date";
  }
  storeLocaleKeys();
  instalContentSelectHeaderSort();
}

function instalContentSelectHeaderSort() {
  const selectHeaderSort = document.querySelector(".select-header-sort");
  if (!selectHeaderSort) return;
  selectHeaderSort.textContent = localeKeys.sortBy;
}
