const useLocalStorage = () => {
  const get = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error(`Error parsing localStorage item ${key}`, e);
      return null;
    }
  };

  const set = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting localStorage item ${key}`, e);
    }
  };

  return { get, set };
};

export default useLocalStorage;
