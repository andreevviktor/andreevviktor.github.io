// Bildergalerien der Ekranoplan-Unterseiten.
// Schluessel = CSS-Klasse des Platzhalter-Divs auf der jeweiligen Seite.
var galleries = {
  ".hw1": [
    "/images/ekranoplan/HW-1/hw11.jpg",
    "/images/ekranoplan/HW-1/hw12.jpg",
    "/images/ekranoplan/HW-1/hw13.jpg",
    "/images/ekranoplan/HW-1/hw14.jpg",
  ],
  ".hw2": [
    "/images/ekranoplan/HW-2/ek1.jpeg",
    "/images/ekranoplan/HW-2/ek2.jpeg",
    "/images/ekranoplan/HW-2/ek3.jpeg",
    "/images/ekranoplan/HW-2/ek6.jpeg",
    "/images/ekranoplan/HW-2/ek7.jpeg",
    "/images/ekranoplan/HW-2/ek10.jpeg",
    "/images/ekranoplan/HW-2/ek11.jpeg",
    "/images/ekranoplan/HW-2/ek12.jpeg",
    "/images/ekranoplan/HW-2/ek13.jpeg",
    "/images/ekranoplan/HW-2/hw21.jpg",
    "/images/ekranoplan/HW-2/hw22.jpg",
    "/images/ekranoplan/HW-2/hw23.jpg",
    "/images/ekranoplan/HW-2/hw24.jpg",
    "/images/ekranoplan/HW-2/hw25.jpg",
    "/images/ekranoplan/HW-2/hw26.jpg",
  ],
  ".hw3": [
    "/images/ekranoplan/HW-3/hw31.jpg",
    "/images/ekranoplan/HW-3/hw32.jpg",
    "/images/ekranoplan/HW-3/hw33.jpg",
    "/images/ekranoplan/HW-3/hw34.jpg",
    "/images/ekranoplan/HW-3/hw35.jpg",
    "/images/ekranoplan/HW-3/hw36.jpg",
    "/images/ekranoplan/HW-3/hw37.jpg",
    "/images/ekranoplan/HW-3/hw38.jpg",
    "/images/ekranoplan/HW-3/wh39.jpg",
    "/images/ekranoplan/HW-3/hw310.jpg",
  ],
};

function createImageGallery(paths, entry) {
  var entryDiv = document.querySelector(entry);
  var row = document.createElement('div');
  row.className = 'row';
  entryDiv.appendChild(row);
  paths.forEach((path) => {
    var col = document.createElement('div');
    col.className = 'col-6 col-md-3';
    row.appendChild(col);
    var article = document.createElement('div');
    article.className = 'article text-center mb-4';
    col.appendChild(article);
    let img = document.createElement('img');
    img.className = 'image';
    img.loading = 'lazy';
    img.src = path;
    article.appendChild(img);
  })
}

Object.keys(galleries).forEach((entry) => {
  if (null !== document.querySelector(entry)) {
    createImageGallery(galleries[entry], entry);
  }
});

// Lightbox. Blaettert durch alle .image-Elemente der aktuellen Seite.
var modal = document.getElementById("myModal");

if (null !== modal) {
  var modalImage = modal.querySelector('.modal-image');

  // Bildzaehler wird zur Laufzeit eingehaengt, damit keine Seite Markup braucht
  var counter = document.createElement('div');
  counter.className = 'modal-counter';
  modal.appendChild(counter);

  function pageImages() {
    return Array.from(document.querySelectorAll('.image')).map(img => img.src);
  }

  function currentPos(images) {
    return images.indexOf(modalImage.src);
  }

  // Bilder, die als KI-generierte Konzeptvision gekennzeichnet werden.
  // Der Hinweis wird in der Lightbox per Klasse am Modal eingeblendet.
  var aiImages = ['tandem-ekranoplan-render.jpg'];

  function updateAiNote() {
    var isAi = aiImages.some(name => modalImage.src.indexOf(name) !== -1);
    modal.classList.toggle('is-ai', isAi);
  }

  function updateCounter() {
    var images = pageImages();
    var pos = currentPos(images);
    counter.textContent = images.length > 1 && pos !== -1
      ? (pos + 1) + ' / ' + images.length
      : '';
  }

  function showImageAt(offset) {
    var images = pageImages();
    if (images.length === 0) {
      return;
    }
    var pos = currentPos(images);
    var nextPos = (pos + offset + images.length) % images.length;
    modalImage.src = images[nextPos];
    updateCounter();
    updateAiNote();
  }

  function openModal(src) {
    modalImage.src = src;
    modal.style.display = "flex";
    // verhindert, dass die Seite hinter der Lightbox mitscrollt
    document.body.style.overflow = 'hidden';
    updateCounter();
    updateAiNote();
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = '';
  }

  function isOpen() {
    return modal.style.display === "flex";
  }

  document.querySelectorAll('.image').forEach(item => {
    item.addEventListener('click', event => {
      openModal(item.src);
    });
  });

  var close = modal.querySelector('.close');
  if (null !== close) {
    close.addEventListener('click', closeModal);
    close.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeModal();
      }
    });
  }

  // Jeder Klick, der weder Bild noch Bedienelement trifft, schliesst die Lightbox
  modal.addEventListener('click', (e) => {
    if (null === e.target.closest('.modal-image, .close, .left, .right')) {
      closeModal();
    }
  });

  var right = modal.querySelector('.right');
  if (null !== right) {
    right.addEventListener('click', (e) => {
      e.preventDefault();
      showImageAt(1);
    });
  }

  var left = modal.querySelector('.left');
  if (null !== left) {
    left.addEventListener('click', (e) => {
      e.preventDefault();
      showImageAt(-1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) {
      return;
    }
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      showImageAt(1);
    } else if (e.key === 'ArrowLeft') {
      showImageAt(-1);
    }
  });
}

// Jahreszahl im Footer aktuell halten. Ohne JavaScript bleibt der im
// Markup hinterlegte Wert stehen, die Zeile ist also nie leer.
var footerYear = document.getElementById('footer-year');
if (null !== footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
