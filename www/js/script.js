let keyLetter = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];

let i = 0; 
do { 
  task(i); 
  i++; 
} while (i < keyLetter.length); 
function task(i) { 
  setTimeout(function() { 
     
    let keyBox = document.createElement('div');
    keyBox.className = 'key-box faded-out';
    let keySpan = document.createElement('span');
    keySpan.className = 'key-letter';
    keySpan.innerHTML = keyLetter[i];
    document.getElementById('keyboard').appendChild(keyBox);
    keyBox.appendChild(keySpan);

    if (keyLetter[i] === 'P'|| keyLetter[i] === 'L') {
        let keyBreak = document.createElement('div');
        keyBreak.className = 'key-break';
        document.getElementById('keyboard').appendChild(keyBreak);
    }

    requestAnimationFrame(() => {
        keyBox.classList.remove("faded-out")
      });

  }, 300 * i); 
};



let words = ['Blue', 'Green', 'Yellow', 'Pink'];
let indexRandom = Math.floor(Math.random() * words.length);
let wordRandom = words[indexRandom];
delete words[indexRandom];
for (i=0; i < wordRandom.length; i++) {
    let letterBox = document.createElement('div');
    letterBox.className = 'letter-box';
    let letterSpan = document.createElement('span');
    letterSpan.className = 'input-letter';
    document.getElementById('input-box').appendChild(letterBox);
    letterBox.appendChild(letterSpan);
}

