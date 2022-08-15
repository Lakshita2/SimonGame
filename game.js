
var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];   //contains the actual pattern 
var userClickedPattern = [];  //contains what the user clicks at every level

var started = false;  //game has not started
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);  //update title
    nextSequence();    //for the next level
    started = true;    // so that it will not execute again
  }
});


//user click -> get the id of the clicked button-> push that into userclickedPattern -> playsound and add animation to user click button-> check answer with the corresponding element in gamePattern (whwether same index in both arrays has same elemeent)
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");      
  userClickedPattern.push(userChosenColour);  

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});


//after checking the recent user answer, if correct ->check whether that answer was the last in sequence(arrays length will have become same).If it is last ->call the nextSequence
                                          //if incorrect ->  game over -> call the startOver() for restarting the game
//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      // console.log("wrong");
      const wrongAudio = new Audio('sounds/wrong.mp3');
      wrongAudio.play();

      $("body").addClass("game-over");

      setTimeout( ()=>{
         $("body").removeClass("game-over");
      }, 200)
      
      $("#level-title").text("Game Over, Press Any Key To Restart");
      
      startOver();
    }

}


// choose random button at start of every level the user will have to match all the elemenets from the beginning of gamePattern array to the elelment choosen by current nextSequence
function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// reset values
function startOver(){
  level =0;
  gamePattern = [];
  started =false;
}
