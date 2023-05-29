import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  if (formEl.email.value === '' || formEl.message.value === '') {
    return alert('All fields must be filled');
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const valueOfTextarea = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, valueOfTextarea);
}

function populateTextarea() {
  const savedValueOfTextarea = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedValueOfTextarea) {
    formEl.email.value = savedValueOfTextarea.email;
    formEl.message.value = savedValueOfTextarea.message;
  }
}
