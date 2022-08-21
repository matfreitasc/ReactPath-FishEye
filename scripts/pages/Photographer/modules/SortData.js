import lightbox from './Lightbox.js';
import displayMedia from './DisplayMedia.js';
import Constants from './Constants.js';

const orderBtn = document.querySelector('#dropdown-menu');
const arrow = document.querySelector('#arrow-icon');
const selectedOrder = document.querySelector('#order-field-name');
const buttonSelection = document.querySelector('.buttons-section');

orderBtn.addEventListener('click', () => {
  if (buttonSelection.style.display === 'block') {
    buttonSelection.style.display = 'none';
    orderBtn.classList.remove('bottom-border-radius');
    arrow.classList.remove('arrow-rotate');
  } else {
    buttonSelection.style.display = 'block';
    orderBtn.classList.add('bottom-border-radius');
    arrow.classList.add('arrow-rotate');
  }
});
buttonSelection.addEventListener('click', (e) => {
  selectedOrder.innerHTML = e.target.innerHTML;
  const addSelect = buttonSelection.querySelectorAll('button');
  e.target.classList.add('active');
  addSelect.forEach((button) => {
    if (button !== e.target) {
      button.classList.remove('active');
    }
  });
  buttonSelection.style.display = 'none';
  orderBtn.classList.remove('bottom-border-radius');
  arrow.classList.remove('arrow-rotate');
  sortData(e.target.id);
});

export function sortData(sortBy) {
  const media = Constants.mediaData;
  let galleryItems = document.querySelectorAll('.grid-item');
  if (sortBy == 'date' || sortBy == undefined) {
    galleryItems.forEach((item) => {
      item.remove();
    });

    displayMedia(
      media.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
    );
    lightbox();
  } else if (sortBy == 'popularity') {
    galleryItems.forEach((item) => {
      item.remove();
    });
    displayMedia(
      media.sort((a, b) => {
        return b.likes - a.likes;
      })
    );
    lightbox();
  } else if (sortBy == 'title') {
    galleryItems.forEach((item) => {
      item.remove();
    });
    displayMedia(
      media.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      })
    );
    lightbox();
  }
}
