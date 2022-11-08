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
window.onload = () => {
    getMedia();
}
// diplay photographer informations
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
// display images and videos
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
// lightbox modal
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
//openLightBox
function openLightBox() {
    document.getElementById("lightBox").style.display = "block";
    document.getElementById("lightBox").setAttribute("tabindex","0");
    document.getElementById("lightBox").focus();
}
//close lightbox
function closeLightBox() {
    document.getElementById("lightBox").style.display = "none";
}

//show current image
function currentSlide(n) {
    showSlides(slideIndex = n);
}
//show next and previous image
var slideIndex = 1;
function plusSlides(n) {
    showSlides(slideIndex += n);
}
//show image by index
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("imgSlide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}
// show previous, next image by click
const lightBox = document.querySelector(".lightBox");
const prevButton = document.querySelector(".prev");
prevButton.addEventListener("click", plusSlides(-1));
const nextButton = document.querySelector(".next");
nextButton.addEventListener("click", plusSlides(1))
//show previous, next image by pressing arrow left and arrow right
// close modal by pressing escape
lightBox.addEventListener('keyup',(e) => {
    if(e.keyCode==37) {
        prevButton.click();
    }
    if(e.keyCode==39) {
        nextButton.click();
    }
    if(e.keyCode==27){
        closeLightBox();
    }
});
//filter dropdown
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