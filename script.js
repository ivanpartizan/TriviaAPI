const intro = document.querySelector(".intro");
const game = document.querySelector(".game");
const scoreCard = document.querySelector(".scoreCard");

const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".answers-text"));
const scoreText = document.querySelector("#score");
const progressText = document.querySelector(".text");
const fullProgressBar = document.querySelector(".fullProgressBar");

const correctAnswersText = document.querySelector(".correctAnswers");
const points = document.querySelector(".points");
const returnButton = document.querySelector(".returnButton");

let questions = [];
let availableQuestions = [];
let acceptingAnswers = false;
let questionNumber = 0;
let score = 0;
let correctAnswers = 0;
let numberCategory;
let API_URL;

function startQuiz() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  getQuestions();
}

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    numberCategory = box.dataset["category"];
    API_URL = `https://opentdb.com/api.php?amount=10&category=${numberCategory}&type=multiple`;

    startQuiz();
  });
});

async function getQuestions() {
  const response = await fetch(API_URL);
  const data = await response.json();

  questions = data.results.map((question) => {
    const questionObject = {
      question: question.question,
    };

    const answerChoices = [...question.incorrect_answers];
    questionObject.answer = Math.ceil(Math.random() * 3);
    answerChoices.splice(questionObject.answer - 1, 0, question.correct_answer);
    answerChoices.forEach((choice, index) => {
      questionObject[`choice${index + 1}`] = choice;
    });
    return questionObject;
  });
  startGame();
}

function startGame() {
  questionNumber = 0;
  score = 0;
  correctAnswers = 0;
  scoreText.innerHTML = score;
  availableQuestions = [...questions];
  displayQuestion();
}

function displayQuestion() {
  if (availableQuestions.length === 0) {
    endGame();
  }
  questionNumber++;

  progressText.innerText = `Question ${questionNumber} / 10`;
  fullProgressBar.style.width = `${(questionNumber / 10) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  question.innerHTML = `${currentQuestion.question}`;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerHTML = `${currentQuestion[`choice${number}`]}`;
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    console.log(e.target);
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToAdd =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToAdd === "correct") {
      correctAnswers++;
      score += 10;
      scoreText.innerHTML = score;
    } else {
      score -= 5;
      scoreText.innerHTML = score;
    }
    selectedChoice.parentElement.classList.add(classToAdd);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToAdd);
      displayQuestion();
    }, 1500);
  });
});

function endGame() {
  points.innerHTML = score;
  correctAnswersText.innerHTML = `${correctAnswers} of 10`;
  game.classList.add("hidden");
  scoreCard.classList.remove("hidden");
}

returnButton.addEventListener("click", backHome);

function backHome() {
  scoreCard.classList.add("hidden");
  intro.classList.remove("hidden");
}

function sort(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
