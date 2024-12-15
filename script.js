let score = 0;
document.getElementById("high-score").innerText = localStorage.getItem("hs");
// Creating questionss and answers
//*****************************************************************************
// Unlocks for questions and answers
let question1 = {
  question: "1. What type of wave is a sound wave?",
  answers: ["Transverse wave", "Longitudinal wave", " Surface wave", "Electromagnetic wave"],
  correct: 1
};

let question2 = {
  question: "2. Which of the following properties of sound waves determines how loud a sound is?",
  answers: ["Frequency", "Wavelength", "Amplitude", "Time period"],
  correct: 2
};

let question3 = {
  question: "3. The time taken to complete one full cycle of a wave is known as: ",
  answers: ["Frequency", "Amplitude", "Wavelength", "Time period"],
  correct: 3
};

let question4 = {
  question: "4. If the frequency of a sound wave is 440 Hz, what is its time period?",
  answers: ["0.00227 seconds", "0.00455 seconds", "0.01 seconds", "0.5 seconds"],
  correct: 0
};

let question5 = {
  question: "5. What is the relationship between frequency (f) and time period (T)?",
  answers: ["f = T", "f = 1/T", "f = T^2", "f = 2T"],
  correct: 1
};

let question6 = {
  question: "6. Sound cannot travel through: ",
  answers: ["Air", "Water", "Solid", "Vacuum"],
  correct: 3
};

let question7 = {
  question: "7. Which of the following instruments is classified as a wind instrument?",
  answers: ["Violin", "Flute", "Drum", "Guitar"],
  correct: 1
};

let question8 = {
  question: "8. In a sound wave, a region where particles are close together is called: ",
  answers: ["Rarefaction", "Compression", "Amplitude", "Wavelength"],
  correct: 1
};

let question9 = {
  question: "9. The distance between two consecutive compressions in a sound wave is known as: ",
  answers: ["Amplitude", "Frequency", "Wavelength", "Time period"],
  correct: 2
};

let question10 = {
  question: "10. Which of the following factors does NOT affect the speed of sound in a medium?",
  answers: ["Temperature", "Density of the medium", "Frequency of the sound wave", "Elasticity of the medium"],
  correct: 2
};

// create an array of objects
const questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

// Initialize variables
//------------------------------------------------------------------
let correctAns = 0;
let quizPage = 1;

let currentIndex = 0;
let currentQuestion = questions[currentIndex];

let prevousQuestion;
let previousIndex = 0;

const ulTag = document.getElementsByTagName('ul')[0];
const button = document.getElementById('submit');
const questionTitle = document.getElementById('question');
const result = document.getElementById("result");
const classHighlight = 'selected';


// Display Answers and hightlight selected item
//------------------------------------------------------------------
function showQuestions() {
  document.getElementById('totalQuiz').innerHTML = questions.length;

  if (currentIndex > 0 && currentIndex < questions.length) {
    // create again submit button only for next pages
    ulTag.innerHTML = '';
    button.innerHTML = 'Submit';
    button.className = 'submit';
    button.id = 'submit';

    document.getElementById('quizNumber').innerHTML = quizPage;
    //console.log(currentIndex);
  }

  //Display Results in the final page
  if (currentIndex == questions.length) {
    ulTag.innerHTML = '';
    document.getElementById('question').innerHTML = '';

    showResults();

    return;
  }

  questionTitle.innerHTML = currentQuestion.question;
  //console.log(currentQuestion.question);

  // create a for loop to generate the answers and display them in the page
  for (let i = 0; i < currentQuestion.answers.length; i++) {
    // creating answers
    const newAns = document.createElement('li');
    newAns.id = 'ans' + (i + 1);
    newAns.className = "notSelected";
    const textAns = document.createTextNode(currentQuestion.answers[i]);
    newAns.appendChild(textAns);
    const addNewAnsHere = document.getElementById('answer');
    addNewAnsHere.appendChild(newAns);

    //console.log(currentQuestion.answers[i]);
    newAns.addEventListener("click", function(e) {
      e.preventDefault();

      document.querySelectorAll(".notSelected").forEach(function(liTag) {
        liTag.classList.remove(classHighlight);
      });

      newAns.classList.add(classHighlight);
    });
  }

  //check answer once it has been submitted
  button.onclick = function() {
    checkAnswer();
  };
}




// Show Correct Answer
//------------------------------------------------------------------
function checkAnswer() {
  // get selected list
  const selectedItem = document.querySelector(".selected");

  // check that an answer has been selected
  if (selectedItem === undefined) {
    alert("Please selected an answer!");
    return;
  } else {
    // get user answer if form of text
    var userAns = selectedItem.innerHTML;
  }

  // change the background of the answer according to the Results
  if (userAns == currentQuestion.answers[currentQuestion.correct]) {
    // change color of selected item by changing className
    selectedItem.className = 'correct';
    // count the number of correct answers
    correctAns++;
    score = score + 10;
  } else {
    //change the background of the wrong answer
    selectedItem.className = 'wrong';
    //hightlight the right answer if the user got it wrong
    //change the class name of the correct answer
    ulTag.getElementsByTagName('li')[currentQuestion.correct].className = 'correct';
    score = score - 5;
  }

  // Create a next Question button once the answer has been submitted
  button.innerHTML = 'Next Question';
  button.className = 'next';
  button.id = 'next';
  points.innerHTML = score;

  prevousQuestion = currentQuestion;
  quizPage++;
  currentIndex++;
  currentQuestion = questions[currentIndex];

  // Start with the next question once the "Next" button has been clicked
  button.onclick = function() {
    showQuestions()
  };
  return;
}

// Highest score
//------------------------------------------------------------------
const high_score = ()=>{
    if (!localStorage.getItem('hs')) {
      localStorage.setItem('hs',0);
    } 
    else if(localStorage.getItem('hs') < score) {
        localStorage.setItem('hs',score);
    }
    document.getElementById("high-score").innerText = localStorage.getItem("hs");
};

// Final score
//------------------------------------------------------------------
function showResults() {
  if (score == 100) {
    message = "Congratulations 🎉";
    promotion = '<button onclick="promote();">Try PRO Level</button> <button onclick="try_again()">Try Again</button>';
  } else {
    message = "Try Again";
    promotion = '<button onclick="try_again()">Try Again</button> <button onclick="promote();">Yet Try PRO Level</button>';
  }
  
  result.innerHTML = `<h2>${message}</h2> You scored ${correctAns} out of ${currentIndex} correctly <br /> You scored ${score} points <br /><br /> ${promotion}`;

  button.style.display = "none";
  
  high_score();
    }

function try_again() {
    location.reload();
}
 function promote() {
    location.replace("https://kode-cat.github.io/phy/quiz-pro.html");
 }
