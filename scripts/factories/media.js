function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    var i = 0;
    function getUserImages(element) {
        if (data.hasOwnProperty("video")) {
            const clip = `assets/media/${photographerId}/${video}`;
            const videoClip = document.createElement('video');
            videoClip.setAttribute("src", clip)
            videoClip.setAttribute("controls", "controls")
            i++;
            videoClip.addEventListener("click",() => {
                openLightBox();
                currentSlide(i);
            } );
            element.appendChild(videoClip);
        }
        if (data.hasOwnProperty("image")) {     
            const picture = `assets/media/${photographerId}/${image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture)
            img.setAttribute("alt", title)
            img.addEventListener("click",() => {
                openLightBox();
                currentSlide(i);
            } );
            element.appendChild(img);
        }
        return (element);
    }

    function getUserImagesDOM() {
        const article = document.createElement( 'article' );
        getUserImages(article );
        const div = document.createElement('div')
        div.setAttribute("class", "img-desc")
        const h1 = document.createElement('h1')
        h1.textContent = title;
        const like = document.createElement('div')
        like.innerHTML= likes + '<i class="fa-solid fa-heart"></i>';
        div.appendChild(h1);
        div.appendChild(like);
        article.appendChild(div);
        return (article);
    }

    function lightBoxDOM(){
        const div = document.createElement( 'div' );
        div.setAttribute("class", "imgSlide")
        getUserImages(div);
        const span = document.createElement('span');
        span.textContent = "&times;"
        span.addEventListener("click", closeLightBox);
        const descDiv = document.createElement('div')
        descDiv.setAttribute("class", "img-desc")
        const h1 = document.createElement('h1')
        h1.textContent = title;
        descDiv.appendChild(h1);
        div.appendChild(descDiv);
        return (div);
    }
    
    return { id, photographerId, title, image, video, likes, date, price, getUserImagesDOM,lightBoxDOM, showSlides };
}