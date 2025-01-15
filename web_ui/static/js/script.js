// ----------------------------DARK MODE BUTTON-------------------------------

// Select the button
const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Get the user's theme preference from local storage, if it's available
const currentTheme = localStorage.getItem("theme");
// If the user's preference in localStorage is dark...
if (currentTheme == "dark") {
  // ...let's toggle the .dark-theme class on the body
  if (!document.body.classList.contains("dark-theme")) {
    document.body.classList.add("dark-theme");
  }
// Otherwise, if the user's preference in localStorage is light...
} else if (currentTheme == "light") {
  // ...let's toggle the .light-theme class on the body
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
  }
} else {
    // If the user's preference is not in localStorage, default to light mode
    // Fallback to OS preference
    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}

// Listen for a click on the button 
btn.addEventListener("click", function () {
  // Toggle between light and dark mode
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    currentTheme = "light";
  } else {
    document.body.classList.add("dark-theme");
    currentTheme = "dark";
  }

  // Save the current theme to local storage
  localStorage.setItem("theme", currentTheme);
});


// ----------------------------WORKSPACE CARDS-------------------------------

// Get the modal
var modal = document.getElementById("workspace_creator_model");

// Get the button that opens the modal
var modalBtn = document.getElementById("modelBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modelBtn.onclick = function() {
  modal.style.display = "block";
}

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

// ----------------------------WORKSPACE OPTIONS-------------------------------

var workspaceCardButtons = document.querySelectorAll(".option_button");
var workspaceDropdowns = document.querySelectorAll(".workspace_options_content");


document.querySelectorAll('.option_button, .workspace_options_button').forEach(button => {
  button.addEventListener('click', (event) => {
      event.preventDefault();  // Prevents default action (navigation)
      event.stopPropagation(); // Stops event from bubbling to the <a> element
  });
});

workspaceCardButtons.forEach((button, index) => {
  button.onclick = function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up
   
    workspaceDropdowns.forEach(dropdown => dropdown.classList.remove("show"));

    workspaceDropdowns[index].classList.toggle("show");

  }
});

window.onclick = function(event) {
  if (![...workspaceCardButtons].includes(event.target)) {
    workspaceDropdowns.forEach(dropdown => dropdown.classList.remove("show"));
  }
}


const deleteCardButtons = document.querySelectorAll(".delete_card_button");

deleteCardButtons.forEach((button, index) => {
  button.onclick = function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up

    var workspaceCards = document.querySelectorAll(".workspace_card");

    cardId = workspaceCards[index].id;

    $.ajax({
      url: `/deleteWorkspace`,

      type: 'POST',
      data: {
        workspace_id: cardId
      },
      success: function (response) {
          console.log(response);
          location.reload(true);

      },
      error: function (error) {
          console.log(error);
      }
    });
  };
});

$(document).ready(function(){
  $("button#deleteBtn").click(function(){
    $.ajax({
      url: `/deleteAllWorkspaces`,

      type: 'POST',
      success: function (response) {
          console.log(response);
          location.reload(true);

      },
      error: function (error) {
          console.log(error);
      }
  });
  });
});


var promptBar = document.getElementById("promptBar");
console.log("promptBar element:", promptBar);
promptBar.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("promptSubmitButton").click();
    console.log("Enter key pressed");
  }
});