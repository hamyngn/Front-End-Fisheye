/* global photographerFactory */
// display homepage photographers
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const response = await fetch('./data/photographers.json');
  const data = await response.json();
  return data;
}

/**
 * display photographers
 * @param {Array} photographers
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

window.onload = () => {
  // getPhotographers();
  init();
};
