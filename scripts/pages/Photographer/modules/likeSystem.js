import Constants from './Constants.js';
import displayMedia from './DisplayMedia.js';
import photographerSummary from './PhotographerSummary.js';

export default function like() {
  const likeButtons = document.querySelectorAll('#likeButton');
  const likeSpan = document.querySelectorAll('#likesAmmount');

  likeButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (button.classList.contains('liked')) {
        // get the current likes amount
        const currentLikes = likeSpan[index].innerHTML;
        // add 1 to the current likes amount
        const newLikes = parseInt(currentLikes) - 1;
        // update the likes amount
        likeSpan[index].innerHTML = newLikes;
        // add the liked class to the button
        button.removeAttribute('class', 'liked');
        // remove 1 from the total likes amount
        Constants.totalLikes = Constants.totalLikes - 1;
        photographerSummary();
      } else {
        // get the current likes amount
        const currentLikes = likeSpan[index].innerHTML;
        // add 1 to the current likes amount
        const newLikes = parseInt(currentLikes) + 1;
        // update the likes amount
        likeSpan[index].innerHTML = newLikes;
        // add the liked class to the button
        button.setAttribute('class', 'liked');

        // add the likes to the total likes amount to the total like in the summary
        Constants.totalLikes = Constants.totalLikes + 1;
        photographerSummary();
      }
    });
  });
}
