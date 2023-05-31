const blockDropdownClose = document.querySelector(".block-dropdown-close");

function toggleOption(event) {
  const target = event.target;
  const dropdown = target.nextElementSibling;
  dropdown.classList.toggle("dropdown--height");
  blockDropdownClose.classList.remove("hidden");
  for (const child of dropdown.children) {
    child.classList.remove("option-active");
    if (child.textContent.trim() === target.textContent) {
      child.classList.add("option-active");
    }
  }
  if (dropdown.classList.contains("dropdown--height")) {
    blockDropdownClose.classList.add("hidden");
  }
  toggleOptionActive(dropdown);
}

function toggleOptionActive(dropdown) {
  dropdown.onmouseover = (event) => {
    for (const child of dropdown.children) {
      child.classList.remove("option-active");
    }
    event.target.classList.toggle("option-active");
  };
}

function closeDropdown(event) {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => dropdown.classList.add("dropdown--height"));
  event.target.classList.add("hidden");
}
