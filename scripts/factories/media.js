function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;

    function getUserImagesDOM() {
        const article = document.createElement( 'article' );
        if (data.hasOwnProperty("video")) {
            const clip = `assets/media/${photographerId}/${video}`;
            const videoClip = document.createElement('video');
            videoClip.setAttribute("controls", "controls")
            const source = document.createElement('source')
            source.setAttribute("src", clip);
            source.setAttribute("type", "video/mp4");
            videoClip.appendChild(source);
            article.appendChild(videoClip);
        }
        if (data.hasOwnProperty("image")) {     
            const picture = `assets/media/${photographerId}/${image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture)
            img.setAttribute("alt", title)
            article.appendChild(img);
        }
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
    return { id, photographerId, title, image, video, likes, date, price, getUserImagesDOM };
}