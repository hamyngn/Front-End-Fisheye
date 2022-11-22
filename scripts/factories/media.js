/* eslint-disable no-unused-vars */
/* global showSlides, lightBox, main */
function mediaFactory(data) {
  const {
    id, photographerId, title, image, video, likes, date, price,
  } = data;

  // openLightBox
  function openLightBox() {
    document.querySelector('.bgmodal').style.display = 'block';
    lightBox.style.display = 'block';
    lightBox.setAttribute('tabindex', '0');
    lightBox.focus();
    lightBox.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
  }

  // show current image
  function currentSlide(n) {
    showSlides(n);
  }

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

  // increase number of likes
  function addLikes(index) {
    const likesCount = document.querySelector(`[index="${index}"]`);
    const totalLikes = document.querySelector('.total-likes');
    const num = parseInt(likesCount.textContent, 10);
    likesCount.textContent = num + 1;
    let total = parseInt(totalLikes.textContent, 10);
    total += 1;
    totalLikes.innerHTML = `${total}<i class="fa-solid fa-heart"></i>`;
  }

  // create image and video description
  function getUserImagesDOM(index) {
    const article = document.createElement('article');
    getUserImages(article, index);
    const div = document.createElement('div');
    div.setAttribute('class', 'img-desc');
    const h1 = document.createElement('h1');
    h1.textContent = title;
    h1.setAttribute('imgIndex', index);
    const h2 = document.createElement('h2');
    h2.textContent = date;
    h2.style.display = 'none';
    const like = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = likes;
    span.setAttribute('class', 'likes-count');
    span.setAttribute('index', index);
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-heart like-icon');
    icon.setAttribute('aria-label', 'likes');
    icon.setAttribute('iconIndex', index);

    // increase likes
    icon.addEventListener('click', () => {
      addLikes(index);
    }, { once: true });
    icon.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const likesCount = document.querySelector(`[iconIndex="${index}"]`);
        likesCount.click();
      }
    });
    like.appendChild(span);
    like.appendChild(icon);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(like);
    article.appendChild(div);
    // open LightBox by Key
    h1.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        openLightBox();
        currentSlide(index);
      }
    });
    return (article);
  }
  return {
    id, photographerId, title, image, video, likes, date, price, getUserImagesDOM, lightBoxDOM,
  };
}
