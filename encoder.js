function encodeBase64(str) {
  const bytes = new TextEncoder().encode(String(str));
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
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
  if (!value || /^[A-Za-z0-9+/=]+$/.test(value)) {
    return;
  }
  const encoded = encodeBase64(value);
  input.value = encoded;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}