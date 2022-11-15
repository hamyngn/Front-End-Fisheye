// Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem('id');
async function getMedia() {
  // Récupérer les données dans le json
  fetch('./data/photographers.json')
    .then((response) => response.json())
    .then((data) => {
      const { photographers } = data;
      const { media } = data;
      displayDesc(photographers);
      displayGallery(media);
      displayLightBox(media);
      countLikes(media, photographers);
    })
    .catch((err) => console.error(err));
}
window.onload = () => {
  getMedia();
};
// diplay photographer informations
async function displayDesc(photographers) {
  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == id) {
      // photographer page header
      const photographHeader = document.querySelector('.photograph-header');
      const photographerModel = photographerFactory(photographers[i]);
      const userDOM = photographerModel.getUserDOM();
      const userImgDOM = photographerModel.getProfileImg();
      const button = document.querySelector('#contact_button');
      photographHeader.insertBefore(userDOM, button);
      photographHeader.appendChild(userImgDOM);
      // contact modal header
      const modalHeader = document.querySelector('.header-text');
      const userNameDOM = photographerModel.getUserNameDOM();
      modalHeader.appendChild(userNameDOM);
    }
  }
}
// display images and videos
async function displayGallery(media) {
  let index = 0;
  for (let i = 0; i < media.length; i++) {
    if (media[i].photographerId == id) {
      index++;
      const gallery = document.querySelector('.gallery');
      const mediaModel = mediaFactory(media[i]);
      const galleryDOM = mediaModel.getUserImagesDOM(index);
      gallery.appendChild(galleryDOM);
    }
  }
}

// increase number of likes
function addLikes(index) {
  const likes = document.querySelectorAll('.likes-count');
  const num = parseInt(likes[index - 1].textContent);
  likes[index - 1].textContent = num + 1;
}

// footer likes and price
async function countLikes(media, photographers) {
  let likes = 0;
  let price;
  for (let i = 0; i < media.length; i++) {
    if (media[i].photographerId == id) {
      likes += media[i].likes;
    }
  }
  for (let i = 0; i < photographers.length; i++) {
    if (photographers[i].id == id) {
      price = photographers[i].price;
    }
  }
  const footer = document.querySelector('#footer');
  const likesBox = document.createElement('div');
  likesBox.innerHTML = `${likes}<i class="fa-solid fa-heart"></i>${price}&euro; / jour`;
  footer.appendChild(likesBox);
}
// lightbox modal
async function displayLightBox(media) {
  const lightBoxContent = document.querySelector('.lightBox-content');
  const prevButton = document.querySelector('.prev');
  for (let i = 0; i < media.length; i++) {
    if (media[i].photographerId == id) {
      const mediaSlide = mediaFactory(media[i]);
      const mediaSlidesDOM = mediaSlide.lightBoxDOM();
      lightBoxContent.insertBefore(mediaSlidesDOM, prevButton);
    }
  }
}
// openLightBox
const lightBox = document.querySelector('.lightBox');
const main = document.querySelector('#main');
function openLightBox() {
  document.querySelector('.bgmodal').style.display = 'block';
  lightBox.style.display = 'block';
  lightBox.setAttribute('tabindex', '0');// to enable keyup
  lightBox.focus(); // to enable keyup
  lightBox.setAttribute('aria-hidden','false');
  main.setAttribute('aria-hidden','true');
}
// close lightbox
function closeLightBox() {
  document.querySelector('.bgmodal').style.display = 'none';
  lightBox.style.display = 'none';
  lightBox.setAttribute('aria-hidden','true');
  main.setAttribute('aria-hidden','false');
}
// show current image
function currentSlide(n) {
  showSlides(n);
}
// show next and previous image
function plusSlides(n) {
  const imgSlides = document.querySelectorAll('.imgSlide');
  for (let j = 0; j < imgSlides.length; j++) {
    if (imgSlides[j].style.display == 'block') {
      var slideIndex = j + 1;
    }
  }
  showSlides(slideIndex += n);
}
// show image by index
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('imgSlide');
  if (n > slides.length) { n = 1; }
  if (n < 1) { n = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[n - 1].style.display = 'block';
}
// show previous, next image by pressing arrow left and arrow right

lightBox.addEventListener('keyup', (e) => {
  if (e.keyCode == 37) {
    plusSlides(-1);
  }
  if (e.keyCode == 39) {
    plusSlides(1);
  }
  if (e.keyCode == 27) {
    closeLightBox(); // close modal by pressing escape
  }
});
// filter dropdown
const dropDown= document.querySelector('.dropdown')
const dropBtn = document.querySelector('.dropbtn');
const dropIcon = document.querySelector('.dropIcon');
dropIcon.addEventListener('click', dropdown);
function dropdown() {
  const dropdownContent = document.querySelector('.dropdown-content');
  const chevronUp = document.querySelector('.fa-chevron-up');
  const chevronDown = document.querySelector('.fa-chevron-down');
  if (dropdownContent.style.display == 'none') {
    dropdownContent.style.display = 'block';
    dropBtn.style.borderRadius = '5px 5px 0 0';
    chevronDown.style.display = 'none';
    chevronUp.style.display = 'inline-block';
    dropDown.setAttribute('aria-expanded','true');
  } else {
    dropdownContent.style.display = 'none';
    dropBtn.style.borderRadius = '5px';
    chevronDown.style.display = 'inline-block';
    chevronUp.style.display = 'none';
    dropDown.setAttribute('aria-expanded','false');
  }
}
// form Submit
const form = document.forms.contact;
form.addEventListener('submit', formSubmit);
function formSubmit() {
  console.log(form.fname.value, form.lname.value, form.email.value);
}
// filter by Popularity
const popularity = document.querySelector('.popularity');
popularity.addEventListener('click', sortByLikes);
const images = document.getElementById('gallery');
function sortByLikes() {
  let i; let switching; let shouldSwitch;
  const likes = images.getElementsByClassName('likes-count');
  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (likes.length - 1); i++) {
      shouldSwitch = false;
      if (Number(likes[i].innerHTML) < Number(likes[i + 1].innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      images.insertBefore((likes[i + 1]).closest('article'), likes[i].closest('article'));
      switching = true;
    }
  }
}
// filter by Name
const nameSort = document.querySelector('.name-sort');
nameSort.addEventListener('click', sortByName);
function sortByName() {
  let i; let switching; let shouldSwitch;
  const names = images.getElementsByTagName('h1');
  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (names.length - 1); i++) {
      shouldSwitch = false;
      if (names[i].innerHTML.toLowerCase() > names[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      images.insertBefore((names[i + 1]).closest('article'), names[i].closest('article'));
      switching = true;
    }
  }
}
// filter by date
const dateSort = document.querySelector('.date-sort');
dateSort.addEventListener('click', sortByDate);
function sortByDate() {
    let i; let switching; let shouldSwitch;
  const dates = images.getElementsByTagName('h2');
  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (dates.length - 1); i++) {
      shouldSwitch = false;
      if (dates[i].innerHTML.toLowerCase() > dates[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      images.insertBefore((dates[i + 1]).closest('article'), dates[i].closest('article'));
      switching = true;
    }
  }
}
