// Correct selectors for navigation elements
const menu = document.querySelector('nav ul');
const menuBtn = document.querySelector('.menu-open');
const closeBtn = document.querySelector('.menu-close');

// Event listener to open menu
menuBtn.addEventListener('click', () => {
  menu.classList.add('open');
});

// Event listener to close menu
closeBtn.addEventListener('click', () => {
  menu.classList.remove('open');
});
