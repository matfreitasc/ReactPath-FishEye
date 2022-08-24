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
const first = document.getElementById('firstName');
const firstNameError = document.getElementById('error-message1');
const last = document.getElementById('lastName');
const lastNameError = document.getElementById('error-message2');
const email = document.getElementById('email');
const emailError = document.getElementById('error-message3');
const message = document.getElementById('message');
const messageError = document.getElementById('error-message4');

function firstName() {
  if (first.value === '' || first.value === null || first.value.length < 2) {
    firstNameError.classList.add('error');
    return false;
  } else {
    firstNameError.classList.remove('error');
    return true;
  }
}

function lastName() {
  if (last.value === '' || last.value === null || last.value.length < 2) {
    lastNameError.classList.add('error');
    return false;
  }
  lastNameError.classList.remove('error');
  return true;
}

function emailValidation() {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.value === '' || email.value === null) {
    emailError.classList.add('error');
    return false;
  } else if (!emailRegex.test(email.value)) {
    emailError.classList.add('error');
    return false;
  } else {
    emailError.classList.remove('error');
    return true;
  }
}

function messageValidation() {
  if (message.value === '' || message.value === null) {
    messageError.classList.add('error');
    return false;
  } else {
    messageError.classList.remove('error');
    return true;
  }
}

function formValidation() {
  if (firstName() && lastName() && emailValidation() && messageValidation()) {
    return true;
  } else {
    return false;
  }
}

first.addEventListener('keyup', firstName);
last.addEventListener('keyup', lastName);
email.addEventListener('keyup', emailValidation);
message.addEventListener('keyup', messageValidation);
message.addEventListener('focus', messageValidation);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formValidation()) {
    form.submit();
  }
});
