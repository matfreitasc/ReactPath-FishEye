import photographerFactory from './photographerFactory.js';

async function getPhotographers() {
  const response = await fetch('../../data/photographers.json');
  const data = await response.json();
  return { photographers: data.photographers };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Retreive photographer data
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
