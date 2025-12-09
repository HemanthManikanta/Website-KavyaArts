async function loadGallery() {
  try {
    const res = await fetch('data/images.json');
    const data = await res.json();
    renderGallery(data.images || []);
  } catch (e) {
    console.error('Failed to load gallery manifest:', e);
    document.getElementById('gallery').innerHTML = '<p>Could not load gallery. Ensure data/images.json exists.</p>';
  }
}

function renderGallery(items) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = item.file;
    img.alt = item.title || 'Artwork by Kavya Sri';
    img.loading = 'lazy';
    img.addEventListener('click', () => openLightbox(item.file, item.title, item.description));

    const meta = document.createElement('div');
    meta.className = 'meta';
    const h3 = document.createElement('h3');
    h3.textContent = item.title || inferTitle(item.file);
    const p = document.createElement('p');
    p.textContent = item.description || 'Fine art by Kavya Sri.';

    meta.appendChild(h3);
    meta.appendChild(p);
    card.appendChild(img);
    card.appendChild(meta);
    gallery.appendChild(card);
  });
}

function inferTitle(path) { try { const base = path.split('/').pop().split('.')[0]; return base.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()); } catch { return 'Artwork'; } }

function openWhatsApp() {
  const url = 'https://wa.me/9381850041?text=' + encodeURIComponent("Hi Kavya, I'm interested in your art!");
  window.open(url, '_blank');
}

function openLightbox(src, title, description) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('img').src = src;
  lb.querySelector('.caption').innerHTML = `<strong>${title || 'Artwork'}</strong><br>${description || ''}`;
  lb.classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }

window.addEventListener('DOMContentLoaded', loadGallery);
