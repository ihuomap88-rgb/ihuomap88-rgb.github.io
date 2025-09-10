// Load questions from localStorage OR use default ones
let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [
  {
    question: "Simplify: (2x + 3x) - (x - 4).",
    options: ["4x - 4", "5x - 4", "4x + 4", "5x + 4"],
    answer: "4x + 4"
  },
  {
    question: "Which of the following is a chemical change?",
    options: ["Melting of ice", "Rusting of iron", "Evaporation of water", "Boiling of water"],
    answer: "Rusting of iron"
  },
  {
    question: "Which instrument is used to measure current?",
    options: ["Voltmeter", "Barometer", "Ammeter", "Hygrometer"],
    answer: "Ammeter"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, correctAnswer) {
  if (button.textContent === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }
  scoreEl.textContent = `Score: ${score}`;
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Quiz Finished!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
};

loadQuestion();