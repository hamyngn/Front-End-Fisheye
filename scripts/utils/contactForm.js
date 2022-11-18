/* global main */
const modal = document.getElementById('contact_modal');
const closeButton = document.querySelector('.close-modal');
const openModal = document.querySelector('.contact_button');
// open contact modal
function displayModal() {
  document.querySelector('.bgmodal').style.display = 'block';
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  main.setAttribute('aria-hidden', 'true');
  closeButton.focus();
}
// close contact modal
function closeModal() {
  document.querySelector('.bgmodal').style.display = 'none';
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'false');
  openModal.focus();
}
closeButton.addEventListener('keyup', (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
