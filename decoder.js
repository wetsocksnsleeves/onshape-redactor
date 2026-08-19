function isValidBase64(str) {
  if (typeof str !== "string" || str.length === 0 || str.length % 4 !== 0) {
    return false;
  }
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(str)) {
    return false;
  }
  if (/=/.test(str) && !/^[A-Za-z0-9+/]*={1,2}$/.test(str)) {
    return false;
  }
  return true;
}

function decodeBase64(str) {
  const trimmed = String(str).trim();
  if (!isValidBase64(trimmed)) {
    return null;
  }
  try {
    const binary = atob(trimmed.replace(/\s+/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    return null;
  }
}