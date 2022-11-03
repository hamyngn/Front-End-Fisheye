//Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem("id");
async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    fetch('./data/photographers.json')
    .then(response => response.json())
    .then(data => {
        console.log("hi")
        const photographers = data.photographers;
        displayDesc(photographers);
    })
    .catch(err => console.error(err));            
}

async function displayDesc(photographers) {
    for(let i=0; i < photographers.length; i++){
        if(photographers[i].id == id) {
            const photographHeader = document.querySelector(".photograph-header");
            const photographerModel = photographerFactory(photographers[i]);
            const userDOM = photographerModel.getUserDOM();
            const userImgDOM = photographerModel.getProfileImg();
            const button = document.querySelector("#contact_button")
            photographHeader.insertBefore(userDOM, button);
            photographHeader.appendChild(userImgDOM);
        }
    }
}

window.onload = () => {
    getMedia();
}