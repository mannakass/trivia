/* VASTA NUMBRITEGA KLAVIATUURIL ET OLEKS ACCESSIBLE */

let questionIndex = 0;
let answers = [];
let questionNumber = 1;
let points = 0;

/* open and close garden scene */
function openGarden() {
  document.getElementById("introContainer").classList.add("opened");
}

function closeGarden() {
  document.getElementById("introContainer").classList.remove("opened");
}

/* start game (by choosing difficulty) */
async function startGame(difficulty) {
  const modeName = difficulty
    ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
    : "Classic";
  document.querySelector(".current-mode").textContent = modeName;

  document.getElementById("title-screen-container").style.display = "none";

  await fetchQuestions(difficulty);
  showQuestion();
}

function showQuestion() {
  /* hide and show containers accordingly */
  document.querySelector("#question-container").style.display = "flex";
  document.querySelector("#results-container").style.display = "none";
  document.querySelector(".keyboard-hint").style.display = "none";

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
    answer.setAttribute("data-number", i + 1);
    answer.textContent = decodeHTML(answers[i]);

    answersDiv.appendChild(answer);
  }

  question.textContent = decodeHTML(triviaData[questionIndex].question);
}

function checkAnswer(element) {
  const userChoice = element.textContent;
  const correctAnswer = decodeHTML(triviaData[questionIndex].correct_answer);

  document.querySelector(".continue-button").removeAttribute("hidden");
  document.querySelector(".keyboard-hint").style.display = "block";

  // Remove click from all answers
  document.querySelectorAll(".answer-option").forEach((el) => {
    el.removeAttribute("onclick");
    el.classList.add("dimmed");
  });

  // Find and highlight correct answer
  document.querySelectorAll(".answer-option").forEach((el) => {
    if (el.textContent === correctAnswer) {
      el.classList.remove("dimmed");
      el.classList.add("correct");
    }
  });

  // Check if user was right or wrong
  if (correctAnswer === userChoice) {
    /*     document.querySelector(".user-choice").textContent = "Correct!"; */
    points += 100;
    document.querySelector(".points").textContent = points;
    console.log("correct answer");
  } else {
    element.classList.remove("dimmed");
    element.classList.add("wrong");
    /*     document.querySelector(".user-choice").textContent = "Wrong!";
    document.querySelector(".real-answer").textContent =
      "Correct answer: " + correctAnswer; */
    points -= 50;
    document.querySelector(".points").textContent = points;
    console.log("incorrect answer");
  }

  questionIndex++;
  questionNumber++;
}

/* KEYBOARD CONTROLS */
document.addEventListener("keydown", function (e) {
  // Number keys 1-4
  if (e.key >= "1" && e.key <= "4") {
    const index = parseInt(e.key) - 1;

    // Check if question container is visible - answer buttons
    const questionContainer = document.getElementById("question-container");
    if (questionContainer.style.display === "flex") {
      const answerButtons = document.querySelectorAll(".answer-option");
      if (
        answerButtons[index] &&
        answerButtons[index].hasAttribute("onclick")
      ) {
        answerButtons[index].click();
      }
      return; // Stop here, don't check mode buttons
    }

    // Check if title screen is visible - mode buttons
    const titleScreen = document.getElementById("title-screen-container");
    if (
      titleScreen.style.display !== "none" &&
      titleScreen.style.opacity !== "0"
    ) {
      const modeButtons = document.querySelectorAll(
        "#title-screen-container nav button"
      );
      if (modeButtons[index]) {
        modeButtons[index].click();
      }
      return;
    }
  }

  // Space bar for continue / go home
  if (e.code === "Space") {
    e.preventDefault();

    // Go to home button - check FIRST
    const homeBtn = document.querySelector(".to-homepage");
    if (homeBtn) {
      const resultsContainer = document.getElementById("results-container");
      if (resultsContainer.style.display === "flex") {
        homeBtn.click();
        return;
      }
    }

    // Next question button
    const continueBtn = document.querySelector(".continue-button");
    if (continueBtn && !continueBtn.hasAttribute("hidden")) {
      continueBtn.click();
      return;
    }
  }
});

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
