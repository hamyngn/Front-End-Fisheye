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
        countLikes(media, photographers);  
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
            // photographer page header
            const photographHeader = document.querySelector(".photograph-header");
            const photographerModel = photographerFactory(photographers[i]);
            const userDOM = photographerModel.getUserDOM();
            const userImgDOM = photographerModel.getProfileImg();
            const button = document.querySelector("#contact_button")
            photographHeader.insertBefore(userDOM, button);
            photographHeader.appendChild(userImgDOM);
            //contact modal header
            const modalHeader = document.querySelector(".header-text");
            const userNameDOM = photographerModel.getUserNameDOM();
            modalHeader.appendChild(userNameDOM);
        }
    }
}
// display images and videos
async function displayGallery(media) {
    var index = 0;
    for(let i=0; i < media.length; i++){
        if(media[i].photographerId == id) {
            index++;
            const gallery = document.querySelector(".gallery");
            const mediaModel = mediaFactory(media[i]);
            const galleryDOM = mediaModel.getUserImagesDOM(index);
            gallery.appendChild(galleryDOM);
        }
    }
}
//footer likes and price 
async function countLikes(media, photographers){
    let likes = 0;
    let price;
    for(let i=0; i < media.length; i++){
        if(media[i].photographerId == id) {
            likes+=media[i].likes;
            
        }
    }
    for(let i=0; i < photographers.length; i++){
        if(photographers[i].id == id) {
            price = photographers[i].price;
        }
    }
    console.log(likes)
    const footer = document.querySelector("#footer");
    const likesBox = document.createElement ('div');
    likesBox.innerHTML = likes + '<i class="fa-solid fa-heart"></i>' + price +"&euro; / jour";
    footer.appendChild(likesBox);

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
    document.querySelector(".bgmodal").style.display= "block";
    document.getElementById("lightBox").style.display = "block";
    document.getElementById("lightBox").setAttribute("tabindex","0");//to enable keyup
    document.getElementById("lightBox").focus(); //to enable keyup
}
//close lightbox
function closeLightBox() {
    document.querySelector(".bgmodal").style.display= "none";
    document.getElementById("lightBox").style.display = "none";
}
//show current image
function currentSlide(n) {
    showSlides(n);
}
//show next and previous image
function plusSlides(n) {
    var imgSlides = document.querySelectorAll(".imgSlide");
    for(var j = 0; j< imgSlides.length; j++){
        if (imgSlides[j].style.display == "block") {
            var slideIndex = j+1;
        }
    }  
    showSlides(slideIndex += n);
}
//show image by index
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("imgSlide");
    if (n > slides.length) {n = 1}
    if (n < 1) {n = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[n-1].style.display = "block";
}
// show previous, next image by pressing arrow left and arrow right
const lightBox = document.querySelector(".lightBox");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
lightBox.addEventListener('keyup',(e) => {
    if(e.keyCode==37) {
        prevButton.click();
    }
    if(e.keyCode==39) {
        nextButton.click();
    }
    if(e.keyCode==27){
        closeLightBox(); // close modal by pressing escape
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