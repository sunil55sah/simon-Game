// Array of button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store game pattern and user clicked pattern
var gamePattern = [];
var userClickedPattern = [];

// Variable to track game state
var started = false;
var level = 0;

// Event listener for keypress to start the game
$(document).keypress(function() {
  if (!started) {
    // Display level and start the game
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Event listener for button clicks
$(".btn").click(function() {
  // Get the ID of the clicked button
  var userChosenColour = $(this).attr("id");
  // Add the clicked colour to user's pattern
  userClickedPattern.push(userChosenColour);
  // Play sound and animate button press
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // Check user's answer
  checkAnswer(userClickedPattern.length-1);
});

// Function to check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If user's sequence matches game pattern
    if (userClickedPattern.length === gamePattern.length){
      // Move to next level after delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // If user's sequence is wrong
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Flash red screen for game over effect
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Reset game
    startOver();
  }
}

// Function to generate next sequence
function nextSequence() {
  // Clear user's clicked pattern
  userClickedPattern = [];
  // Increase level and update display
  level++;
  $("#level-title").text("Level " + level);
  // Generate random colour and add to game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Flash the button with the chosen colour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play sound for the chosen colour
  playSound(randomChosenColour);
}

// Function to animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
