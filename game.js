var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;


//random sequence na gagayahin
function nextSequence() {
    userPattern=[]; //para once na magstart ulit ng bagong sequence yung game, gagawin mo ulit ung sequence pra sa user
    level++;
    $("h1").text("Level: "+level);
    var rdmNum = Math.floor(Math.random()*4);
    var randomColor = buttonColor[rdmNum];
    gamePattern.push(randomColor);
    playSound(randomColor);
    $("#"+randomColor).fadeOut(50).fadeIn(50);
    // var sound = new Audio("./sounds/"+randomColor+".mp3");
    // sound.play();
};


//click mo kung ano sagot
$(".btn").on("click", function buttonClick(event) {
    var chosenColor = event.target.id;
    userPattern.push(chosenColor);
    playSound(chosenColor);
    clickAnimation(chosenColor);
    checkAnswer(userPattern.length-1);
    // var clickSound = new Audio("./sounds/"+chosenColor+".mp3");
    // clickSound.play();
});


//simplified sound function
function playSound(color) {
    var sound = new Audio("./sounds/"+color+".mp3");
    sound.play();
};


//click animation
function clickAnimation(color) {
    $("#"+color).addClass("pressed");

    setTimeout( function(){
    $("#"+color).removeClass("pressed");
    },100);
}

//detect a keyboard press then call the random shit generator
$("body").on("keydown", function(){
    if (!started) {
        $("h1").text("Level: "+level);
        nextSequence();
        started = true; //eto dapat wala ng var. nasa labas ung var dapat false sya. kasi pag naka var yan magiging true sya tapos pag labas false nanaman kaya mageexecute nnman sya duh. isang var lang para di bumalik ung value
    }
});

function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("Success"); pang check lang to sa console
        if (userPattern.length === gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    }else{
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Ay vuvu. Kung lalaro ka pa press any key.");
        startOver();
        // console.log("wrong"); pang check lang to sa console
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}