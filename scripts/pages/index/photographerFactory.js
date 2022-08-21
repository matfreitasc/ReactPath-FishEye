export default function photographerFactory(data) {
  const picture = `../../assets/photographers/${data.portrait}`;

  function getUserCardDOM() {
    const photographerName = data.name.replace(/\s/g, '');
    const article = document.createElement('article');
    article.classList.add('photographer-article');
    article.innerHTML = `
        <a href="/photographer.html?id=${data.id}" >
            <div class="photographer-avatar">
                <img class="skeleton" src="${picture}" alt="${data.name}">
            </div>
        </a>
        <h2 id="Name">${data.name}</h2>
        <p id="Country">${data.city}, ${data.country}</p>
        <p id="Tagline">${data.tagline}</p>
        <p id="Price">$${data.price}/day</p>
    `;

    return article;
  }
  return { picture, getUserCardDOM };
}
