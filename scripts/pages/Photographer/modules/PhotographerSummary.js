import Constants from './Constants.js';

export default function photographerSummary() {
  const mediaData = Constants.mediaData;
  const photographer = Constants.photographer;
  let totalLikes = 0;
  mediaData.forEach((profileMedia) => {
    totalLikes += profileMedia.likes;
    return totalLikes;
  });

  document.querySelector('#ph-Summary').innerHTML = `
    <div class="total-likes">
        <p id="ikes-number">${totalLikes}</p>
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
    </div>
          
      <p id="ph-price">
      ${photographer.price}$/day
    </p>
  `;
}
