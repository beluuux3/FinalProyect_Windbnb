/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

import { initStays } from "./useStays.js";
import { initModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  const allStaysPromise = initStays();

  initModal();

  try {
    await allStaysPromise;
    console.log("Inicializado correcto");
  } catch (error) {
    console.error("Error", error);
  }
});
