// $("#level-title").text("ready");
// alert("chalo shuru krte hai!");
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started = false;

// var randomChosenColour;
$(document).keypress(function(){
    if(!started )
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game khtm, Press any key to restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }

}
function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);
    playSound(randomChosenColour);

    // var randomNumber = Math.random();
    // randomNumber = randomNumber*4;
    // randomNumber=Math.floor(randomNumber);
    // alert(randomNumber);
    // console.log(buttonList[randomNumber]);
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },300);
}

function playSound(name)
{
    var audio = new Audio("/simonGameUsingJQuery/sounds/" + name + ".mp3");
    audio.play();
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}


// $(document).ready(nextSequence());

// $(document).keypress(function(event){
//     $("h1").text(event.key);
// });
// function startover()
// {
//     level = 1;
// }
