document.getElementById("toggleBtn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleDarkModeAndSave,
  });
});

function toggleDarkModeAndSave() {
  const hostname = window.location.hostname;
  const existingStyle = document.getElementById("custom-dark-mode");

  if (existingStyle) {
    existingStyle.remove();
    chrome.storage.local.set({ [hostname]: false });
  } else {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.id = "custom-dark-mode";
    style.href = chrome.runtime.getURL("darkmode.css");
    document.head.appendChild(style);
    chrome.storage.local.set({ [hostname]: true });
  }
}
