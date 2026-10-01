const params = new URLSearchParams(window.location.search);
const submitted = params.has('product') && params.has('rating') && params.has('installed');
let reviewCount = 0;

if (submitted) {
  document.querySelector('#confirmation-title').textContent = 'Thank you!';
  document.querySelector('#confirmation-message').textContent = 'Your product review has been completed.';
}

try {
  reviewCount = Number(localStorage.getItem('reviewCount')) || 0;
  if (submitted) {
    reviewCount++;
    localStorage.setItem('reviewCount', reviewCount);
  }
} catch {
  document.querySelector('#storage-message').textContent = 'Your browser could not save the review counter.';
}

document.querySelector('#review-count').textContent = reviewCount;
