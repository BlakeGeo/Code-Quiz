var btnStart = document.getElementById("btn-start");
var timeCounter = document.getElementById("timecounter");
var quizQuestions = document.getElementById("quiz-questions");
var info = document.getElementById("info");
var timer = document.getElementById("timer");
var answers = document.getElementById("answers");
var rightwrong = document.getElementById("alert");
var quizTitle = document.getElementById("quiz-title");
var count = 75;
var nextQuestions
var currentIndex = 0
var score = 0
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnscore");
var addScore = document.getElementById("addscore");
var allScores = [];
var highScores = document.getElementById("highscoreslist")
var highScoresArea = document.getElementById("highscorearea")
var backBtn = document.getElementById("backbtn")
var clearBtn = document.getElementById("clearbtn")
var storedScores = JSON.parse(localStorage.getItem("userData"));

var questions = [
    {
        title: "Items in a(n) ___ list are preceded by numbers",
        choices: ["ordered", "unordered", "grocery", "bullet"],
        answer: "ordered"
    },
    {
        title: "How do you add a comment to a CSS file?",
        choices: ["/* This */", "// This //", "// This", "<! This !>"],
        answer: "/* This */"
    },
    {
        title: "A # specifies that the selector is?",
        choices: ["class", "tag", "first", "id"],
        answer: "id"
    },
    {
        title: "Commonly used data types do not include ___",
        choices: ["numbers", "strings", "alerts", "booleans"],
        answer: "alerts"
    },
    {
        title: "Arrays in JavaScript can be used to store ___",
        choices: ["other arrays", "numbers and strings", "booleans", "all of the above"],
        answer: "all of the above"
    },
]

// Start the quiz
btnStart.addEventListener("click", startQuiz);
function startQuiz () {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    timeCounter.classList.remove("d-none");
    quizQuestions.classList.remove("d-none");
    info.classList.add("d-none");
    btnStart.classList.add("d-none");
    nextQuestions = questions[currentIndex]


    displayQuestion(nextQuestions)

    gameTimer()
}

// Start the timer
function gameTimer() {    
    var timeInterval = setInterval(function(){
        timer.innerText = count
        count--;
        if (count === 0) {
            clearInterval(timeInterval);
            endgame();
        }
    }, 1000);
}

// Display the first question
function displayQuestion(questions) {
    quizTitle.innerText = questions.title
    questions.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-dark btn-block"
        button.innerText = element
        answers.append(button)
        button.addEventListener("click", displayNextQuestion)        
    });
}
// Display next question
function displayNextQuestion(e) {
    currentIndex++
    if (currentIndex < questions.length) {
        output(e.target.innerText === nextQuestions.answer)
        answers.innerText = ""
        if (currentIndex < questions.length) {
            nextQuestions = questions[currentIndex]
            displayQuestion(nextQuestions)
        } else {
        currentIndex = 0
        displayQuestion(nextQuestions)
        }
    } else {
        endgame()
    }
}

// Output correct or wrong to user
function output(response) {
    if (response) {
        rightwrong.innerText = "Correct!"
    } else {
        rightwrong.innerText = "Wrong!"
        count = count - 15
        timer.innerText = count
    }

}

// Endgame
function endgame() {
    myScore.innaText = count
    addScore.classList.remove("d-none")
    timeCounter.classList.add("d-none")
    quizQuestions.classList.add("d-none")
}


btnScore.addEventListener("click", function() {
    let name = document.getElementById("inputscore").value
    scores(name, count)
    addScore.classList.add("d-none");
    highScoresArea.classList.remove("d-none");
});

// Store scores in local
function scores(a, b) {
    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
}

// Display scores
function displayScores() {
    if (storedScores !== null) {
        var scoreList = document.createElement("ol");
        scoreList.className = "scorelistclass";
        for (var i = 0; i < storedScores.length; i++) {
            var initials = storedScores[i].inits;
            var scores = storedScores[i].userScore
            var scoreEntry = document.createElement("li");
            scoreEntry.innerText = initials + " - " + scores;
            scoreList.appendChild(scoreEntry);
        }
        highScores.appendChild(scoreList);
    }
}

displayScores();

backBtn.addEventListener("click", function() {
    location.reload()
});

clearBtn.addEventListener("click", function() {
    highScores.innerText = "";
    window.localStorage.clear();
});