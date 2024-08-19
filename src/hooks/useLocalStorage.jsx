export default function useLocalStorage() {
  const get = (clave) => {
    return JSON.parse(localStorage.getItem(`${clave}`));
  };

  const set = (clave, pokes) => {
    localStorage.setItem(`${clave}`, JSON.stringify(pokes));
  };

  const data = {
    get,
    set,
  };

  return data;
}
