function addFloatingButton() {
  const btn = document.createElement("div");
  btn.id = "darkModeToggleBtn";

  const icon = document.createElement("img");
  icon.src = chrome.runtime.getURL("icons/moon.svg");
  icon.alt = "Toggle Dark Mode";
  btn.appendChild(icon);

  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    toggleDarkMode();
    btn.classList.add("rotate");

    setTimeout(() => {
      const isDark = document.getElementById("custom-dark-mode");
      icon.src = isDark
        ? chrome.runtime.getURL("icons/sun.svg")
        : chrome.runtime.getURL("icons/moon.svg");
      btn.classList.remove("rotate");
    }, 600);
  });
}

function toggleDarkMode() {
  const existingStyle = document.getElementById("custom-dark-mode");
  if (existingStyle) {
    existingStyle.remove();
  } else {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.id = "custom-dark-mode";
    style.href = chrome.runtime.getURL("darkmode.css");
    document.head.appendChild(style);
  }
}

function injectButton() {
  const cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";
  cssLink.href = chrome.runtime.getURL("floatingButton.css");
  document.head.appendChild(cssLink);
  addFloatingButton();
}

injectButton();
