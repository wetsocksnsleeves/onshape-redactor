const DOCUMENT_EDITOR_URL_PREFIX = "https://cad.onshape.com/documents/";
const button = document.getElementById("encode-button");

function setEnabled(enabled) {
  button.disabled = !enabled;
  button.style.opacity = enabled ? "1" : "0.5";
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const isEditor = !!(tab && tab.url && tab.url.startsWith(DOCUMENT_EDITOR_URL_PREFIX));
  setEnabled(isEditor);
}

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.id) {
    await chrome.tabs.sendMessage(tab.id, { type: "rename" });
    window.close();
  }
});

init();