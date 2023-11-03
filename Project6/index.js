const questions = [
  {
    question:
      "What does the typeof operator return when used with an array in JavaScript?",
    answers: [
      { text: "array", correct: false },
      { text: "object", correct: true },
      { text: "function", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question:
      "In JavaScript, which of the following statements is used to create a loop that continues execution until a specified condition is no longer met?",
    answers: [
      { text: "for", correct: false },
      { text: "while", correct: true },
      { text: "do while", correct: false },
      {
        text: "if",
        correct: false,
      },
    ],
  },
  {
    question: "What is the purpose of the NaN value in JavaScript?",
    answers: [
      { text: 'It represents the "Not a Number" data type.', correct: true },
      {
        text: "It is used for defining non-numeric constants.",
        correct: false,
      },
      {
        text: "It indicates that a variable has not been initialized.",
        correct: false,
      },
      { text: " It signifies an error in the code.", correct: false },
    ],
  },
  {
    question:
      "Which of the following methods is used to add an element to the end of an array in JavaScript?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else selectedBtn.classList.add("incorrect");

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}! 🥳`;

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
