function mediaFactory(data) {
  const {
    id, photographerId, title, image, video, likes, date, price,
  } = data;
  // create img and video element
  function getUserImages(element, index) {
    if (data.hasOwnProperty('video')) {
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
    if (data.hasOwnProperty('image')) {
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
    like.setAttribute('aria-label', 'likes');
    const span = document.createElement('span');
    span.textContent = likes;
    span.setAttribute('class', 'likes-count');
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-heart like-icon');
    icon.setAttribute('aria-hidden','true')
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
  // create lightbox
  function lightBoxDOM() {
    const div = document.createElement('div');
    div.setAttribute('class', 'imgSlide');
    getUserImages(div);
    const span = document.createElement('span');
    span.textContent = '&times;';
    span.setAttribute('aria-label','close')
    span.addEventListener('click', () => { closeLightBox(); });
    const descDiv = document.createElement('div');
    descDiv.setAttribute('class', 'img-desc');
    const h1 = document.createElement('h1');
    h1.textContent = title;
    descDiv.appendChild(h1);
    div.appendChild(descDiv);
    return (div);
  }

  return {
    id, photographerId, title, image, video, likes, date, price, getUserImagesDOM, lightBoxDOM,
  };
}
