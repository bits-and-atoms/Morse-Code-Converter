const morseCode = {
    'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
    'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
    'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
    's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
    'y': '-.--', 'z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    ' ': '/'
};

const textInput = document.getElementById('text-input');
const output = document.getElementById('output');
const toMorseButton = document.getElementById('to-morse');
const toTextButton = document.getElementById('to-text');
const clearInputButton = document.getElementById('clear-input');
const downloadButton = document.getElementById('download');

function textToMorse(text) {
    return text.toLowerCase().split('').map(char => morseCode[char] || '').join(' ');
}

function morseToText(morse) {
    const morseArray = morse.split(' ').filter(symbol => symbol.trim() !== '');
    return morseArray.map(code => Object.keys(morseCode).find(key => morseCode[key] === code) || '').join('');
}

toMorseButton.addEventListener('click', () => {
    const inputText = textInput.value.trim();
    if (!inputText) {
        alert('Please enter some text.');
        return;
    }
    output.value = textToMorse(inputText);
});

toTextButton.addEventListener('click', () => {
    const morseInput = textInput.value.trim();
    if (!morseInput) {
        alert('Please enter Morse code.');
        return;
    }
    const text = morseToText(morseInput);
    if (text) {
        output.value = text;
    } else {
        alert('Invalid Morse code entered.');
    }
});

clearInputButton.addEventListener('click', () => {
    textInput.value = '';
    output.value = '';
});

downloadButton.addEventListener('click', () => {
    const outputText = output.value.trim();
    if (!outputText) {
        alert('Please generate some output first.');
        return;
    }

    const filename = prompt('Enter a filename for the download:', 'morse_code.txt');
    if (filename) {
        const blob = new Blob([outputText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
});
