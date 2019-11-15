let keyLetter = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];

function removeButton() {
  let startButton = document.getElementsByClassName('hex-box');
  startButton[0].parentNode.removeChild(startButton[0]);
}

function startKeyboard() {
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
      boxLink.setAttribute('href','#');
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

let words = ['Blue', 'Green', 'Yellow', 'Pink'];
let indexRandom = Math.floor(Math.random() * words.length);
let wordRandom = words[indexRandom];
let win = wordRandom.length; // Becomes zero when current word is guessed
let winner = words.length; // Becomes zero when all words are guessed

function wordGenerator() {
  for (i=0; i < wordRandom.length; i++) {
    let letterBox = document.createElement('div');
    letterBox.className = 'letter-box';
    let letterSpan = document.createElement('span');
    letterSpan.className = 'input-letter';
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
      win --;
      /* Code for points earned */
    }
  }
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
}

