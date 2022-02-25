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

function startQuiz() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  getQuestions();
}

// Sports
("https://opentdb.com/api.php?amount=10&category=21&type=multiple");

// Music
("https://opentdb.com/api.php?amount=10&category=12&type=multiple");

// Film
("https://opentdb.com/api.php?amount=10&category=11&type=multiple");

// Geography
("https://opentdb.com/api.php?amount=10&category=22&type=multiple");

// History
("https://opentdb.com/api.php?amount=10&category=23&type=multiple");

// Science & Nature
("https://opentdb.com/api.php?amount=10&category=17&type=multiple");

const urlGeneralKnowledge =
  "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

async function getQuestions() {
  const response = await fetch(urlGeneralKnowledge);
  const data = await response.json();
  console.log(data);
  console.log(data.results);

  questions = data.results.map((question) => {
    const questionObject = {
      question: question.question,
    };

    const answerChoices = [...question.incorrect_answers];
    questionObject.answer = Math.ceil(Math.random() * 3);
    answerChoices.splice(questionObject.answer - 1, 0, question.correct_answer);
    console.log(answerChoices);
    answerChoices.forEach((choice, index) => {
      questionObject[`choice${index + 1}`] = choice;
    });
    // console.log(questionObject);
    // console.log(questions);
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
  console.log(availableQuestions);
  displayQuestion();
}

function displayQuestion() {
  if (availableQuestions.length === 0) {
    endGame();
  }
  console.log(availableQuestions);
  questionNumber++;

  progressText.innerText = `Question ${questionNumber} / 10`;
  fullProgressBar.style.width = `${(questionNumber / 10) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  console.log(currentQuestion);
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
    console.log(selectedChoice);
    console.log(selectedAnswer);

    let classToAdd =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToAdd === "correct") {
      correctAnswers++;
      score += 10;
      scoreText.innerHTML = score;
      // incrementScore(CORRECT_BONUS);
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
