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
// increase number of likes
function addLikes(index) {
  const likesCount = document.querySelectorAll('.likes-count');
  const totalLikes = document.querySelector('.total-likes');
  const num = parseInt(likesCount[index - 1].textContent, 10);
  likesCount[index - 1].textContent = num + 1;
  let total = parseInt(totalLikes.textContent, 10);
  total += 1;
  totalLikes.innerHTML = `${total}<i class="fa-solid fa-heart"></i>`;
}
function mediaFactory(data) {
  const {
    id, photographerId, title, image, video, likes, date, price,
  } = data;
  // create img and video element
  function getUserImages(element, index) {
    if (Object.prototype.hasOwnProperty.call(data, 'video')) {
      const clip = `assets/media/${photographerId}/${video}`;
      const videoClip = document.createElement('video');
      videoClip.setAttribute('src', clip);
      videoClip.setAttribute('aria-label', title);
      videoClip.setAttribute('controls', 'controls');
      videoClip.addEventListener('click', () => {
        openLightBox();
        currentSlide(index);
      });
      element.appendChild(videoClip);
    }
    if (Object.prototype.hasOwnProperty.call(data, 'image')) {
      const picture = `assets/media/${photographerId}/${image}`;
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', title);
      img.addEventListener('click', () => {
        openLightBox();
        currentSlide(index);
      });
      element.appendChild(img);
    }
    return (element);
  }
  // create lightbox
  function lightBoxDOM() {
    const div = document.createElement('div');
    div.setAttribute('class', 'imgSlide');
    getUserImages(div);
    const descDiv = document.createElement('div');
    descDiv.setAttribute('class', 'img-desc');
    const h1 = document.createElement('h1');
    h1.textContent = title;
    descDiv.appendChild(h1);
    div.appendChild(descDiv);
    return (div);
  }

  // create image and video description
  function getUserImagesDOM(index) {
    const article = document.createElement('article');
    getUserImages(article, index);
    const div = document.createElement('div');
    div.setAttribute('class', 'img-desc');
    const h1 = document.createElement('h1');
    h1.textContent = title;
    const h2 = document.createElement('h2');
    h2.textContent = date;
    h2.style.display = 'none';
    const like = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = likes;
    span.setAttribute('class', 'likes-count');
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-heart like-icon');
    icon.setAttribute('aria-label', 'likes');
    // increase likes
    icon.addEventListener('click', () => {
      addLikes(index);
    }, { once: true });
    like.appendChild(span);
    like.appendChild(icon);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(like);
    article.appendChild(div);
    return (article);
  }
  return {
    id, photographerId, title, image, video, likes, date, price, getUserImagesDOM, lightBoxDOM,
  };
}
