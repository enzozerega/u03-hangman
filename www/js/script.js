/* Inspiration and some solutions from:
https://github.com/web-tiki/responsive-grid-of-hexagons/blob/master/hexagons.css (hexagonal element)

https://medium.com/@dave_lunny/animating-css-gradients-using-only-css-d2fd7671e759 (css animations)

https://css-tricks.com/the-shapes-of-css/ (triangular element)

https://www.geeksforgeeks.org/how-to-add-a-delay-in-a-javascript-loop/ (delay loop for keyboard)

*/

/* MAIN VARIABLES */

let keyLetter = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
let wordCategories = ["Colors", "Animals", "Planets"];
let instructionsT = "Instructions";
let instructions = [
  "You will be challenged to guess words of a category you choose.",
  "The only clue you will have is the number of letters each word has.",
  "Click on the different letters on the colorful keyboard and see if the word contains that letter.",
  "Repeat until you have guessed all letters!",
];

/* Main functions */

function startInstructions() {
  // Adds the instructions
  document.getElementById("hex-box").setAttribute("id", "instructions-box");
  let instructionsBoxIn = document.createElement("div");
  instructionsBoxIn.className = "instructions-box-in";
  document.getElementById("instructions-box").appendChild(instructionsBoxIn);
  let instructionsBoxHex = document.createElement("div");
  instructionsBoxHex.className = "instructions-box-hex";
  instructionsBoxIn.appendChild(instructionsBoxHex);
  let instructionsTitle = document.createElement("h2");
  instructionsTitle.className = "instructions-title";
  instructionsTitle.innerHTML = instructionsT;
  instructionsBoxHex.appendChild(instructionsTitle);
  for (i = 0; i < instructions.length; i++) {
    let instructionsText = document.createElement("p");
    instructionsText.className = "instructions-text";
    instructionsText.innerHTML = instructions[i];
    instructionsBoxHex.appendChild(instructionsText);
  }
  let startGame = document.createElement("a");
  startGame.className = "play-now";
  startGame.innerHTML = "PLAY NOW";
  startGame.setAttribute("onclick", "chooseCategory()");
  instructionsBoxHex.appendChild(startGame);
}

function chooseCategory() {
  // Adds the category selector
  let instructionsR = document.querySelector(".instructions-box-hex");
  instructionsR.querySelectorAll("*").forEach((n) => n.remove());
  let wordCategoryTitle = document.createElement("h2");
  wordCategoryTitle.className = "word-category-title";
  wordCategoryTitle.innerHTML = "Choose a word category:";
  instructionsR.appendChild(wordCategoryTitle);
  for (i = 0; i < wordCategories.length; i++) {
    let wordCategory = document.createElement("a");
    wordCategory.className = "word-category";
    wordCategory.innerHTML = wordCategories[i];
    wordCategory.setAttribute(
      "onclick",
      "removeInstructions(); startKeyboard(); initiateVariables(" +
        '"' +
        wordCategories[i] +
        '"' +
        "); wordGenerator(); hangman()"
    );
    instructionsR.appendChild(wordCategory);
  }
}

function hangman() {
  // Adds hangman figure
  let hangmanBox = document.createElement("div");
  hangmanBox.setAttribute("id", "hangman-box");
  let hangmanBoxIn = document.createElement("div");
  hangmanBoxIn.className = "hangman-box-in";
  let hangmanBoxHex = document.createElement("div");
  hangmanBoxHex.className = "hangman-box-hex";
  document.querySelector("section").appendChild(hangmanBox);
  hangmanBox.appendChild(hangmanBoxIn);
  hangmanBoxIn.appendChild(hangmanBoxHex);
  let hangmanLink = document.createElement("a");
  hangmanLink.setAttribute("class", "attribution");
  hangmanLink.setAttribute(
    "href",
    "https://www.vecteezy.com/free-vector/male-faces"
  ); //Attribution
  let hangmanFigure = document.createElement("img");
  hangmanFigure.className = "hangman-figure";
  hangmanFigure.setAttribute("src", "img/hangman1.png");
  hangmanFigure.setAttribute("alt", "Male Faces Vectors by Vecteezy");
  hangmanBoxHex.appendChild(hangmanLink);
  hangmanLink.appendChild(hangmanFigure);
}

function startKeyboard() {
  // Adds keyboard
  if (winner !== 0) {
    let keyboard = document.createElement("ul");
    keyboard.setAttribute("id", "keyboard");
    document.getElementsByTagName("section")[0].appendChild(keyboard);
    let i = 0;
    do {
      // Makes that each key appears with a delay of 100 ms
      task(i);
      i++;
    } while (i < keyLetter.length);
    function task(i) {
      setTimeout(function () {
        let keyBox = document.createElement("li");
        keyBox.className = "key-box";
        let boxIn = document.createElement("div");
        boxIn.className = "box-in";
        let boxLink = document.createElement("a");
        boxLink.className = "box-link";
        boxLink.setAttribute("id", "letter-" + keyLetter[i]);
        boxLink.setAttribute(
          "onclick",
          "clickedCube(" + "'" + "letter-" + keyLetter[i] + "'" + ")"
        );
        let keySpan = document.createElement("span");
        keySpan.className = "key-letter";
        keySpan.innerHTML = keyLetter[i];
        document.getElementById("keyboard").appendChild(keyBox);
        keyBox.appendChild(boxIn);
        boxIn.appendChild(boxLink);
        boxLink.appendChild(keySpan);
      }, 100 * i);
    }
  }
}

let category;
let words;
let indexRandom;
let wordRandom;
let win; // Becomes zero when current word is guessed
let winner; // Becomes zero when all words are guessed
let mistake;
let k;

function initiateVariables(category) {
  // Gives value to important variables
  if (category === "Colors") {
    words = ["Blue", "Green", "Yellow", "Pink", "White", "Black"];
  } else if (category === "Animals") {
    words = ["Dog", "Monkey", "Bear", "Cat"];
  } else if (category === "Planets") {
    words = ["Neptune", "Mars", "Venus", "Earth"];
  }
  indexRandom = Math.floor(Math.random() * words.length);
  wordRandom = words[indexRandom]; // Contains the secret word
  win = wordRandom.length; // Becomes zero when current word is guessed
  winner = words.length; // Becomes zero when all words are guessed
  mistake = win;
  k = 2;
}

function wordGenerator() {
  // Adds word bubbles
  let inputBox = document.createElement("div");
  inputBox.setAttribute("id", "input-box");
  document.querySelector("section").appendChild(inputBox);
  for (i = 0; i < wordRandom.length; i++) {
    let letterBox = document.createElement("div");
    letterBox.className = "letter-box";
    let letterSpan = document.createElement("span");
    letterSpan.className = "input-letter";
    document.getElementById("input-box").appendChild(letterBox);
    letterBox.appendChild(letterSpan);
  }
}

function winAll() {
  // Called when user guesses all words in chosen category
  if (winner === 0) {
    removeWord();
    restartHangman();
    document
      .querySelector(".hangman-figure")
      .setAttribute("src", "img/trophy-gold.png");
    document
      .querySelector(".attribution")
      .setAttribute("href", "https://www.vecteezy.com/free-vector/winner");
    document
      .querySelector(".hangman-figure")
      .setAttribute("alt", "Winner Vectors by Vecteezy");
    document
      .querySelector(".hangman-figure")
      .setAttribute("class", "hangman-figure trophy");
    let instuctionsBox = document.createElement("div");
    instuctionsBox.setAttribute("id", "instructions-box");
    instuctionsBox.setAttribute("class", "game-over-box");
    document.querySelector("section").appendChild(instuctionsBox);
    let instructionsBoxIn = document.createElement("div");
    instructionsBoxIn.className = "instructions-box-in";
    let instructionsBoxHex = document.createElement("div");
    instructionsBoxHex.className = "instructions-box-hex";
    let gameOver = document.createElement("span");
    gameOver.className = "game-over";
    gameOver.innerHTML = "1st WINNER";
    instuctionsBox.appendChild(instructionsBoxIn);
    instructionsBoxIn.appendChild(instructionsBoxHex);
    instructionsBoxHex.appendChild(gameOver);
  }
}

function clickedCube(identifier) {
  // Called when each key is clicked
  document
    .getElementById(identifier)
    .setAttribute("class", "box-link clicked-cube");
  let clickedKey = document.getElementById(identifier).firstChild.innerHTML;
  for (i = 0; i < wordRandom.length; i++) {
    if (
      wordRandom[i] === clickedKey ||
      wordRandom[i] === clickedKey.toLowerCase()
    ) {
      document.getElementsByClassName("input-letter")[i].innerHTML = clickedKey;
      win--;
    }
  }
  if (mistake === win) {
    document
      .querySelector(".hangman-figure")
      .setAttribute("src", "img/hangman" + k + ".png");
    k++;
  }
  mistake = win;
  if (win === 0) {
    /* Code for winning part */
    document
      .querySelector(".hangman-figure")
      .setAttribute("src", "img/trophy.png");
    document
      .querySelector(".attribution")
      .setAttribute("href", "https://www.vecteezy.com/free-vector/winner");
    document
      .querySelector(".hangman-figure")
      .setAttribute("alt", "Winner Vectors by Vecteezy");
    document
      .querySelector(".hangman-figure")
      .setAttribute("class", "hangman-figure trophy");
    document
      .querySelectorAll(".letter-box")
      .forEach((n) => n.setAttribute("class", "letter-box win"));
    winner--;
    k = 2;
    lockKeyboard();
    let nextWord = document.createElement("div");
    nextWord.className = "next-word";
    let nextWordText = document.createElement("span");
    nextWordText.className = "next-word-text";
    nextWordText.innerHTML = "Next word";
    nextWordText.setAttribute(
      "onclick",
      "removeWord(); wordGenerator(); restartHangman(); removeKeyboard(); startKeyboard(); winAll(); removeNextWord()"
    );
    document.querySelector("section").appendChild(nextWord);
    nextWord.appendChild(nextWordText);

    if (winner !== 0) {
      words.splice(indexRandom, 1); // Deletes guessed word from words array
      indexRandom = Math.floor(Math.random() * words.length);
      wordRandom = words[indexRandom];
      win = wordRandom.length;
    }
  }
  if (k === 7) {
    // When all the 6 attempts are used. Game over.
    document.querySelector("#keyboard").remove();
    let inputBoxR = document.querySelector("#input-box");
    inputBoxR.querySelectorAll("*").forEach((n) => n.remove());
    let instuctionsBox = document.createElement("div");
    instuctionsBox.setAttribute("id", "instructions-box");
    instuctionsBox.setAttribute("class", "game-over-box");
    document.querySelector("section").appendChild(instuctionsBox);
    let instructionsBoxIn = document.createElement("div");
    instructionsBoxIn.className = "instructions-box-in";
    let instructionsBoxHex = document.createElement("div");
    instructionsBoxHex.className = "instructions-box-hex";
    let gameOver = document.createElement("span");
    gameOver.className = "game-over";
    gameOver.innerHTML = "GAME OVER";
    let playAgain = document.createElement("a");
    playAgain.className = "word-category";
    playAgain.innerHTML = "Play again";
    playAgain.setAttribute(
      "onclick",
      "chooseCategory(); initiateVariables(); removeHangman(); removeClass()"
    );
    instuctionsBox.appendChild(instructionsBoxIn);
    instructionsBoxIn.appendChild(instructionsBoxHex);
    instructionsBoxHex.appendChild(gameOver);
    gameOver.appendChild(playAgain);
  }
}

/* Restart functions */

function removeButton() {
  let startButton = document.getElementsByClassName("hex-box-in");
  startButton[0].parentNode.removeChild(startButton[0]);
}

function removeInstructions() {
  let instructionsR = document.querySelector("#instructions-box");
  instructionsR.remove();
}

function removeKeyboard() {
  let keyboardR = document.querySelector("#keyboard");
  keyboardR.remove();
}

function restartGame() {
  let sections = document.querySelector("section");
  sections.querySelectorAll("*").forEach((n) => n.remove());
  let startButton = document.createElement("div");
  startButton.setAttribute("id", "hex-box");
  let startBoxIn = document.createElement("div");
  startBoxIn.className = "hex-box-in";
  let startBoxLink = document.createElement("a");
  startBoxLink.className = "hex-box-link";
  startBoxLink.innerHTML = "Start<br>game";
  startBoxLink.setAttribute(
    "onclick",
    (onclick = "removeButton(); startInstructions()")
  );
  sections.appendChild(startButton);
  startButton.appendChild(startBoxIn);
  startBoxIn.appendChild(startBoxLink);
}

function removeWord() {
  let oldElement = document.getElementById("input-box");
  oldElement.parentNode.removeChild(oldElement);
}

function restartHangman() {
  document
    .querySelector(".hangman-figure")
    .setAttribute("src", "img/hangman1.png");
  document
    .querySelector(".hangman-figure")
    .setAttribute("class", "hangman-figure");
}

function lockKeyboard() {
  document
    .querySelectorAll(".box-link")
    .forEach((n) => n.setAttribute("onclick", ""));
  document
    .querySelectorAll(".box-link")
    .forEach((n) => n.setAttribute("class", "box-link box-link-locked"));
}

function removeNextWord() {
  let nextWordR = document.querySelector(".next-word");
  nextWordR.remove();
}

function removeClass() {
  document.querySelector(".game-over-box").setAttribute("class", '""');
}

function removeHangman() {
  document.querySelector("#hangman-box").remove();
}
