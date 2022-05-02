var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour;

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).on('keypress', function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // $("#"+randomChosenColour).click(function(){
  //   var audio =new Audio("sounds/"+randomChosenColour+".mp3");
  //   audio.play();
  // });
  playSound(randomChosenColour);
}

function playSound(name) {
  $("#" + name).click(function() {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  });
}

$(".btn").on("click", function(event) {

  var userchoseColor = $(this).attr("id");
  animatePress(userchoseColor);
  userClickedPattern.push(userchoseColor);
  playSound(userchoseColor);
  checkAnswer(userClickedPattern.length - 1);

})


function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// check answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
