let xsrfToken = null;

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const header = details.requestHeaders.find(
      (h) => h.name.toLowerCase() === "x-xsrf-token"
    );
    if (header && header.value) {
      xsrfToken = header.value;
    }
  },
  { urls: ["*://cad.onshape.com/api/*"] },
  ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === "get-xsrf-token") {
    sendResponse({ token: xsrfToken });
  }
});