/* to get rid of the weird symbols in questions and answers */
function decodeHTML(text) {
  const temp = document.createElement("textarea");
  temp.innerHTML = text;
  return temp.value;
}

/* shuffle answers */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
