/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

import { initStays } from "./useStays.js";

document.addEventListener("DOMContentLoaded", () => {
  const allStaysPromise = initStays();

  const menuSearch = document.getElementById("menuSearch");
  const modal = document.querySelector(".modal");

  if (menuSearch && modal) {
    menuSearch.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    const closeModalButton = modal.querySelector("p.flex.justify-end");
    if (closeModalButton) {
      closeModalButton.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }
  }
});
