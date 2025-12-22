let triviaData = [];

async function fetchQuestions(difficulty) {
  console.log("hello, fetching");
  questionNumber = 1;
  points = 0;
  questionIndex = 0;

  let url = "https://opentdb.com/api.php?amount=50&type=multiple";

  if (difficulty) {
    url += `&difficulty=${difficulty}`;
  }

  console.log(url);

  const res = await fetch(url);
  const data = await res.json();

  triviaData = data.results.slice(0, 10);
}
