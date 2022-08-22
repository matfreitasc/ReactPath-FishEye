import createProfile from './modules/CreateProfile.js';
import { sortData } from './modules/SortData.js';
import photographerSummary from './modules/PhotographerSummary.js';

import Constants from './modules/Constants.js';

const id = new URLSearchParams(window.location.search).get('id');

getData();

async function getData() {
  const response = await fetch('../../data/photographers.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
  const data = await response.json();

  getPhotographerData(data);
}

function getPhotographerData(data) {
  const photographer = data.photographers.find((photographer) => {
    return photographer.id == id;
  });

  const mediaData = data.media.filter((media) => {
    return media.photographerId == id;
  });
  Constants.photographer = photographer;
  Constants.mediaData = mediaData;
  Constants.photographerNameNoSpace = photographer.name.replace(/\s/g, '');
  Constants.totalLikes = mediaData.reduce((total, media) => {
    return total + media.likes;
  }, 0);
  createProfile();
  sortData();
  photographerSummary();
}
