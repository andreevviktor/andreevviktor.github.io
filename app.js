// Get the modal
var modal = document.getElementById("myModal");

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