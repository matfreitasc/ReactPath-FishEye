import Constants from './Constants.js';
import like from './likeSystem.js';

export default function displayMedia() {
  const media = Constants.mediaData;
  const photographerNameNoSpace = Constants.photographerNameNoSpace;
  const gallerGrid = document.querySelector('.gallery-grid');

  media.forEach((profileMedia) => {
    const image = profileMedia.image;

    if (image) {
      const imageName = image.replace(/_/g, ' ');
      const altText = imageName.replace(/.jpg/g, '');

      const article = document.createElement('article');
      article.classList.add('grid-item');
      article.innerHTML = `
              <div class="grid-item ">
              <div class="image-wrapper">
                <img
                  src="./../assets/Sample Photos/${photographerNameNoSpace}/${image}"
                  alt="${altText},closeup view"
                  id='grid-item-lightbox'
                  class="gallery-image skeleton lightbox-item image"
                  data-title='${profileMedia.title}'
                />
              </div>
              
              <section class="gallery-info">
                  <h2 class="gallery-item-title" aria-label="${profileMedia.title}">${profileMedia.title}</h2>
                  <div class="gallery-item-likes">
                  <span aria-label="${profileMedia.likes} Likes " id='likesAmmount'>${profileMedia.likes}</span>
                  <button  aria-label="like" id="likeButton${profileMedia.id}" >
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path data-mediaId="${profileMedia.id}" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                  </button>
                  </div>
              </section>
            </div>
              `;
      gallerGrid.appendChild(article);
    } else {
      const article = document.createElement('article');
      const videoName = profileMedia.video.replace(/.mp4/g, '');
      const videoType = profileMedia.video.split('.')[1];
      article.classList.add('grid-item');
      article.innerHTML = `
              <div class="grid-item">
              <div class="player" id='grid-item-lightbox'>
                  <video data-title='${profileMedia.title}' alt="${profileMedia.title},closeup view"type="video/${videoType}" poster="./../assets/Sample Photos/${photographerNameNoSpace}/${videoName}.png" src="./../assets/Sample Photos/${photographerNameNoSpace}/${profileMedia.video}" class="skeleton lightbox-item video" >
                      <p>Your browser doesn't support HTML5 video. Here is a <a href="./../assets/Sample Photos/${photographerNameNoSpace}/${profileMedia.video}">link to the video</a> instead.</p>
                  </video>
              </div>
              <section class="gallery-info">
                  <h2 class="gallery-item-title" aria-label="${profileMedia.title}">${profileMedia.title}</h2>
                  <div class="gallery-item-likes">
                  <span aria-label="${profileMedia.likes} Likes" id='likesAmmount'>${profileMedia.likes}</span>
                  <button aria-label="like" id="likeButton" >
                  <svg  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path data-mediaId="${profileMedia.id}" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg> 
                  </button>
                  </div>
              </section>
            </div>
              `;
      gallerGrid.appendChild(article);
    }
  });
  like();
}
