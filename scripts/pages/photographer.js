/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem('id');
console.log(id);
async function getMedia() {
  // Récupérer les données dans le json
  const response = await fetch('./data/photographers.json');
  const data = await response.json();
  return data;
}
async function init() {
  try {
    const { photographers } = await getMedia();
    const { media } = await getMedia();
    displayDesc(photographers);
    displayGallery(media);
    displayLightBox(media);
    countLikes(media, photographers);
  } catch (err) {
    console.log(err);
  }
}
window.onload = () => {
  init();
};
// diplay photographer informations
async function displayDesc(photographers) {
  for (let i = 0; i < photographers.length; i += 1) {
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
  for (let i = 0; i < media.length; i += 1) {
    if (media[i].photographerId == id) {
      index += 1;
      const gallery = document.querySelector('.gallery');
      const mediaModel = mediaFactory(media[i]);
      const galleryDOM = mediaModel.getUserImagesDOM(index);
      gallery.appendChild(galleryDOM);
    }
  }
}
// increase number of likes
const footer = document.querySelector('#footer');
function addLikes(index) {
  const likes = document.querySelectorAll('.likes-count');
  const totalLikes = document.querySelector('.total-likes');
  const num = parseInt(likes[index - 1].textContent, 10);
  likes[index - 1].textContent = num + 1;
  let total = parseInt(totalLikes.textContent, 10);
  total += 1;
  totalLikes.innerHTML = `${total}<i class="fa-solid fa-heart"></i>`;
}
// footer likes and price
async function countLikes(media, photographers) {
  let likes = 0;
  let price;
  for (let i = 0; i < media.length; i += 1) {
    if (media[i].photographerId == id) {
      likes += media[i].likes;
    }
  }
  for (let i = 0; i < photographers.length; i += 1) {
    if (photographers[i].id == id) {
      price = photographers[i].price;
    }
  }
  const totalLikes = document.createElement('span');
  totalLikes.innerHTML = `${likes}<i class="fa-solid fa-heart"></i>`;
  totalLikes.setAttribute('class', 'total-likes');
  const priceElement = document.createElement('span');
  priceElement.innerHTML = `${price}&euro; / jour`;
  footer.appendChild(totalLikes);
  footer.appendChild(priceElement);
}
// lightbox modal
async function displayLightBox(media) {
  const lightBoxContent = document.querySelector('.lightBox-content');
  const prevButton = document.querySelector('.prev');
  for (let i = 0; i < media.length; i += 1) {
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
  lightBox.setAttribute('aria-hidden', 'false');
  main.setAttribute('aria-hidden', 'true');
}
// close lightbox
function closeLightBox() {
  document.querySelector('.bgmodal').style.display = 'none';
  lightBox.style.display = 'none';
  lightBox.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'false');
}
// show current image
function currentSlide(n) {
  showSlides(n);
}
// show next and previous image
function plusSlides(n) {
  const imgSlides = document.querySelectorAll('.imgSlide');
  let slideIndex;
  for (let j = 0; j < imgSlides.length; j += 1) {
    if (imgSlides[j].style.display === 'block') {
      slideIndex = j + 1;
    }
  }
  showSlides(slideIndex += n);
}
// show image by index
function showSlides(n) {
  let i;
  let index = n;
  const slides = document.getElementsByClassName('imgSlide');
  if (index > slides.length) { index = 1; }
  if (index < 1) { index = slides.length; }
  for (i = 0; i < slides.length; i += 1) {
    slides[i].style.display = 'none';
  }
  slides[index - 1].style.display = 'block';
}
// show previous, next image by pressing arrow left and arrow right

lightBox.addEventListener('keyup', (e) => {
  if (e.keyCode === 37) {
    plusSlides(-1);
  }
  if (e.keyCode === 39) {
    plusSlides(1);
  }
  if (e.keyCode === 27) {
    closeLightBox(); // close modal by pressing escape
  }
});
// filter dropdown
const dropDown = document.querySelector('.dropdown');
const dropBtn = document.querySelector('.dropbtn');
function dropdown() {
  const dropdownContent = document.querySelector('.dropdown-content');
  const chevronUp = document.querySelector('.fa-chevron-up');
  const chevronDown = document.querySelector('.fa-chevron-down');
  if (dropdownContent.style.display === 'none') {
    dropdownContent.style.display = 'block';
    dropBtn.style.borderRadius = '5px 5px 0 0';
    chevronDown.style.display = 'none';
    chevronUp.style.display = 'inline-block';
    dropDown.setAttribute('aria-expanded', 'true');
  } else {
    dropdownContent.style.display = 'none';
    dropBtn.style.borderRadius = '5px';
    chevronDown.style.display = 'inline-block';
    chevronUp.style.display = 'none';
    dropDown.setAttribute('aria-expanded', 'false');
  }
}
const dropIcon = document.querySelector('.dropIcon');
dropIcon.addEventListener('click', dropdown);
// form Submit
const form = document.forms.contact;
function formSubmit() {
  console.log(form.fname.value, form.lname.value, form.email.value);
}
form.addEventListener('submit', formSubmit);
// filter by Popularity
const images = document.getElementById('gallery');
function sortByLikes() {
  let i; let switching; let shouldSwitch;
  const likes = images.getElementsByClassName('likes-count');
  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (likes.length - 1); i + 1) {
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
const popularity = document.querySelector('.popularity');
popularity.addEventListener('click', sortByLikes);
// filter by Name
const nameSort = document.querySelector('.name-sort');
nameSort.addEventListener('click', sortByName);
function sortByName() {
  let i; let switching; let shouldSwitch;
  const names = images.getElementsByTagName('h1');
  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (names.length - 1); i += 1) {
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
    for (i = 0; i < (dates.length - 1); i += 1) {
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
