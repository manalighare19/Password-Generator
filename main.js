//DOM element
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Generate event listener
generateElement.addEventListener('click', () => {
    const length = +lengthElement.value;
    const hasUpper = uppercaseElement.checked;
    const hasLower = lowercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;

    resultElement.innerText = generatePassword(
        length, 
        hasUpper, 
        hasLower, 
        hasNumber, 
        hasSymbol
    ); 
});

//Copy password to clipboard
clipboardElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to Clipboard!')
})

//Generate Password function
function generatePassword(length, upper, lower, number, symbol){
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );

    //Doesn't have a selected type
    if(typesCount === 0){
        return '';
    }

    //Create a loop
    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

//Generator Functions - http://www.net-comber.com/charset.html
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

