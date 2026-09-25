const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Cardston Alberta",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923, August, 26",
    area: 88562,
    imageUrl: "https://eze01061985.github.io/wdd131/images/temple-cardston.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "https://eze01061985.github.io/wdd131/images/temple-rome.jpg"
  },
  {
    templeName: "Cebu City Philippines",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29556,
    imageUrl: "https://eze01061985.github.io/wdd131/images/temple-cebu.jpg"
  }
];

const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
const gallery = document.querySelector('#temple-cards');
const pageTitle = document.querySelector('main h1');
const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');

function displayTemples(templeList) {
  let cards = '';

  templeList.forEach((temple) => {
    cards += `<figure>
      <figcaption>
        <h2>${temple.templeName}</h2>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Size:</strong> ${temple.area} sq ft</p>
      </figcaption>
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" width="400" height="250" loading="lazy">
    </figure>`;
  });

  gallery.innerHTML = cards;
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');

  menuButton.textContent = isOpen ? '✕' : '☰';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navigation.addEventListener('click', (event) => {
  if (!event.target.matches('a')) return;
  event.preventDefault();

  const link = event.target;
  let filteredTemples = temples;

  if (link.dataset.filter === 'old') {
    filteredTemples = temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) < 1900);
  } else if (link.dataset.filter === 'new') {
    filteredTemples = temples.filter((temple) => Number(temple.dedicated.slice(0, 4)) > 2000);
  } else if (link.dataset.filter === 'large') {
    filteredTemples = temples.filter((temple) => temple.area > 90000);
  } else if (link.dataset.filter === 'small') {
    filteredTemples = temples.filter((temple) => temple.area < 10000);
  }

  pageTitle.textContent = link.textContent;
  displayTemples(filteredTemples);

  navigation.querySelectorAll('a').forEach((item) => {
    item.classList.remove('active');
    item.removeAttribute('aria-current');
  });
  link.classList.add('active');
  link.setAttribute('aria-current', 'page');

  if (navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.textContent = '☰';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  }
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
displayTemples(temples);
