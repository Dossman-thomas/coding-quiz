// USER STORY

/* AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers */

// GLOBAL VARIABLES
let timeInterval;
let score; 
// home page variables
let homeEl = document.getElementById("home"); 
let startEl = document.getElementById("start"); 

// quiz page variables
let quizEl = document.getElementById("quiz");

let scoresEl = document.getElementById("scores"); 
let timerEl = document.getElementById("timer"); 
let questionEl = document.getElementById("questions");
let acCheckEl = document.getElementById("answer-check");

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
  scoresEl.textContent = "View High Scores"

  setTime();
  showQuestions();
  
});

submitEl.addEventListener("click", function(){

  endEl.remove();
  scoreSectionEl.style.display = "block";

  setScore();
  getScores();
})

retryEl.addEventListener("click", function(){
  location.reload();
})

clearEl.addEventListener("click", function(){
  localStorage.setItem("scoreHistory", "[]");
  location.reload();
})

function setScore(){
  let initials = inputEl.value;
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

  scoreHistory.push(newScore);

  localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

  console.log(scoreHistory);

}

function getScores(){

let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));

// via chatGPT

// Sort the leaderboard array by score in descending order
scoreHistory.sort(function(a, b) {
  return b.score - a.score;
});

// Create an HTML table to display the leaderboard
var table = document.createElement('table');
var tableHeader = table.createTHead();
var headerRow = tableHeader.insertRow(0);
headerRow.insertCell(0).innerHTML = '<b>Name</b>';
headerRow.insertCell(1).innerHTML = '<b>Score</b>';

for (var i = 0; i < scoreHistory.length; i++) {
  var row = table.insertRow(i + 1);
  row.insertCell(0).innerHTML = scoreHistory[i].name;
  row.insertCell(1).innerHTML = scoreHistory[i].score;
}

leaderboardEl.appendChild(table);

}
 
// 2) a timer begins counting down. 

let secondsLeft = 75;

function setTime(){
  timeInterval = setInterval(function(){
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0){
      //stops execution of action at set interval
      clearInterval(timeInterval);
      quizEl.remove();
      endEl.style.display = "block";
      score = 0;
    }

  }, 1000);
}


// 3) user presented with a multiple choice question. 

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

let questionI = 0;

function showQuestions(){ // inspired by group work w/peers

  // if all questions answered or time runs out, game ends and end page is displayed.
  if (questionI >= questionArray.length){

    quizEl.remove();
    endEl.style.display = "block";
    clearInterval(timeInterval);
    timerEl.remove();
    score = secondsLeft;
    finalScoreEl.textContent = `Your final score is ${score}.`

  } else {
    
    for (let i = 0; i < questionArray[questionI].options.length; i++){
      
      let optionsEl = document.getElementById(`${i}`);

      questionEl.textContent = questionArray[questionI].question;
      optionsEl.textContent = questionArray[questionI].options[i];

      optionsEl.onclick = function() {
        let correctAnswer = questionArray[questionI].correctAnswer;

        // if correct, render "correct!" in document and present user with the next question.
        if ( i === correctAnswer ){
          acCheckEl.textContent = "Correct!"
        }

        // if incorrect, render "incorrect!" in document and time subracted from countdown clock. present user with next question.
        else {
          acCheckEl.innerText = "Incorrect."
          secondsLeft -= 10;
        }
        questionI++;
        showQuestions();
      }  
    }
  }
}


// save user initials and score using local storage.




// display/render user initials and scores from previously saved quiz attempts.