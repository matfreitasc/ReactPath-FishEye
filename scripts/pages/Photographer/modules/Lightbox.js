export default function lightbox() {
  const lightboxItems = document.querySelectorAll('.lightbox-item');
  const lightboxArray = Array.from(lightboxItems);
  const lastImage = lightboxArray[lightboxArray.length - 1];
  const lightboxContainer = document.querySelector('.lightbox-container');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxVideo = document.querySelector('.lightbox-video');

  const lightboxBtns = document.querySelectorAll('.lightbox-btn');
  const lightboxClose = document.querySelector('#close-button');
  const lightboxBtnRight = document.querySelector('#next-item');
  const lightboxBtnLeft = document.querySelector('#previous-item');

  let activeImage;

  const setActiveImage = (image) => {
    activeImage = lightboxArray.indexOf(image);
    if (lightboxArray[activeImage].classList.contains('image')) {
      lightboxImage.style.display = 'block';
      lightboxVideo.style.display = 'none';
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
    }
    if (lightboxArray[activeImage].classList.contains('video')) {
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = image.src;
      lightboxVideo.alt = image.alt;
      lightboxVideo.play();
    }
    switch (activeImage) {
      case 0:
        lightboxBtnLeft.classList.add('inactive');
        lightboxBtnRight.classList.remove('inactive');
        break;
      case lightboxArray.length - 1:
        lightboxBtnLeft.classList.remove('inactive');
        lightboxBtnRight.classList.add('inactive');
        break;
      default:
        lightboxBtns.forEach((btn) => {
          btn.classList.remove('inactive');
        });
    }
  };

  const removebtnFocus = () => {
    lightboxBtns.forEach((btn) => {
      setTimeout(() => {
        btn.blur();
      }, 100);
    });
  };

  lightboxItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      setActiveImage(item);
      lightboxContainer.classList.add('modal-active');
    });
  });
  // add event listener for the close button
  lightboxClose.addEventListener('click', () => {
    lightboxContainer.classList.remove('modal-active');
  });
  lightboxBtns.forEach((btns) => {
    btns.addEventListener('click', (e) => {
      if (e.currentTarget.id == 'previous-item') {
        lightboxBtnLeft.focus();
        activeImage === 0
          ? setActiveImage(lastImage)
          : setActiveImage(lightboxArray[activeImage - 1]);
        removebtnFocus();
      }
      if (e.currentTarget.id == 'next-item') {
        lightboxBtnRight.focus();
        activeImage === lastImage
          ? setActiveImage(lastImage)
          : setActiveImage(lightboxArray[activeImage + 1]);
        removebtnFocus();
      }
    });
  });
  window.addEventListener('keydown', (e) => {
    if (!lightboxContainer.classList.contains('modal-active')) return;
    if (e.key == 'ArrowLeft') {
      lightboxBtnLeft.focus();
      activeImage === 0
        ? setActiveImage(lastImage)
        : setActiveImage(lightboxArray[activeImage - 1]);
      removebtnFocus();
    }
    if (e.key == 'ArrowRight') {
      lightboxBtnRight.focus();
      activeImage === lastImage
        ? setActiveImage(lastImage)
        : setActiveImage(lightboxArray[activeImage + 1]);
      removebtnFocus();
    }
    if (e.key == 'Escape') {
      lightboxContainer.classList.remove('modal-active');
    }
  });
}
