export function getCache(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function setCache(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
