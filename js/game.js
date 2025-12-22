/* VASTA NUMBRITEGA KLAVIATUURIL ET OLEKS ACCESSIBLE */

let questionIndex = 0;
let answers = [];
let questionNumber = 1;
let points = 0;

/* ========== OPEN/CLOSE GARDEN ========== */
function openGarden() {
  document.getElementById("introContainer").classList.add("opened");
}

function closeGarden() {
  document.getElementById("introContainer").classList.remove("opened");
}

async function startGame(difficulty) {
  await fetchQuestions(difficulty);
  showQuestion();
}

function showQuestion() {
  /* hide and show containers accordingly */
  document.querySelector("#question-container").style.display = "flex";
  document.querySelector("#results-container").style.display = "none";
  document.getElementById("title-screen-container").style.display = "none";

  if (questionNumber === 10) {
    document.querySelector(".continue-button").textContent = "Finish";
  }

  /* if we've had 10 questions, go to results */
  if (questionNumber === 11) {
    showResults();
    document.querySelector(".continue-button").textContent = "Next question";
    return;
  }

  console.log(triviaData[questionIndex].difficulty);
  /* get and create needed elements */
  document.querySelector(".user-choice").textContent = "";
  document.querySelector(".real-answer").textContent = "";
  document.querySelector(".points").textContent = points;
  document.querySelector(".continue-button").setAttribute("hidden", "hidden");
  document.querySelector(".question-number").textContent = questionNumber;
  const question = document.querySelector(".question");
  const answersDiv = document.querySelector(".answers-container");

  /* clear data from previous question */
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
    const answer = document.createElement("button");
    answer.setAttribute("onClick", "checkAnswer(this)");
    answer.classList.add("answer-option");
    answer.textContent = decodeHTML(answers[i]);

    answersDiv.appendChild(answer);
  }

  question.textContent = decodeHTML(triviaData[questionIndex].question);
}

function checkAnswer(element) {
  const userChoice = element.textContent;
  document.querySelector(".continue-button").removeAttribute("hidden");
  console.log(document.querySelectorAll(".answer-option"));

  /* remove the option to click on any other answer after you're already clicked on sth */
  document.querySelectorAll(".answer-option").forEach((el) => {
    el.removeAttribute("onclick");
  });

  /* If answer is correct */
  if (decodeHTML(triviaData[questionIndex].correct_answer) === userChoice) {
    document.querySelector(".user-choice").textContent = "Correct answer!";
    points += 100;
    document.querySelector(".points").textContent = points;
    console.log("correct answer");
    /* If answer is not correct */
  } else {
    document.querySelector(".user-choice").textContent = "Wrong answer!";
    document.querySelector(".real-answer").textContent =
      "Correct answer is: " +
      decodeHTML(triviaData[questionIndex].correct_answer);
    //triviaData[questionIndex].correct_answer;
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
}
