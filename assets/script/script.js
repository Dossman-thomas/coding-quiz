// USER STORY

/* AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers */

// GLOBAL VARIABLES

// home page variables
let homeEl = document.getElementById("home"); 
let startEl = document.getElementById("start"); 

// quiz page variables
let quizEl = document.getElementById("quiz");
let scoresEl = document.getElementById("scores"); 
let timerEl = document.getElementById("timer"); 
let questionEl = document.getElementById("questions");
let choicesEl = document.getElementsByClassName("choices");

// ALGORITHM:

// 1) onclick button starts the assessment. 

startEl.addEventListener("click", function(){
  
  homeEl.style.display = "none";
  quizEl.style.display = "block";
  scoresEl.textContent = "View High Scores"
  setTime();

});


// 2) a timer begins counting down. 

let secondsLeft = 75;

function setTime(){
  let timeInterval = setInterval(function(){
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0){
      //stops execution of action at set interval
      clearInterval(timeInterval);
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
    options: ["A) for (let i = 0; i > array.length; i++)","B) for (i = 15)","C) for (let i = 0, i > array.length, i++) ","D) for i (let i = 5)"],
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

console.log(questionArray[0].options[1]);

function showQuestions(){


}

// 4) if correct, render "correct!" in document and present user with the next question.

for (let i = 0; i < questionArray.length; i++){
// console.log(questionArray[i].question);

}

// 5) if incorrect, render "incorrect!" in document and time subracted from countdown clock. present user with next question.



// 6) if all questions answered or time runs out, game ends.



// 7) present user w/input allowing them to save their initials.



// 8) save user initials and score using local storage.



// 9) display/render user initials and scores from previously saved quiz attempts.