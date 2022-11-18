/* eslint-disable eqeqeq */
/* global photographerFactory, mediaFactory */
// Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem('id');
console.log(id);
async function getMedia() {
  // Récupérer les données dans le json
  const response = await fetch('./data/photographers.json');
  const data = await response.json();
  return data;
}
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
// footer likes and price
const footer = document.querySelector('#footer');
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
const nameSort = document.querySelector('.name-sort');
nameSort.addEventListener('click', sortByName);
// filter by date
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
const dateSort = document.querySelector('.date-sort');
dateSort.addEventListener('click', sortByDate);
