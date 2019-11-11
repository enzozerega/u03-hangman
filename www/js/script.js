let keyLetter = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];

for (i=0; i < keyLetter.length; i++) {
    let keyBox = document.createElement('div');
    keyBox.className = 'key-box';
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
}
console.log(keyLetter.length)
