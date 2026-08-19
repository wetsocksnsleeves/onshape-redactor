const RENAME_API_PREFIX = "https://cad.onshape.com/api/v14/documents/";

function encodeBase64(str) {
  const bytes = new TextEncoder().encode(String(str));
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function isAlreadyEncoded(value) {
  return /^[A-Za-z0-9+/=]+$/.test(value);
}

function getDocumentId() {
  const match = location.href.match(/^https:\/\/cad\.onshape\.com\/documents\/([^/]+)/);
  return match ? match[1] : null;
}

function handleCreateSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || form.name !== "newDocumentName") {
    return;
  }
  const input = form.querySelector("#document-name-input");
  if (!input) {
    return;
  }
  const value = input.value;
  if (!value || isAlreadyEncoded(value)) {
    return;
  }
  input.value = encodeBase64(value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

async function handleRenameRequest() {
  if (!location.href.startsWith(DOCUMENT_EDITOR_URL_PREFIX)) {
    return;
  }
  const documentId = getDocumentId();
  const titleEl = document.querySelector(DOCUMENT_TITLE_SELECTOR);
  if (!documentId || !titleEl) {
    return;
  }
  const title = titleEl.textContent.trim();
  if (!title) {
    return;
  }
  const name = isAlreadyEncoded(title) ? title : encodeBase64(title);
  let token = null;
  try {
    const response = await chrome.runtime.sendMessage({
      type: "get-xsrf-token",
    });
    token = response && response.token;
  } catch (e) {
    token = null;
  }
  if (!token) {
    return;
  }
  await fetch(RENAME_API_PREFIX + documentId, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "x-xsrf-token": token,
    },
    body: JSON.stringify({ name }),
    credentials: "include",
  });
}