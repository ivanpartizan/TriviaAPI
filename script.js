const intro = document.querySelector(".intro");
const game = document.querySelector(".game");

const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".answers-text"));
const scoreText = document.querySelector("#score");
const progressText = document.querySelector(".text");
const fullProgressBar = document.querySelector(".fullProgressBar");

let questions = [];
let availableQuestions = [];
let acceptingAnswers = false;
let questionNumber = 0;
let score = 0;

function startQuiz() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  getQuestions();
}

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
      score++;
      console.log(score);
      scoreText.innerHTML = score;
      // incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToAdd);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToAdd);
      displayQuestion();
    }, 1500);
  });
});

function endGame() {
  game.classList.add("hidden");
  intro.classList.remove("hidden");
}
// showQuestion = (questions) => {
//   const questionHTML = document.createElement("div");

//   questions.forEach((question) => {
//     rightAns = question.correct_answer;

//     let possibleAnswers = question.incorrect_answers;
//     possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAns);

//     questionHTML.innerHTML = `<div class="row justify-content-between heading">
//       <p class="category">Category:${question.category}</p>

//       <div>
//       <h2 class="text-center">${question.question}`;

//     const answerDiv = document.createElement("div");
//     answerDiv.classList.add(
//       "questions",
//       "row",
//       "justify-content-around",
//       "mt-5"
//     );
//     console.log(answerDiv);
//     possibleAnswers.forEach((answer) => {
//       const answerHTML = document.createElement("li");
//       answerHTML.classList.add("col-12", "col-md-5");
//       answerHTML.textContent = answer;

//       // answerHTML.onclick = selectAnswer;

//       answerDiv.appendChild(answerHTML);
//     });
//     questionHTML.appendChild(answerDiv); /*Main wrapper */

//     document.querySelector("#app").appendChild(questionHTML);
//   });
// };

// const APIURL = `https://opentdb.com/api.php?amount=10&type=multiple`;

// const game = document.querySelector(".questions");

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

// async function getQuestions() {
//   const response = await fetch(APIURL);
//   const data = await response.json();
//   displayData(data);
// }

// function displayData(data) {
//   const questions = data.results;
//   console.log(questions);

//   let allAnswers = [];
//   for (let i = 0; i < questions.length; i++) {
//     allAnswers.push([
//       ...questions[i].incorrect_answers,
//       questions[i].correct_answer,
//     ]);
//   }
//   console.log(allAnswers);

//   let sortedAnswers = sort(allAnswers);
//   console.log(sortedAnswers);
//   const game = document.querySelector(".question-text");
//   for (let answers of allAnswers) {
//     console.log(answers);
//     game.innerHTML = `
//     ${questions
//       .map(
//         (question, index) =>
//           `<p class="question">${question.question}</p>
//           <p>${sortedAnswers[index]}</p>
//           <div><button>A ${sortedAnswers[index][0]}</button></div>
//           <div><button>B ${sortedAnswers[index][1]}</button></div>
//           <div><button>C ${sortedAnswers[index][2]}</button></div>
//           <div><button>D ${sortedAnswers[index][3]}</button></div>
//          `
//       )
//       .join("")}
//     `;
//   }
// }

// getQuestions();
