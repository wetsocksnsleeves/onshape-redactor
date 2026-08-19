# OnShape Redactor

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

|Encoded|Decoded|
|---|---|
|<img width="432" height="196" alt="image" src="https://github.com/user-attachments/assets/6b2be9ea-1383-4348-85f9-e4efd7307ec2" />|<img width="491" height="199" alt="image" src="https://github.com/user-attachments/assets/d74522d4-1d10-44c3-8a81-33c0237277ab" />|


1. Navigate to an OnShape document list. Filename will be decoded in place.
2. New documents created whilst the extension is on will have their names automatically encoded.
3. If a given document isn't encoded, clicking the "Rename" button will update it
