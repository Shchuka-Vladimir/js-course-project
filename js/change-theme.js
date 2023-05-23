addTheme();

function addTheme() {
  if (localeKeys.darkTheme) {
    document.body.classList.add("theme-dark");
  }
}

function changeTheme() {
  document.body.classList.toggle("theme-dark");
  localeKeys.darkTheme = !localeKeys.darkTheme;
  storeLocaleKeys();
}
