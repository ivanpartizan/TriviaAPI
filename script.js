const APIURL = `https://opentdb.com/api.php?amount=10&type=multiple`;

const game = document.querySelector(".questions");

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

async function getQuestions() {
  const response = await fetch(APIURL);
  const data = await response.json();
  displayData(data);
}

function displayData(data) {
  const questions = data.results;
  console.log(questions);

  let allAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    allAnswers.push([
      ...questions[i].incorrect_answers,
      questions[i].correct_answer,
    ]);
  }
  console.log(allAnswers);

  // let sortedAnswers = sort(allAnswers);
  // console.log(sortedAnswers);

  for (let answers of allAnswers) {
    console.log(answers);
    game.innerHTML = `
    ${questions
      .map(
        (question, index) =>
          `<p class="question">${question.question}</p>
          <p>${sort(allAnswers[index])}</p>
          <div><button>A ${allAnswers[index][0]}</button></div>
          <div><button>B ${allAnswers[index][1]}</button></div>
          <div><button>C ${allAnswers[index][2]}</button></div>
          <div><button>D ${allAnswers[index][3]}</button></div>
         `
      )
      .join("")}
    `;
  }
}

getQuestions();
