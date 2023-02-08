function hideElements(classNames) {
    classNames.forEach((className) => {
        document.querySelector(className).classList.add('hidden');
    });
}

function showElements(classNames) {
    classNames.forEach((className) => {
        document.querySelector(className).classList.remove('hidden');
    });
}

let maxValue = 0;
let minValue = 0;

document.getElementById('btnStart').addEventListener('click', function () {
    hideElements(['.title', '#btnStart']);
    showElements(['.value-range', '.valueQuestion', '.form-inline', '#btnGo']);
})

document.getElementById('btnGo').addEventListener('click', function () {
    hideElements(['.value-range', '.valueQuestion', '.form-inline', '#btnGo']);
    showElements(['.terms', '.numberGuess', '#btnPlay']);

    minValue = parseInt(document.querySelector('#formMin').value);
    maxValue = parseInt(document.querySelector('#formMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
   
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue];
    }

    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    
    numberGuess.innerText = `Ты загадываешь число от ${minValue} до ${maxValue}, я угадываю`;
})

document.getElementById('btnPlay').addEventListener('click', function () {
    hideElements(['.terms', '.numberGuess', '#btnPlay']);
    showElements(['.question', '.no-gutters', '#btnLess', '#btnEqual', '#btnOver', '.btn-link' ])

    let answerNumber = Math.floor((minValue + maxValue) / 2);
    let orderNumber = 1;
    let gameRun = true;

    const orderNumberField = document.getElementById('orderNumberField');
    const answerField = document.getElementById('answerField');

    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    function numberToText() {
        let number = Math.abs(answerNumber);
        let text = '';

        if (number == 0) {
            text = 'ноль';
            return text;
        }

        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }
        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }

        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }
        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    function numberToTextHundreds() {
        let unitsTeensDozens = Math.abs(answerNumber) % 100;

        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }

        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }

        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }

    orderNumberField.innerText = orderNumber;
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Ты загадал число ${numberToText()}?` : `Ты загадал число ${answerNumber}?` : numberToText().length < 20 ? `Ты загадал число минус ${numberToText()}?` : `Ты загадал число ${answerNumber}?`;

    document.getElementById('btnLess').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue || minValue == answerNumber) {
                const randomPhrase = Math.round(Math.random() * 2);
                switch (randomPhrase) {
                    case 0:
                        answerPhrase = `Так нечестно!`
                        break;
                    case 1:
                        answerPhrase = `Ты хитришь!`
                        break;
                    case 2:
                        answerPhrase = 'Здесь что-то не так'
                        break;
                }

                answerField.innerText = answerPhrase;
                gameRun = false;
            } 
            else {
                maxValue = answerNumber - 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const randomPhrase = Math.round(Math.random() * 3);
                switch (randomPhrase) {
                    case 1:
                        answerPhrase = `Возможно, ты загадал... `
                        break;

                    case 2:
                        answerPhrase = `Я думаю это... `
                        break;

                    case 3:
                        answerPhrase = `Кажется это...  `
                        break;

                }

                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Ты загадал число ${numberToText()}?` : `Ты загадал число ${answerNumber}?` : numberToText().length < 20 ? `Ты загадал число минус ${numberToText()}?` : `Ты загадал число ${answerNumber}?`;
            }
        }
    })
    document.getElementById('btnOver').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue) {
                const randomPhrase = Math.round(Math.random() * 2);
                switch (randomPhrase) {
                    case 0:
                        answerPhrase = `Так нечестно!`
                        break;

                    case 1:
                        answerPhrase = `Ты хитришь!`
                        break;

                    case 2:
                        answerPhrase = 'Так дело не пойдет!'
                        break;
                }

                answerField.innerText = answerPhrase;
                gameRun = false;
            } 
            
            else {
                minValue = answerNumber + 1;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const randomPhrase = Math.round(Math.random() * 3);
                switch (randomPhrase) {
                    case 0:
                        answerPhrase = `Это число `
                        break;

                    case 1:
                        answerPhrase = `Мне кажется, это `
                        break;

                    case 2:
                        answerPhrase = `Я знаю, это `
                        break;

                    case 3:
                        answerPhrase = `Пуская будет `
                        break;

                }
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Ты загадал число ${numberToText()}?` : `Ты загадал число ${answerNumber}?` : numberToText().length < 20 ? `Ты загадал число минус ${numberToText()}?` : `Ты загадал число ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnEqual').addEventListener('click', function () {
        if (gameRun) {
            const randomPhrase = Math.round(Math.random() * 3);
            switch (randomPhrase) {
                case 0:
                    answerPhrase = `Я всегда угадываю`
                    break;

                case 1:
                    answerPhrase = `Всегда на высоте`
                    break;

                case 2:
                    answerPhrase = `Обращайся`
                    break;

                case 3:
                    answerPhrase = `Я же говорил`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
    })
})

function toggleElements(classNames) {
    classNames.forEach((className =>{
        document.querySelector(className).classList.toggle('hidden');
    }))
}
document.getElementById('btnRetry').addEventListener('click', function () {
    toggleElements(['.question', '.value-range','.no-gutters','.valueQuestion', '.form-inline', '#btnLess', '#btnEqual', '#btnOver', '.btn-link', '#btnGo']);
    
    document.querySelector('#formMin').value = '';
    document.querySelector('#formMax').value = '';

    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue];
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    numberGuess.innerText = `Загадай любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

    document.getElementById('btnGo').addEventListener('click', function () {
        hideElements(['.value-range','.valueQuestion','.form-inline', '#btnGo']);
        showElements(['.terms', '.numberGuess']);
    })
})

