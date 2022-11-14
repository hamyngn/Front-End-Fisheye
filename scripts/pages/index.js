async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((data) => {
      const { photographers } = data;
      displayData(photographers);
    })
    .catch((err) => console.error(err));
}
//display homepage photographers
async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');
  
    photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }

/*     async function init () {
        const {photographers} = await getPhotographers();
        console.log(photographers);
        displayData(photographers);
    } */

window.onload = () => {
  getPhotographers();
};
