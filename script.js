var questions= [
{title: "Inside which HTML element do we put the JavaScript?",
choices: ["<script>", "<js>", "<scripting>", "<javascript>"],
correctAnswer: "<script>"
},
{title: "How do you write 'Hello World' in an alert box?",
choices: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
correctAnswer: "alert('Hello World');"
},
{title: "How to write an IF statement in JavaScript?",
choices: ["if i = 5 then", "if (i == 5)", "if i = 5", "if i == 5 then"],
correctAnswer: "if (i == 5)"
},
{title: "Which operator is used to assign a value to a variable?",
choices: ["x", "-", "*", "="],
correctAnswer: "="
},
{title: "What is the correct way to write a JavaScript array?",
choices: ["var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')","var colors = ['red', 'green', 'blue']", "var colors = (1:'red', 2:'green', 3:'blue')"],
correctAnswer: "var colors = ['red', 'green', 'blue']"
}
]

var questionsElement= document.getElementById("question-container");
var answersElement= document.getElementById("answer-buttons");
var startButton= document.getElementById("start-button");
var questionIndex= 0;
var timer= questions.length * 15;
var timerElement= document.getElementById("timer");
var feedBackElement= document.getElementById("feedback");
var initials = document.getElementById("initials");
var time = 60;
var timerId;


function clockTick () {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
        endGame()
    }
}


function startGame() {
    var startScreen = document.getElementById("start-banner");
    startScreen.setAttribute("class", "hide");
    // Timer Code
    timerId = setInterval(clockTick, 1000);
    getQuestion();
    /* location.replace();
    var startElement= document.getElementById("start-banner");
    startElement.setAttribute("class", "hide");
    questionsElement.removeAttribute("class");
    timerElement.textContent=timer;*/


}
startButton.onclick= startGame;


function getQuestion() {
    var questionScreen = document.getElementById("question-container");
    questionScreen.removeAttribute("class");
    var currentQuestion = questions[questionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;


    answersElement.innerHTML = '';

    currentQuestion.choices.forEach(function(choice, i){
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "choice");
        optionButton.setAttribute("value", choice);
        optionButton.textContent = choice;
        answersElement.appendChild(optionButton);
        optionButton.onclick = userSelection;
    })
}

function userSelection() {
    console.log(this.value)
    if(this.value!==questions[questionIndex].correctAnswer) {
        feedBackElement.textContent="Incorrect"
    }
    else {
        feedBackElement.textContent="Correct!"
    }
    questionIndex++
    if(questionIndex===questions.length){
        endGame();
    }
    else {
        getQuestion()
    }

}

function endGame() {
    feedBackElement.textContent = "Game Over"
    clearInterval(timerId);
}

function submitInitials() {
    var initials = initialsEl.value.trim()
    var userScore = {
        score: time,
        initials: initials
    };
    var highscores = [] || JSON.parse(window.localStorage.getItem("highscores"))
    highscores.push(userScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores))

    var endScreen = document.getElementById("end-screen");
    endScreen.setAttribute("class","hide")

    var leaderboardScreen = document.getElementById("leaderboard")
    leaderboardScreen.removeAttribute("class");

    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials
        var listItem = document.getElementById("highscores");
        listItem.appendChild(liTag)
    })
}
//submitButton.onclick = submitInitials;





//this.value does not equal questions at the current index.answer
//if else statment...take away time if got wrong until end of question or they get answer wrong
//remove class on gamer screen and put score
//start button getElement.id startbutton.onclick = startGame()

/* Click start button -> calls a function that will: start a timer & present the first question when you click on an answer.
If answer is right -> show another question & log point(s).
If answer is wrong -> subtract time from timer & show another question & log no points.
If all questions are answered OR timer is 0 -> game is over.
When game is over -> save initials and score.

Functions:
    Timer Function
        Creates and manages the time
    Start Game
        Starts the timer and shows the initial question
    Game Over
        Saves initials and score
    NextQuestion
        Initializes the for loop

Loops:
    Loop over an array that holds the questions and answers and display the questions and answers

If Statements:
    Condition: answer is right -> show another question, log points
    Condition: answer is wrong -> show another question, take 10 sec off timer, log 0 points
    Condition: all questions answered OR timer is 0 -> call the game over */