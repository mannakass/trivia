let triviaData = [];

async function fetchQuestions() {
  questionNumber = 1;
  points = 0;
  questionIndex = 0;
  const res = await fetch(
    "https://opentdb.com/api.php?amount=50&type=multiple"
  );
  const data = await res.json();

  triviaData = data.results.slice(0, 10);
}
