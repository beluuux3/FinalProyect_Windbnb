import { filterStays, getUniqueCities, updateTitle } from "./utils.js";
import { renderStays } from "./useStays.js";
import { stays } from "./stays.js";

let adultCount = 0;
let childCount = 0;
let totalGuests = 0;
let selectedLocation = "";

export const initModal = () => {
  setupModalEvents();
  setupGuestCounters();
  setupLocationSuggestions();
  setupSearchFunctionality();
};

//cerar abrir mod
const setupModalEvents = () => {
  const menuSearch = document.getElementById("menuSearch");
  const modal = document.querySelector(".modal");
  const closeButton = modal.querySelector("p.flex.justify-end");

  menuSearch.addEventListener("click", () => {
    modal.classList.remove("hidden");

    updateGuestCountsDisplay();
    updateGuestDisplay();
    updateLocationDisplay();
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Cerrar click fuera
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
};

//cont huesp
const setupGuestCounters = () => {
  const adultButtons = document.querySelectorAll("#contAdult .buttonCant");
  const childButtons = document.querySelectorAll("#contChild .buttonCant");

  // Botones de adultos (- y +)
  if (adultButtons.length >= 2) {
    adultButtons[0].addEventListener("click", (e) => {
      e.preventDefault();
      if (adultCount > 0) {
        adultCount--;
        actualGuest();
      }
    });

    adultButtons[1].addEventListener("click", (e) => {
      e.preventDefault();
      adultCount++;
      actualGuest();
    });
  }

  // Botones de niños (- y +)
  if (childButtons.length >= 2) {
    childButtons[0].addEventListener("click", (e) => {
      e.preventDefault();
      if (childCount > 0) {
        childCount--;
        actualGuest();
      }
    });

    childButtons[1].addEventListener("click", (e) => {
      e.preventDefault();
      childCount++;
      actualGuest();
    });
  }

  const guestsInput = document.getElementById("guests");
  if (guestsInput) {
    guestsInput.addEventListener("input", (e) => {
      const value = parseInt(e.target.value) || 0;

      if (value !== totalGuests) {
        adultCount = value;
        childCount = 0;
        totalGuests = value;
        updateGuestCountsDisplay();
        updateGuestDisplay();
      }
    });
  }
};

//cont de huesp actual
const actualGuest = () => {
  totalGuests = adultCount + childCount;

  updateGuestCountsDisplay();

  const guestsInput = document.getElementById("guests");
  if (guestsInput) {
    guestsInput.value = totalGuests;
  }

  updateGuestDisplay();

  console.log(
    `Adultos: ${adultCount}, Niños: ${childCount}, Total: ${totalGuests}`
  );
};

const updateGuestCountsDisplay = () => {
  const adultSpan = document.querySelector("#contAdult span");
  const childSpan = document.querySelector("#contChild span");

  if (adultSpan) {
    adultSpan.textContent = adultCount;
  }

  if (childSpan) {
    childSpan.textContent = childCount;
  }
};

//display huespedess
const updateGuestDisplay = () => {
  const menuGuestDiv = document.querySelector("#menuSearch .col-span-2");
  if (!menuGuestDiv) return;

  if (totalGuests > 0) {
    if (adultCount > 0 && childCount > 0) {
      menuGuestDiv.textContent = `${adultCount} adults, ${childCount} children`;
    } else if (adultCount > 0) {
      menuGuestDiv.textContent = `${adultCount} adult${
        adultCount > 1 ? "s" : ""
      }`;
    } else if (childCount > 0) {
      menuGuestDiv.textContent = `${childCount} child${
        childCount > 1 ? "ren" : ""
      }`;
    } else {
      menuGuestDiv.textContent = `${totalGuests} guest${
        totalGuests > 1 ? "s" : ""
      }`;
    }
  } else {
    menuGuestDiv.textContent = "Add Guests";
  }
};

// -------sugerencias
const setupLocationSuggestions = () => {
  const locationInput = document.getElementById("location");
  const cities = getUniqueCities(stays);

  const sugCont = document.createElement("div");
  sugCont.id = "locationSuggestions";
  sugCont.className =
    "absolute bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10 w-full hidden";

  locationInput.parentElement.style.position = "relative";
  locationInput.parentElement.appendChild(sugCont);

  const cityShow = () => {
    showSuggestions(cities, sugCont, locationInput);
  };

  locationInput.addEventListener("click", cityShow);
  locationInput.addEventListener("focus", cityShow);

  locationInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    selectedLocation = e.target.value;

    if (value.length > 0) {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(value)
      );

      showSuggestions(filteredCities, sugCont, locationInput);
    } else {
      showSuggestions(cities, sugCont, locationInput);
    }

    updateLocationDisplay();
  });

  document.addEventListener("click", (e) => {
    if (!locationInput.parentElement.contains(e.target)) {
      sugCont.classList.add("hidden");
    }
  });
};

const showSuggestions = (cities, container, input) => {
  if (cities.length === 0) {
    container.classList.add("hidden");
    return;
  }

  container.innerHTML = cities
    .map(
      (city) =>
        `<div class="p-3 hover:bg-gray-50 cursor-pointer suggestion-item border-b border-gray-100 last:border-b-0 transition-colors duration-200" data-city="${city}">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded-full bg-red-400 flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <div class="font-medium text-gray-800 text-sm">${city}</div>
              <div class="text-xs text-gray-500">Finland</div>
            </div>
          </div>
        </div>`
    )
    .join("");

  container.classList.remove("hidden");

  container.querySelectorAll(".suggestion-item").forEach((item) => {
    item.addEventListener("click", () => {
      const city = item.dataset.city;
      input.value = city;
      selectedLocation = city;
      container.classList.add("hidden");
      updateLocationDisplay();
    });
  });
};

const updateLocationDisplay = () => {
  const menuLocationDiv = document.querySelector("#menuSearch .col-span-3");
  if (selectedLocation) {
    menuLocationDiv.textContent = selectedLocation;
  } else {
    menuLocationDiv.textContent = "Add Location";
  }
};

const setupSearchFunctionality = () => {
  const searchButtons = document.querySelectorAll(
    "button:has(img[src*='search'])"
  );
  const clearFiltersButton = document.getElementById("clearFilters");

  searchButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      performSearch();
    });
  });

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", (e) => {
      e.preventDefault();
      resetFilters();
    });
  }

  const locationInput = document.getElementById("location");
  const guestsInput = document.getElementById("guests");

  [locationInput, guestsInput].forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  });
};

const performSearch = () => {
  const filteredStays = filterStays(stays, selectedLocation, totalGuests);

  renderStays(filteredStays);

  updateTitle(selectedLocation, filteredStays.length);

  const modal = document.querySelector(".modal");
  modal.classList.add("hidden");

  console.log(
    `Búsqueda realizada: ${selectedLocation}, ${totalGuests} huéspedes, ${filteredStays.length} resultados`
  );
};

//Resetea todos los filtros

export const resetFilters = () => {
  adultCount = 0;
  childCount = 0;
  totalGuests = 0;
  selectedLocation = "";

  const locationInput = document.getElementById("location");
  const guestsInput = document.getElementById("guests");

  if (locationInput) locationInput.value = "";
  if (guestsInput) guestsInput.value = "";

  updateGuestCountsDisplay();

  updateGuestDisplay();
  updateLocationDisplay();

  renderStays(stays);
  updateTitle("", stays.length);

  console.log("Filtros reseteados");
};
