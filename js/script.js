let triviaData = [];
let questionIndex = 0;
let answers = [];

async function fetchQuestions() {
  const res = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple"
  );
  const data = await res.json();

  for (i = 0; i < 10; i++) {
    triviaData = data.results.slice(0, 10);
  }

  console.log(triviaData);
}

function showQuestion() {
  /* get and create needed elements */
  document.getElementById("title-screen-container").style.display = "none";
  const question = document.querySelector(".question");
  const answersDiv = document.querySelector(".answers-container");

  /* clear data */
  answers = [];
  question.textContent = "";
  answersDiv.innerHTML = "";

  /* push answers into array */
  answers = [
    triviaData[questionIndex].correct_answer,
    ...triviaData[questionIndex].incorrect_answers,
  ];

  /* shuffle answers */
  shuffle(answers);

  /* put info inside HTML */
  for (i = 0; i < 4; i++) {
    const answer = document.createElement("p");
    answer.setAttribute("onClick", "checkAnswer(this)");
    answer.textContent = decodeHTML(answers[i]);

    answersDiv.appendChild(answer);
  }

  question.textContent = decodeHTML(triviaData[questionIndex].question);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* to get rid of the weird symbols in questions and answers */
function decodeHTML(text) {
  const temp = document.createElement("textarea");
  temp.innerHTML = text;
  return temp.value;
}

function checkAnswer(element) {
  const userChoice = element.textContent;

  if (triviaData[questionIndex].correct_answer === userChoice) {
    /* do something */
    console.log("correct answer");
  } else {
    console.log("incorrect answer");
  }
}

// Fetch on page load
fetchQuestions();
