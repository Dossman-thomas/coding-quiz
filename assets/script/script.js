// USER STORY

/* AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers */

// GLOBAL VARIABLES
let timeInterval;
let score; 
let scoresEl = document.getElementById("scores");
let timerEl = document.getElementById("timer"); 

// home page variables
let homeEl = document.getElementById("home"); 
let startEl = document.getElementById("start"); 

// quiz page variables
let quizEl = document.getElementById("quiz");
let questionEl = document.getElementById("questions");
let acCheckEl = document.getElementById("answer-check");
let questionI = 0;

// end page variables 
let endEl = document.getElementById("finish");
let submitEl = document.getElementById("submit");
let inputEl = document.getElementById("input");
let finalScoreEl = document.getElementById("finalscore");

// scoreboard page variables 

let scoreSectionEl = document.getElementById("score");
let leaderboardEl = document.getElementById("leaderboard");
let retryEl = document.getElementById("retry");
let clearEl = document.getElementById("clear");

// ALGORITHM:

// 1) onclick button starts the assessment. 

startEl.addEventListener("click", function(){
  
  homeEl.remove();
  quizEl.style.display = "block";
  // scoresEl.textContent = ""

  setTime();
  showQuestions();
  
});

// automatically displays highscores
scoresEl.addEventListener("click", function(){
 homeEl.remove();
 quizEl.remove();
 endEl.remove();
 timerEl.remove();
 scoresEl.remove();
 scoreSectionEl.style.display = "block"; 

 getScores();
})

// submits user initials and score
submitEl.addEventListener("click", function(){

  scoresEl.remove();
  endEl.remove();
  scoreSectionEl.style.display = "block";

  setScore();
  getScores();
})

// retries the quiz
retryEl.addEventListener("click", function(){
  location.reload();
})

// clears the leaderboard
clearEl.addEventListener("click", function(){
  localStorage.setItem("scoreHistory", "[]");
  location.reload();
})

// saves user score
function setScore(){
  let initials = inputEl.value.toUpperCase();

  // console.log(initials);

  // if user fails to enter initials, value is saved as "anonymous"
  if(initials === ''){
    initials = "Anonymous";
  }

  let scoreHistory = [];
  let newScore = {
    name: initials,
    score: score
  }

  let lastStorage = localStorage.getItem("scoreHistory");

  // if savedStorage exists, getItem from local storage and pass it into scoreHistory array.
  if (lastStorage !== null){
    scoreHistory = JSON.parse(lastStorage);
  }
  // adds new score to score history
  scoreHistory.push(newScore);

  localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

  // console.log(scoreHistory);

}

// retrieves scores from local storage
function getScores(){

let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));

// via chatGPT

// Sort the leaderboard array by score in descending order
scoreHistory.sort(function(a, b) {
  return b.score - a.score;
});

// Create an HTML table to display the leaderboard
var table = document.createElement('table');
table.id = 'table';
var tableHeader = table.createTHead();
var headerRow = tableHeader.insertRow(0);
headerRow.insertCell(0).innerHTML = '<b>Name</b>';
headerRow.insertCell(1).innerHTML = '<b>Score</b>';

// inserts values into HTML table retrieved from scoreHistory array
for (var i = 0; i < scoreHistory.length; i++) {
  var row = table.insertRow(i + 1);
  row.insertCell(0).innerHTML = scoreHistory[i].name;
  row.insertCell(1).innerHTML = scoreHistory[i].score;
}

// renders table
leaderboardEl.appendChild(table);

}
 
// a timer begins counting down. 

let secondsLeft = 75;

function setTime(){
  timeInterval = setInterval(function(){
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft <= 0){
      //stops execution of action at set interval
      clearInterval(timeInterval);
      quizEl.remove();
      endEl.style.display = "block";
      timerEl.remove();
      score = 0;
    }

  }, 1000);
}


// user presented with a multiple choice question. 

let questionArray = [

  {
    question: "Which of the following is the correct way to write an IF statement in Javascript?",
    options: ["A) if x = 10","B) if x == 5","C) if (x == 10)","D) if (x is 5)"],
    correctAnswer: 2 
  },

  {
    question: "How do you start writing a FOR loop?",
    options: ["A) for (let i = 0; i > array.length; i++)","B) for (i = 1)","C) for (let i = 0, i > array.length, i++) ","D) for i (let i = 5)"],
    correctAnswer: 0 
  },

  {
    question: "Arrays in JavaScript can be used to store ____.",
    options: ["A) numbers and strings","B) other arrays","C) booleans","D) all of the above"],
    correctAnswer: 3 
  },

  {
    question: "Which HTML element do we use to link a Javascript file?",
    options: ["A) <js>","B) <script>","C) <java>","D) <scripting>"],
    correctAnswer: 1 
  },

  {
    question: "How is the function, myFunction, called/utilized in Javascript?",
    options: ["A) call.function","B) insert.myFunction();","C) myFunction();","D) myFunction;"],
    correctAnswer: 2 
  },

];


// renders questions and multiple choice options on the page one by one
function showQuestions(){ // inspired by group work w/peers

  // if all questions answered or time runs out, game ends and end page is displayed.
  if (questionI >= questionArray.length){

    quizEl.remove();
    endEl.style.display = "block";
    clearInterval(timeInterval);
    timerEl.remove();
    score = secondsLeft;

    // if an incorrect answer as time runs out results in a negative time, score is set to 0
    if(score < 0){
      score = 0;
    }
  
    finalScoreEl.textContent = `Your final score is ${score}.`

  } else {
  

  // quiz rendering one question at a time
    for (let i = 0; i < questionArray[questionI].options.length; i++){
      
      let optionsEl = document.getElementById(`${i}`);

      questionEl.textContent = questionArray[questionI].question;
      optionsEl.textContent = questionArray[questionI].options[i];

      optionsEl.onclick = function() {
        let correctAnswer = questionArray[questionI].correctAnswer;

        // if correct, render "correct!" in document and present user with the next question.
        if (i === correctAnswer){
          acCheckEl.textContent = "Correct!";
          acCheckEl.style.borderTop = "2px solid white";
        }

        // if incorrect, render "incorrect." in document and time subracted from countdown clock. present user with next question.
        else {
          acCheckEl.innerText = "Incorrect.";
          acCheckEl.style.borderTop = "2px solid white";
          secondsLeft -= 10;
        }
        questionI++;
        showQuestions();
      }  
    }
  }
}
