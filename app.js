// Get the modal
var modal = document.getElementById("myModal");



var hw1 = [
  "/images/ekranoplan/HW-1/hw11.jpg",
  "/images/ekranoplan/HW-1/hw12.jpg",
  "/images/ekranoplan/HW-1/hw13.jpg",
  "/images/ekranoplan/HW-1/hw14.jpg",
]

var hw2 = [
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
]

var hw3 = [
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
]

var hwAll = hw1.concat(hw2).concat(hw3);

function createImageGallery(paths, entry) {
  var entryDiv = document.querySelector(entry);
  var row = document.createElement('div');
  row.className = 'row';
  entryDiv.appendChild(row);
  paths.forEach((path) => {
    var col = document.createElement('div');
    col.className = 'col-3';
    row.appendChild(col);
    var article = document.createElement('div');
    article.className = 'article text-center mb-4';
    col.appendChild(article);
    let img = document.createElement('img');
    img.className = 'image';
    img.src = path;
    article.appendChild(img);
  })
}

if (null !== document.querySelector('.hw1')) {
  createImageGallery(hw1, '.hw1');
}

if (null !== document.querySelector('.hw2')) {
  createImageGallery(hw2, '.hw2');
}

if (null !== document.querySelector('.hw3')) {
  createImageGallery(hw3, '.hw3');
}

// Get the button that opens the modal
document.querySelectorAll('.image').forEach(item => {
  // When the user clicks on the button, open the modal
  item.addEventListener('click', event => {
    modal.style.display = "block";
    var src = item.src;
    modal.querySelector('.modal-image').src = src;  
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.querySelector('.right').addEventListener('click', (e) => {
  let modalImage = document.querySelector('.modal-image');
  let imagePath = modalImage.getAttribute("src").substring(modalImage.getAttribute("src").indexOf('/images/')+1)
  let pos = hwAll.indexOf('/'+imagePath);
  let nextPos = (pos+1)%hwAll.length;
  modalImage.src = hwAll[nextPos];
})

document.querySelector('.left').addEventListener('click', (e) => {
  let modalImage = document.querySelector('.modal-image');
  let imagePath = modalImage.getAttribute("src").substring(modalImage.getAttribute("src").indexOf('/images/')+1)
  let pos = hwAll.indexOf('/'+imagePath);
  let nextPos = pos-1  === -1 ? hwAll.length-1 : pos-1;
  modalImage.src = hwAll[nextPos];
})