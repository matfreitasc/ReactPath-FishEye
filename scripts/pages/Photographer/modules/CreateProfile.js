import Constants from './Constants.js';

export default function createProfile() {
  const photographer = Constants.photographer;
  const phName = document.querySelector('#ph-Name');
  const phCity = document.querySelector('#ph-City');
  const phTagline = document.querySelector('#ph-Tagline');
  const phPhoto = document.querySelector('#ph-photo');

  phName.innerHTML = `${photographer.name}`;
  phName.setAttribute('aria-label', `Name: ${photographer.name}`);
  phCity.innerHTML = `${photographer.city}, ${photographer.country}`;
  phCity.setAttribute(
    'aria-label',
    `City: ${photographer.city}, Country: ${photographer.country}`
  );
  phTagline.innerHTML = `${photographer.tagline}`;
  phTagline.setAttribute(
    'aria-label',
    `Inspiration Quote: ${photographer.tagline}`
  );
  phPhoto.setAttribute(
    'src',
    `../../assets/photographers/${photographer.portrait}`
  );
}
