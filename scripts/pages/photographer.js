/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* global photographerFactory, mediaFactory */
// Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem('id');
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
  let tabindex = 7;
  for (let i = 0; i < media.length; i += 1) {
    if (media[i].photographerId == id) {
      index += 1;
      const gallery = document.querySelector('.gallery');
      const mediaModel = mediaFactory(media[i]);
      const galleryDOM = mediaModel.getUserImagesDOM(index);
      gallery.appendChild(galleryDOM);
      const descIndex = document.querySelector(`[imgIndex="${index}"]`);
      descIndex.setAttribute('tabindex', tabindex += 1);
      const like = document.querySelector(`[iconIndex="${index}"]`);
      like.setAttribute('tabindex', tabindex += 1);
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
const dropdownContent = document.querySelector('.dropdown-content');
const chevronUp = document.querySelector('.fa-chevron-up');
const chevronDown = document.querySelector('.fa-chevron-down');
function dropdown() {
  dropdownContent.style.display = 'block';
  dropBtn.style.borderRadius = '5px 5px 0 0';
  chevronDown.style.display = 'none';
  chevronUp.style.display = 'inline-block';
  dropDown.setAttribute('aria-expanded', 'true');
  chevronUp.focus();
}

// filter roll up
function rollUp() {
  dropdownContent.style.display = 'none';
  dropBtn.style.borderRadius = '5px';
  chevronDown.style.display = 'inline-block';
  chevronUp.style.display = 'none';
  dropDown.setAttribute('aria-expanded', 'false');
  chevronDown.focus();
}
chevronDown.addEventListener('click', dropdown);
chevronUp.addEventListener('click', rollUp);
chevronDown.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    dropdown();
  }
});
chevronUp.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    rollUp();
  }
});

// form Submit
const form = document.forms.contact;
function formSubmit() {
  console.log(form.fname.value, form.lname.value, form.email.value);
}
form.addEventListener('submit', formSubmit);

// change tabindex after sorting
const images = document.getElementById('gallery');
const imgDesc = images.getElementsByTagName('h1');
const likeIcon = images.getElementsByTagName('i');
function changeTabIndex() {
  let tabindex = 7;

  for (let j = 0; j < imgDesc.length; j += 1) {
    tabindex += 1;
    imgDesc[j].tabIndex = tabindex;
    likeIcon[j].tabIndex = tabindex + 1;
  }
}

// filter by Popularity
function sortByLikes() {
  let i; let switching; let shouldSwitch;
  const likes = images.getElementsByClassName('likes-count');

  switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (likes.length - 1); i += 1) {
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
  images.getElementsByTagName('article')[0].focus();
  changeTabIndex();
}
const popularity = document.querySelector('.popularity');
popularity.addEventListener('click', sortByLikes);
popularity.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    sortByLikes();
  }
});

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
  images.getElementsByTagName('article')[0].focus();
  changeTabIndex();
}
const nameSort = document.querySelector('.name-sort');
nameSort.addEventListener('click', sortByName);
nameSort.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    sortByName();
  }
});

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
  images.getElementsByTagName('article')[0].focus();
  changeTabIndex();
}
const dateSort = document.querySelector('.date-sort');
dateSort.addEventListener('click', sortByDate);
dateSort.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    sortByDate();
  }
});

// close lightbox
const lightBox = document.querySelector('.lightBox');
const main = document.querySelector('#main');
function closeLightBox() {
  document.querySelector('.bgmodal').style.display = 'none';
  lightBox.style.display = 'none';
  lightBox.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'false');
  imgDesc[0].focus();
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
