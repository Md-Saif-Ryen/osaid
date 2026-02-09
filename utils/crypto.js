const SALT = "prj_2026_";

export const encryptIndex = (index) => {
  return btoa(`${SALT}${index}`);
};

export const decryptIndex = (encrypted) => {
  try {
    const decoded = atob(encrypted);
    if (!decoded.startsWith(SALT)) return null;
    return Number(decoded.replace(SALT, ""));
  } catch {
    return null;
  }
};
