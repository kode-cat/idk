let score = 0;
document.getElementById("high-score").innerText = localStorage.getItem("hs");
// Creating questionss and answers
//*****************************************************************************
// Unlocks for questions and answers
let question1 = {
  question: "1. When you hear thunder after seeing lightning, why does this happen?",
  answers: ["Sound travels faster than light", "Light travels faster than sound", "They occur simultaneously", "Thunder is a type of light"],
  correct: 1
};

let question2 = {
  question: "2. Why do you hear your voice differently when recorded compared to when you speak?",
  answers: ["The recording device alters the sound", "You hear your voice through vibrations in your skull", "The environment changes the sound", "Your ears are not functioning properly"],
  correct: 1
};

let question3 = {
  question: `3. Why do we perceive a sound as "louder" when we are closer to the source?`,
  answers: ["Sound waves travel faster at shorter distances", "The amplitude of sound waves increases with distance", "Sound waves spread out and lose energy as they travel", "Our ears become more sensitive at closer distances"],
  correct: 2
};

let question4 = {
  question: `4. Why do you hear a "pop" sound when you open a soda can?`,
  answers: ["The can is under high pressure", "The sound is produced by the liquid", "The can is made of metal", "The carbonation is escaping slowly"],
  correct: 0
};

let question5 = {
  question: "5. Why do some people find it difficult to hear conversations in a crowded room?",
  answers: ["Sound waves are blocked by other people", "The brain cannot process multiple sounds at once", "Sound waves lose energy in a crowd", "High-frequency sounds are absorbed by the crowd"],
  correct: 1
};

let question6 = {
  question: "6. Why does a dog seem to hear sounds that humans cannot?",
  answers: ["Dogs have better hearing abilities", "Dogs can hear higher frequencies than humans", "Dogs are more sensitive to vibrations", "All of the above"],
  correct: 3
};

let question7 = {
  question: "7. Why do we often hear echoes in large, empty spaces like canyons?",
  answers: ["Sound travels faster in open spaces", "Sound waves bounce off hard surfaces", "There are fewer obstacles to absorb sound", "The air is less dense in canyons"],
  correct: 1
};

let question8 = {
  question: "8. Why does music sound different when played through headphones compared to speakers?",
  answers: ["Headphones amplify sound differently", "Speakers produce sound waves that fill a room", "Headphones only transmit certain frequencies", "The position of the listener affects sound perception"],
  correct: 1
};

let question9 = {
  question: `9. Why do we sometimes hear a "ringing" in our ears after a loud concert?`,
  answers: ["The ears are damaged from loud sounds", "The brain is processing sound incorrectly", "The sound waves are still vibrating in the air", "It is a sign of hearing loss"],
  correct: 0
};

let question10 = {
  question: `10. Why do you hear a "thud" when you drop a heavy object on the floor?`,
  answers: ["The object is too heavy for the floor", "The sound is produced by the object hitting the floor", "The floor absorbs the sound", "The air pressure changes when the object falls"],
  correct: 1
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
    score = score + 20;
  } else {
    //change the background of the wrong answer
    selectedItem.className = 'wrong';
    //hightlight the right answer if the user got it wrong
    //change the class name of the correct answer
    ulTag.getElementsByTagName('li')[currentQuestion.correct].className = 'correct';
    score = score - 10;
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
  if (score === 200) {
    message = "Congratulations 🎉";
    promotion = `Keep It up!! <br /> <button onclick="try_again();">Try Again</button>`;
  } else {
    message = "Try Again";
    promotion = `<button onclick="try_again();">Try Again</button>`
  }
  
  result.innerHTML = `<h2>${message}</h2> You scored ${correctAns} out of ${currentIndex} correctly <br /> You scored ${score} points <br /> ${promotion}`;

  button.style.display = "none";
  
  high_score();
}

function try_again() {
    location.reload();
    }
