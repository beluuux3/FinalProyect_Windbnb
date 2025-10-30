import { stays } from "../scripts/stays.js";

const createStayCard = (stay) => {
  const bedsInfo = stay.beds ? `. ${stay.beds} beds` : "";
  const typeDescription = `${stay.type}${bedsInfo}`;

  const superHostTag = stay.superHost
    ? `<span class="border border-gray-700 p-1 rounded-lg font-semibold text-[10px] text-gray-700 mr-2">SUPERHOST</span>`
    : `<span class="hidden">SUPERHOST</span>`;

  return `
    <section
      class="card mb-6 sm:mb-0 grid md:items-center md:mb-12 transition hover:scale-110 hover:shadow-2xl"
    >
      <img
        src="${stay.photo}"
        alt="image Stay: ${stay.title}"
        class="imgCard rounded-3xl md:object-cover md:content-center h-64 w-full"
      />
      <div id="caractStay" class="p-3 pb-2 grid grid-cols-3 md:grid-cols-4">
        <div
          id="caract"
          class="text-[13px] text-gray-600 col-span-2 md:col-span-3 md:text-[14px] flex items-center"
        >
          ${superHostTag}
          ${typeDescription}
        </div>
        <div id="raiting" class="flex gap-1 items-center justify-end">
          <img src="./img/star.svg" alt="star raiting" class="red h-4" />
          <p class="text-[13px] md:text-[14px]">${stay.rating.toFixed(2)}</p>
        </div>
      </div>
      <h2 class="px-3 text-[14px] font-bold text-gray-700 md:text-[15px]">
        ${stay.title}
      </h2>
    </section>
  `;
};

export const renderStays = (staysCont) => {
  const container = document.getElementById("containCards");
  const staysCount = document.getElementById("containStays");

  if (container) {
    const cardsHTML = staysCont.map(createStayCard).join("");
    container.innerHTML = cardsHTML;

    if (staysCount) {
      staysCount.textContent = `${staysCont.length}+ stays`;
    }
  }
};

export async function initStays() {
  try {
    const data = await Promise.resolve(stays);
    renderStays(data);

    return data;
  } catch (error) {
    console.error("No se cargo los datos", error);
  }
}
