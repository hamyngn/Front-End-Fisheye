function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    function setId() {
        localStorage.setItem("id", id);
    }

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement('a')
        a.setAttribute("href", "photographer.html");
        a.addEventListener("click", setId)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        img.setAttribute("aria-label", "Photographe profile picture")
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", "+ country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.textContent = price + "\u20AC/jour";
        article.appendChild(a);
        a.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }

    function getUserDOM() {
        const div = document.createElement( 'div' );
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city + ", "+ country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(h4);
        return (div);
    }

    function getProfileImg(){
        const div = document.createElement( 'div' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        img.setAttribute("aria-label", "Photographe profile picture")
        div.appendChild(img);
        return (div);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM, getUserDOM, getProfileImg }
}