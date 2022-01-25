const APIURL = `https://opentdb.com/api.php?amount=10&type=multiple`;

const something = document.querySelector(".questions");
const answers = document.querySelector(".answers");

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
    something.innerHTML = `
    ${questions
      .map(
        (question, index) =>
          `<p>${question.question}</p>
          <p>${sort(allAnswers[index])}</p>
          <div><button>${allAnswers[index][0]}</button></div>
          <div><button>${allAnswers[index][1]}</button></div>
          <div><button>${allAnswers[index][2]}</button></div>
          <div><button>${allAnswers[index][3]}</button></div>
         `
      )
      .join("")}
    `;
  }
}

getQuestions();
