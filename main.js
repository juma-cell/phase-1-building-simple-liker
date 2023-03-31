// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Your JavaScript code goes here!

// Get all heart nodes in the DOM
const heartNodes = document.querySelectorAll(".like-glyph");

// Function to handle heart click events
const onHeartClick = function(event) {
  // Invoke mimicServerCall when user clicks on heart
  mimicServerCall()
    // If failure: display error modal
    .catch((message) => {
      // Remove "hidden" class from error modal
      const errorModal = document.getElementById("modal");
      errorModal.classList.remove("hidden");

      // Display error message in modal
      const errorMessage = errorModal.querySelector("#modal-message");
      errorMessage.innerHTML = message;

      // Hide modal after 3 seconds
      setTimeout(() => {
        errorModal.classList.add("hidden");
      }, 3000);
    })
    // If success: change heart button to full heart
    .then(() => {
      if (event.target.innerHTML === EMPTY_HEART) {
        event.target.innerHTML = FULL_HEART;
        event.target.classList.add("activated-heart");
      } else {
        event.target.innerHTML = EMPTY_HEART;
        event.target.classList.remove("activated-heart");
      }
    });
};

// Add click event listener to all heart nodes
heartNodes.forEach((heartNode) => {
  heartNode.addEventListener("click", onHeartClick);
});
