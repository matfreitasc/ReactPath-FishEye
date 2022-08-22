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

// Dialog on submit form
const form = document.getElementById('modal');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    firstName.value === '' &&
    lastName.value == '' &&
    email.value === '' &&
    message.value === ''
  ) {
    alert('Please fill in all fields');
  } else {
    console.log('Form submitted');
    modal.close();
  }
});
