export default function lightbox() {
  const lightboxItems = document.querySelectorAll('.lightbox-item');
  const lightboxArray = Array.from(lightboxItems);
  const lastImage = lightboxArray[lightboxArray.length - 1];
  const lightboxContainer = document.querySelector('.lightbox-container');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxVideo = document.querySelector('.lightbox-video');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const source = document.createElement('source');

  const lightboxBtns = document.querySelectorAll('.lightbox-btn');
  const lightboxClose = document.querySelector('#close-button');
  const lightboxBtnRight = document.querySelector('#next-item');
  const lightboxBtnLeft = document.querySelector('#previous-item');

  const videoControls = document.querySelector('.video-controls');

  let activeImage;

  const setActiveImage = (image) => {
    activeImage = lightboxArray.indexOf(image);
    if (lightboxArray[activeImage].classList.contains('image')) {
      lightboxImage.style.display = 'block';
      lightboxTitle.innerHTML = image.dataset.title;
      lightboxVideo.style.display = 'none';
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      videoControls.classList.remove('show');
      lightboxVideo.pause();
    }
    if (lightboxArray[activeImage].classList.contains('video')) {
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxTitle.innerHTML = image.dataset.title;
      source.setAttribute('src', `${image.src}`);
      source.setAttribute('type', 'video/mp4');
      source.setAttribute('alt', image.alt);
      lightboxVideo.appendChild(source);
      lightboxVideo.load();
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

  // Video Controls //
  const playButton = document.querySelector('.play-button');
  const fullscreenButton = document.querySelector('.fullscreen');
  const volume = document.querySelector('.volume');
  const volumeBar = document.querySelector('.volume-bar');

  // Event to listen for when the play is playing or paused
  // If video is pause the button will display pause and vice versa
  lightboxVideo.addEventListener('play', () => {
    playButton.classList.add('pause');
    playButton.classList.remove('play');
    videoControls.classList.add('show');
  });
  // Event to listen for when the video has ended
  // If the video has ended the button will display play
  lightboxVideo.addEventListener('ended', () => {
    playButton.classList.add('play');
    playButton.classList.remove('pause');
  });
  // Event to listen for when the video button is clicked //
  playButton.addEventListener('click', () => {
    if (lightboxVideo.paused) {
      lightboxVideo.play();
      playButton.classList.add('pause');
      playButton.classList.remove('play');
      playButton.setAttribute('title', 'Pause');
      playButton.setAttribute('aria-label', 'Pause');
    } else {
      lightboxVideo.pause();
      playButton.classList.remove('pause');
      playButton.classList.add('play');
      playButton.setAttribute('title', 'Play');
      playButton.setAttribute('aria-label', 'Play');
    }
  });
  // Event to listen for when the fullscreen button is clicked //
  fullscreenButton.addEventListener('click', () => {
    if (lightboxVideo.requestFullscreen) {
      lightboxVideo.requestFullscreen();
    } else if (lightboxVideo.mozRequestFullScreen) {
      lightboxVideo.mozRequestFullScreen();
    } else if (lightboxVideo.webkitRequestFullscreen) {
      lightboxVideo.webkitRequestFullscreen();
    } else if (lightboxVideo.msRequestFullscreen) {
      lightboxVideo.msRequestFullscreen();
    }
  });
  // Event double Click to toggle fullscreen //
  lightboxVideo.addEventListener('dblclick', () => {
    if (lightboxVideo.requestFullscreen) {
      lightboxVideo.requestFullscreen();
    } else if (lightboxVideo.mozRequestFullScreen) {
      lightboxVideo.mozRequestFullScreen();
    } else if (lightboxVideo.webkitRequestFullscreen) {
      lightboxVideo.webkitRequestFullscreen();
    } else if (lightboxVideo.msRequestFullscreen) {
      lightboxVideo.msRequestFullscreen();
    }
  });
  // Event to listen for when the volume has changed  //
  // If the volume is 0 the volume icon will display volume 0 and vice versa//
  volumeBar.addEventListener('input', () => {
    lightboxVideo.volume = volumeBar.value;
    if (lightboxVideo.volume == 0) {
      volume.classList.add('volume-disabled');
    } else {
      volume.classList.remove('volume-disabled');
    }
  });
  // Event to listen for when the volume button is clicked //
  volume.addEventListener('click', () => {
    if (lightboxVideo.muted) {
      lightboxVideo.muted = false;
      volume.classList.add('volume-enabled');
      volume.classList.remove('volume-disabled');
      volumeBar.value = lightboxVideo.volume;
    } else {
      lightboxVideo.muted = true;
      volume.classList.add('volume-disabled');
      volume.classList.remove('volume-enabled');
      volumeBar.value = 0;
    }
  });

  // Display current time in the video //
  const currentTime = () => {
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');

    const currentMinutes = Math.floor(lightboxVideo.currentTime / 60);
    const currentSeconds = Math.floor(
      lightboxVideo.currentTime - currentMinutes * 60
    );

    const durationMinutes = Math.floor(lightboxVideo.duration / 60);
    const durationSeconds = Math.floor(
      lightboxVideo.duration - durationMinutes * 60
    );

    currentTime.innerHTML = `${currentMinutes}:${
      currentSeconds < 10 ? '0' : ''
    }${currentSeconds}`;
    duration.innerHTML = `${durationMinutes}:${durationSeconds}`;
  };
  const progressBar = document.querySelector('.video-progress-current');
  const progress = document.querySelector('.progress-bar');
  // Event to listen for when the video has loaded //
  // The duration of the video will be displayed //
  lightboxVideo.addEventListener('loadedmetadata', () => {
    currentTime();
  });
  // Event to listen for when the video has time update //
  // The current time of the video will be displayed //
  lightboxVideo.addEventListener('timeupdate', () => {
    currentTime();
    // update the progress bar //
    progressBar.style.width = `${
      (lightboxVideo.currentTime / lightboxVideo.duration) * 100
    }%`;
  });
  // Event to listen for when the progress bar is clicked //
  progress.addEventListener('click', (e) => {
    const progressTime =
      (e.offsetX / progress.offsetWidth) * lightboxVideo.duration;
    lightboxVideo.currentTime = progressTime;
  });
}
