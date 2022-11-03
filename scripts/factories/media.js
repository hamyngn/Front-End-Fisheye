function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    const picture = `assets/media/${id}/${image}`;

    function getUserImagesDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", title)
        article.appendChild(img);
        return (article);
    }
    return { id, photographerId, title, image, likes, date, price, getUserImagesDOM };
}