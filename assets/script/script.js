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

// ALGORITHM:

// 1) onclick button starts the assessment. 

startEl.addEventListener("click", function(){
  
  homeEl.style.display = "none";
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



// 4) if correct, render "correct!" in document and present user with the next question.



// 5) if incorrect, render "incorrect!" in document and time subracted from countdown clock. present user with next question.



// 6) if all questions answered or time runs out, game ends.



// 7) present user w/input allowing them to save their initials.



// 8) save user initials and score using local storage.



// 9) display/render user initials and scores from previously saved quiz attempts.