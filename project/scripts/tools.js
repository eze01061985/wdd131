const tools = [
  {
    id: 'godot',
    name: 'Godot',
    category: 'engine',
    description: 'A game engine with dedicated 2D tools and support for 3D games. Its scenes and nodes help organize game objects, and GDScript lets you write their behavior.',
    exercise: 'Create a scene with one character and make it move with the arrow keys.',
    url: 'https://godotengine.org/features/'
  },
  {
    id: 'gdevelop',
    name: 'GDevelop',
    category: 'engine',
    description: 'A game engine with a visual event system. You can describe conditions and actions to build game behavior without starting with a programming language.',
    exercise: 'Make an object disappear when the player clicks it, then increase a score.',
    url: 'https://gdevelop.io/'
  },
  {
    id: 'krita',
    name: 'Krita',
    category: 'art',
    description: 'A digital painting tool with brushes and layers. You can use it to draw a character, paint a background, or explore the visual style of a game.',
    exercise: 'Draw one simple character on a transparent background and export it as a PNG.',
    url: 'https://krita.org/en/features/'
  },
  {
    id: 'audacity',
    name: 'Audacity',
    category: 'audio',
    description: 'An audio editor and recorder. It can help you record a sound, trim a clip, and adjust audio before adding it to your game.',
    exercise: 'Record a short sound of your own and trim the silence from the beginning.',
    url: 'https://www.audacityteam.org/'
  }
];

const toolList = document.querySelector('#tool-list');
const category = document.querySelector('#category');
const favoritesOnly = document.querySelector('#favorites-only');
const storageMessage = document.querySelector('#storage-message');
let favorites = [];

try {
  const saved = JSON.parse(localStorage.getItem('indieFavorites'));
  if (Array.isArray(saved)) {
    favorites = saved.filter((id) => tools.some((tool) => tool.id === id));
  }
} catch {
  storageMessage.textContent = 'Saved favorites are unavailable. You can still use the filters.';
}

function displayTools() {
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = category.value === 'all' || tool.category === category.value;
    const matchesFavorite = !favoritesOnly.checked || favorites.includes(tool.id);
    return matchesCategory && matchesFavorite;
  });

  toolList.innerHTML = '';
  filteredTools.forEach((tool) => {
    const isFavorite = favorites.includes(tool.id);
    toolList.innerHTML += `<article class="card card-body">
      <p class="tool-tag">${tool.category.toUpperCase()}</p>
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <p><strong>First exercise:</strong> ${tool.exercise}</p>
      <p><a href="${tool.url}">Visit ${tool.name}</a></p>
      <button type="button" class="secondary" data-id="${tool.id}" aria-pressed="${isFavorite}" aria-label="${isFavorite ? 'Remove' : 'Save'} ${tool.name} ${isFavorite ? 'from' : 'to'} favorites">${isFavorite ? 'Remove favorite' : 'Save favorite'}</button>
    </article>`;
  });

  document.querySelector('#tool-count').textContent = `${filteredTools.length} tools shown. ${favorites.length} favorites saved.`;
  if (filteredTools.length === 0) {
    toolList.innerHTML = `<p>No tools match these filters. Choose another category or turn off the favorites filter.</p>`;
  }
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favorite) => favorite !== id);
  } else {
    favorites.push(id);
  }
  try {
    localStorage.setItem('indieFavorites', JSON.stringify(favorites));
  } catch {
    storageMessage.textContent = 'Changes work for this visit, but your browser could not save them.';
  }
  displayTools();
  const updatedButton = toolList.querySelector(`[data-id="${id}"]`);
  if (updatedButton) {
    updatedButton.focus();
  } else {
    favoritesOnly.focus();
  }
}

category.addEventListener('change', displayTools);
favoritesOnly.addEventListener('change', displayTools);
toolList.addEventListener('click', (event) => {
  if (event.target.matches('button[data-id]')) {
    toggleFavorite(event.target.dataset.id);
  }
});
displayTools();
