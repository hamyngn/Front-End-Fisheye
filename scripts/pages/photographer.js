//Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem("id");
async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    fetch('./data/photographers.json')
    .then(response => response.json())
    .then(data => {
        const photographers = data.photographers;
        const media = data.media;
        displayDesc(photographers);
        displayGallery(media);
        displayLightBox(media);   
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

async function displayGallery(media) {
    for(let i=0; i < media.length; i++){
        if(media[i].photographerId == id) {
            const gallery = document.querySelector(".gallery");
            const mediaModel = mediaFactory(media[i]);
            const galleryDOM = mediaModel.getUserImagesDOM();
            gallery.appendChild(galleryDOM);
        }
    }
}

async function displayLightBox(media) {
    const lightBoxContent = document.querySelector(".lightBox-content");
    const prevButton = document.querySelector(".prev");
    for(let i=0; i < media.length; i++){
        if(media[i].photographerId == id) {
            const mediaSlide = mediaFactory(media[i]);
            const mediaSlidesDOM = mediaSlide.lightBoxDOM();
            lightBoxContent.insertBefore(mediaSlidesDOM, prevButton);
        }
    }
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}

var slideIndex = 1;
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("imgSlide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "flex";
}

window.onload = () => {
    getMedia();
}

const dropBtn = document.querySelector(".dropbtn");
dropBtn.addEventListener("click", dropdown);
function dropdown() {
    const dropdownContent = document.querySelector(".dropdown-content");
    const chevronUp = document.querySelector(".fa-chevron-up");
    const chevronDown = document.querySelector(".fa-chevron-down");
    if(dropdownContent.style.display=="none"){
        dropdownContent.style.display= "block";
        dropBtn.style.borderRadius="5px 5px 0 0";
        chevronDown.style.display="none";
        chevronUp.style.display="inline-block";
    } else {
        dropdownContent.style.display="none";
        dropBtn.style.borderRadius="5px";
        chevronDown.style.display="inline-block";
        chevronUp.style.display="none";
    }    
}

function closeLightBox() {
    document.getElementById("lightBox").style.display = "none";
}