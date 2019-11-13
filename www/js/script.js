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
let winner = wordRandom.length;

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
      winner --;
    }
  }
  if (winner === 0) {
    /* Code for winning part */
    let oldElements = document.getElementsByClassName('letter-box');
    while(oldElements.length > 0) {
      oldElements[0].parentNode.removeChild(oldElements[0]);
    }
    
    wordGenerator();
    for (j=0; j < keyLetter.length; j++) {
      document.getElementById('letter-'+keyLetter[j]).setAttribute('class', 'box-link');
    }
    delete words[indexRandom];
  }
}

