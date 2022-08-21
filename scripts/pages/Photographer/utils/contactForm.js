const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const contactMe = document.getElementById('contactMe');
import Constants from '../modules/Constants.js';

openModal.addEventListener('click', () => {
  modal.showModal();
  let name = Constants.photographer.name;
  contactMe.innerHTML = `Contact ${name}`;
});

closeModal.addEventListener('click', () => {
  modal.close();
});
export default openModal;
