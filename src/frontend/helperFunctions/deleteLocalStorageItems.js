export const deleteLocalStorageItemsStartsWith = (pattern) => {
  for (let key in localStorage) {
    const lowercaseKey = key.toLowerCase();
    const lowercasePattern = pattern.toLowerCase();
    if (lowercaseKey.startsWith(lowercasePattern)) {
      localStorage.removeItem(key);
    }
  }
};
