let triviaData = [];
let questionIndex = 0;
let answers = [];
let questionNumber = 1;
let points = 0;

async function fetchQuestions() {
  questionNumber = 1;
  points = 0;
  questionIndex = 0;
  const res = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple"
  );
  const data = await res.json();

  triviaData = data.results.slice(0, 10);

  console.log(triviaData);
}

function showQuestion() {
  document.querySelector("#question-container").style.display = "flex";
  document.querySelector("#results-container").style.display = "none";
  document.getElementById("title-screen-container").style.display = "none";

  console.log(questionNumber);
  if (questionNumber === 11) {
    showResults();
    return;
  }
  /* get and create needed elements */
  document.querySelector(".user-choice").textContent = "";
  document.querySelector(".points").textContent = points;
  document.querySelector(".continue-button").setAttribute("hidden", "hidden");
  document.querySelector(".question-number").textContent = questionNumber;
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
  document.querySelector(".continue-button").removeAttribute("hidden");

  if (triviaData[questionIndex].correct_answer === userChoice) {
    document.querySelector(".user-choice").textContent = "Correct answer!";
    points += 100;
    document.querySelector(".points").textContent = points;
    console.log("correct answer");
  } else {
    document.querySelector(".user-choice").textContent = "Wrong answer!";
    points -= 50;
    document.querySelector(".points").textContent = points;
    console.log("incorrect answer");
  }

  questionIndex++;
  questionNumber++;
}

function showResults() {
  document.querySelector("#question-container").style.display = "none";
  document.querySelector("#results-container").style.display = "flex";
  document.getElementById("title-screen-container").style.display = "none";
  document.querySelector(".final-points").textContent = points;
}

function toHomepage() {
  document.querySelector("#question-container").style.display = "none";
  document.querySelector("#results-container").style.display = "none";
  document.getElementById("title-screen-container").style.display = "flex";
  fetchQuestions();
}

// Fetch on page load
fetchQuestions();
