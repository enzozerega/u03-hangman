let keyLetter = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
let wordCategories = ['Colors', 'Animals', 'Planets'];
let instructionsT = 'Instructions';
let instructions = ['You will be challenged to guess words of a category you choose.','The only clue you will have is the number of letters each word has.','Click on the different letters on the colorful keyboard and see if the word contains that letter.','Repeat until you have guessed all letters!'];

function restartGame() {
  let sections = document.querySelector('section');
  sections.querySelectorAll('*').forEach(n => n.remove());
  let startButton = document.createElement('div');
  startButton.setAttribute('id','hex-box');
  let startBoxIn = document.createElement('div');
  startBoxIn.className = 'hex-box-in';
  let startBoxLink = document.createElement('a');
  startBoxLink.className = 'hex-box-link';
  startBoxLink.innerHTML = 'Start<br>game';
  startBoxLink.setAttribute('onclick', onclick='removeButton(); startInstructions()');
  sections.appendChild(startButton);
  startButton.appendChild(startBoxIn);
  startBoxIn.appendChild(startBoxLink);
}

function removeButton() {
  let startButton = document.getElementsByClassName('hex-box-in');
  startButton[0].parentNode.removeChild(startButton[0]);
}

function removeInstructions() {
  let instructionsR = document.querySelector('#instructions-box');
  instructionsR.remove();
}

function startInstructions () {
  document.getElementById('hex-box').setAttribute('id','instructions-box');
  let instructionsBoxIn = document.createElement('div');
  instructionsBoxIn.className = 'instructions-box-in';
  document.getElementById('instructions-box').appendChild(instructionsBoxIn);
  let instructionsBoxHex = document.createElement('div');
  instructionsBoxHex.className = 'instructions-box-hex';
  instructionsBoxIn.appendChild(instructionsBoxHex);
  let instructionsTitle =  document.createElement('h2');
  instructionsTitle.className = 'instructions-title';
  instructionsTitle.innerHTML = instructionsT;
  instructionsBoxHex.appendChild(instructionsTitle);
  for (i=0; i < instructions.length; i++) {
    let instructionsText =  document.createElement('p');
    instructionsText.className = 'instructions-text';
    instructionsText.innerHTML = instructions[i];
    instructionsBoxHex.appendChild(instructionsText);
  }
  let startGame = document.createElement('a');
  startGame.className = 'play-now';
  startGame.innerHTML = 'PLAY NOW';
  startGame.setAttribute('onclick','chooseCategory()');
  instructionsBoxHex.appendChild(startGame);
}

function chooseCategory () {
  let instructionsR = document.querySelector('.instructions-box-hex');
  instructionsR.querySelectorAll('*').forEach(n => n.remove());
  let wordCategoryTitle = document.createElement('h2');
  wordCategoryTitle.className = 'word-category-title';
  wordCategoryTitle.innerHTML = 'Choose a word category:';
  instructionsR.appendChild(wordCategoryTitle);
  for (i=0; i < wordCategories.length; i++) {
    let wordCategory = document.createElement('a');
    wordCategory.className = 'word-category';
    wordCategory.innerHTML = wordCategories[i];
    wordCategory.setAttribute('onclick','removeInstructions(); startKeyboard(); wordGenerator(); hangman()');
    instructionsR.appendChild(wordCategory);
  }
}

function hangman() {
  let hangmanBox = document.createElement('div');
  hangmanBox.setAttribute('id','hangman-box');
  let hangmanBoxIn = document.createElement('div');
  hangmanBoxIn.className = 'hangman-box-in';
  let hangmanBoxHex = document.createElement('div');
  hangmanBoxHex.className = 'hangman-box-hex';
  document.querySelector('section').appendChild(hangmanBox);
  hangmanBox.appendChild(hangmanBoxIn);
  hangmanBoxIn.appendChild(hangmanBoxHex);
  let hangmanFigure = document.createElement('img');
  hangmanFigure.className = 'hangman-figure';
  hangmanFigure.setAttribute('src','img/hangman1.png');
  hangmanBoxHex.appendChild(hangmanFigure);
  
}

function startKeyboard() {
  let keyboard = document.createElement('ul');
  keyboard.setAttribute('id','keyboard');
  document.getElementsByTagName('section')[0].appendChild(keyboard);
  let i = 0; 
  do { 
    task(i); 
    i++; 
  } while (i < keyLetter.length); 
  function task(i) { 
    setTimeout(function() { 
      let keyBox = document.createElement('li');
      keyBox.className = 'key-box';
      let boxIn = document.createElement('div');
      boxIn.className = 'box-in';
      let boxLink = document.createElement('a');
      boxLink.className = 'box-link';
      boxLink.setAttribute('id','letter-'+keyLetter[i]);
      boxLink.setAttribute('onclick','clickedCube('+"'"+'letter-'+keyLetter[i]+"'"+')');
      let keySpan = document.createElement('span');
      keySpan.className = 'key-letter';
      keySpan.innerHTML = keyLetter[i];
      document.getElementById('keyboard').appendChild(keyBox);
      keyBox.appendChild(boxIn);
      boxIn.appendChild(boxLink);
      boxLink.appendChild(keySpan);
    }, 100 * i); 
  }
}

let words;
let indexRandom;
let wordRandom;
let win; // Becomes zero when current word is guessed
let winner; // Becomes zero when all words are guessed
let mistake;
let k;

function initiateVariables() {
  words = ['Blue', 'Green', 'Yellow', 'Pink'];
  indexRandom = Math.floor(Math.random() * words.length);
  wordRandom = words[indexRandom];
  win = wordRandom.length; // Becomes zero when current word is guessed
  winner = words.length; // Becomes zero when all words are guessed
  mistake = win;
  k=2;
}
initiateVariables();
function wordGenerator() {
  for (i=0; i < wordRandom.length; i++) {
    let inputBox = document.createElement('div');
    inputBox.setAttribute('id','input-box');
    let letterBox = document.createElement('div');
    letterBox.className = 'letter-box';
    let letterSpan = document.createElement('span');
    letterSpan.className = 'input-letter';
    document.querySelector('section').appendChild(inputBox);
    document.getElementById('input-box').appendChild(letterBox);
    letterBox.appendChild(letterSpan);
  }
}

function clickedCube(identifier) {
  document.getElementById(identifier).setAttribute('class', 'box-link clicked-cube');
  let clickedKey = document.getElementById(identifier).firstChild.innerHTML;
  
  for (i=0; i < wordRandom.length; i++) {
    if (wordRandom[i] === clickedKey || wordRandom[i] === clickedKey.toLowerCase()) {
      document.getElementsByClassName('input-letter')[i].innerHTML = clickedKey;
      win--;
      /* Code for points earned */
    }
  }
  if (mistake === win) {
    document.querySelector('.hangman-figure').setAttribute('src','img/hangman'+k+'.png');
    k++;
  }
  mistake = win;
  if (win === 0) {
    /* Code for winning part */
    winner --;
    let oldElements = document.getElementsByClassName('letter-box');
    while(oldElements.length > 0) { // Deletes guessed word
      oldElements[0].parentNode.removeChild(oldElements[0]);
    }
    if (winner === 0) {
      words = ['Blue', 'Green', 'Yellow', 'Pink'];
      indexRandom = Math.floor(Math.random() * words.length);
      wordRandom = words[indexRandom];
      win = wordRandom.length; // Becomes zero when current word is guessed
      winner = words.length;
      for (j=0; j < keyLetter.length; j++) { // Faded clicked keys to initial style
        document.getElementById('letter-'+keyLetter[j]).setAttribute('class', 'box-link');
      }
    }
    else {
      words.splice(indexRandom,1);
      indexRandom = Math.floor(Math.random() * words.length);
      wordRandom = words[indexRandom];
      win = wordRandom.length;
    }
    wordGenerator();
    for (j=0; j < keyLetter.length; j++) { // Faded clicked keys to initial style
      document.getElementById('letter-'+keyLetter[j]).setAttribute('class', 'box-link');
    }
    
  }
  console.log(k);
  if (k === 7) {
    document.querySelector('#keyboard').remove();
    let inputBoxR = document.querySelector('#input-box');
    inputBoxR.querySelectorAll('*').forEach(n => n.remove());
    let instuctionsBox = document.createElement('div');
    instuctionsBox.setAttribute('id','instructions-box');
    document.querySelector('section').appendChild(instuctionsBox);
    let instructionsBoxIn = document.createElement('div');
    instructionsBoxIn.className = 'instructions-box-in'
    let instructionsBoxHex = document.createElement('div');
    instructionsBoxHex.className = 'instructions-box-hex'
    let gameOver = document.createElement('span');
    gameOver.className = 'game-over';
    gameOver.innerHTML = 'GAME OVER';
    let playAgain = document.createElement('a');
    playAgain.className = 'word-category';
    playAgain.innerHTML = 'Play again';
    playAgain.setAttribute('onclick','chooseCategory(); initiateVariables(); removeHangman()');
    instuctionsBox.appendChild(instructionsBoxIn);
    instructionsBoxIn.appendChild(instructionsBoxHex);
    instructionsBoxHex.appendChild(gameOver);
    gameOver.appendChild(playAgain);
  }
}
function removeHangman() {
  document.querySelector('#hangman-box').remove();
}



