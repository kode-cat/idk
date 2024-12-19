const questions = [
    "What is the capital of France?",
    "What is 2 + 2?",
    "What is the color of the sky?",
    "Who wrote 'Hamlet'?",
    "What is the boiling point of water in Celsius?"
];

let currentQuestionIndex = 0;

function loadNumbers() {
    const numberContainer = document.getElementById('number-container');
    for (let i = 1; i <= 5; i++) {
        const button = document.createElement('button');
        button.classList.add('number-button');
        button.innerText = i;
        button.onclick = () => showQuestion(i - 1);
        numberContainer.appendChild(button);
    }
}

function showQuestion(index) {
    currentQuestionIndex = index;
    document.getElementById('question').innerText = questions[index];
    document.getElementById('next-question').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    document.getElementById('question').innerText = questions[currentQuestionIndex];
}

document.addEventListener('DOMContentLoaded', () => {
    loadNumbers();
    document.getElementById('next-question').style.display = 'none';
});
