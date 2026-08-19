const RESOURCE_OWNER_PARAM = "resourceType=resourceuserowner";
const DOCUMENT_EDITOR_URL_PREFIX = "https://cad.onshape.com/documents/";
const ITEM_NAME_SELECTOR =
  "a.document-list-item-name span, a.document-display-link span.os-document-display-name";
const DOCUMENT_TITLE_SELECTOR = ".navbar-document-name";

function shouldDecode() {
  return location.href.includes(RESOURCE_OWNER_PARAM);
}

function processItem(span) {
  const original = span.textContent;
  const decoded = decodeBase64(original);
  if (decoded !== null && decoded !== original) {
    span.textContent = decoded;
  }
}

function scan() {
  if (!shouldDecode()) {
    return;
  }
  const matches = document.querySelectorAll(ITEM_NAME_SELECTOR);
  matches.forEach(processItem);
}

function decodeDocumentTitle() {
  if (!location.href.startsWith(DOCUMENT_EDITOR_URL_PREFIX)) {
    return;
  }
  const el = document.querySelector(DOCUMENT_TITLE_SELECTOR);
  if (!el) {
    return;
  }
  const decoded = decodeBase64(el.textContent);
  if (decoded !== null && decoded !== el.textContent) {
    el.textContent = decoded;
  }
  const title = el.getAttribute("data-bs-original-title");
  if (title) {
    const decodedTitle = decodeBase64(title);
    if (decodedTitle !== null && decodedTitle !== title) {
      el.setAttribute("data-bs-original-title", decodedTitle);
    }
  }
}

let debounceTimer = null;
function scheduleScan() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    decodeDocumentTitle();
    scan();
  }, 100);
}

if (document.body) {
  const observer = new MutationObserver(scheduleScan);
  observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

window.addEventListener("popstate", scan);
window.addEventListener("hashchange", scan);
document.addEventListener("submit", handleCreateSubmit, true);

decodeDocumentTitle();
scan();