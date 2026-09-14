const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');

  menuButton.textContent = isOpen ? '✕' : '☰';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navigation.addEventListener('click', (event) => {
  if (event.target.matches('a') && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  }
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
