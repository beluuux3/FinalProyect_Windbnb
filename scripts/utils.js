/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */

//----filter stays    location - guestss

export const filterStays = (stays, location = "", guests = 0) => {
  return stays.filter((stay) => {
    const matchesLocation =
      !location ||
      stay.city.toLowerCase().includes(location.toLowerCase()) ||
      stay.country.toLowerCase().includes(location.toLowerCase());

    const matchesGuests = guests === 0 || stay.maxGuests >= guests;

    return matchesLocation && matchesGuests;
  });
};

// ciudades de las estancias para sug

export const getUniqueCities = (stays) => {
  const cities = stays.map((stay) => stay.city);
  return [...new Set(cities)].sort();
};

//titulo actual  tittle
export const updateTitle = (location, totalStays) => {
  const titleElement = document.getElementById("title");
  if (titleElement) {
    const locationText = location ? location : "Finland";
    titleElement.textContent = `Stays in ${locationText}`;
  }
};
