# OnShape Incognito

A Chrome (MV3) extension that finds document-list filenames on OnShape and
replaces them with their base64-decoded value, only when the page URL ends
in `resourceType=resourceuserowner`.

## Idea
The idea is simple, since every free onshape project is publically displayed and searchable via the search bar. 
We obfuscate the project name such that there is no semantic match during search.

- Decodes only when the URL contains `resourceType=resourceuserowner`.
- Only the span inside the `a.document-list-item-name > div.document-list-item-name-container > span`
  pattern is decoded.
- Invalid base64 text is left untouched.
- Idempotent: already-decoded values are not re-decoded.

## Install (load unpacked)

1. Open `chrome://extensions` in Chrome (or Chromium).
2. Enable **Developer mode** (toggle in the top-right).
3. Click **Load unpacked**.
4. Select this directory (the one containing `manifest.json`).

## Usage

Navigate to an OnShape document list whose URL contains
`resourceType=resourceuserowner`. Filename spans matching the pattern above
will be decoded in place. Debug logging appears in the page console.

New documents created whilst the extension is live is automatically encoded.
