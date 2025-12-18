let triviaData = [];
let questionIndex = 0;
let answers = [];
let questionNumber = 1;

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
  console.log(questionNumber);
  if (questionNumber === 11) {
    showResults();
  }
  /* get and create needed elements */
  document.querySelector(".user-choice").textContent = "";
  document.querySelector(".continue-button").setAttribute("hidden", "hidden");
  document.getElementById("title-screen-container").style.display = "none";
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
    console.log("correct answer");
  } else {
    document.querySelector(".user-choice").textContent = "Wrong answer!";
    console.log("incorrect answer");
  }

  questionIndex++;
  questionNumber++;
}

function showResults() {
  console.log("made it!!!!");
  document.querySelector("#question-container").style.display = "none";
}

// Fetch on page load
fetchQuestions();
