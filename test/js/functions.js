//javascript for guessNumber
var wins = 0;
var losses = 0;
var games = $("#games");

var randomNumber = Math.floor(Math.random() * 99) + 1;
//var guesses = document.querySelector('#guesses');
var guesses = $('#guesses');
//var lastResult = document.querySelector('#lastResult');
var lastResult = $('#lastResult');
//var lowOrHi = document.querySelector('#lowOrHi');
var lowOrHi = $('#lowOrHi');

//var guessSubmit = document.querySelector('.guessSubmit');
var guessSubmit = $('.guessSubmit')
//var guessField = document.querySelector('.guessField');
var guessField = $('.guessField')

var guessCount = 1;
//var resetButton = document.querySelector('#reset');
var resetButton = $('#reset');
//resetButton.style.display = 'none';
games.html("Games: " + (losses + wins) + " | Wins: " + wins + " | Losses: " + losses);
resetButton.css('display', 'none');
guessField.focus();

function checkGuess() {
    console.log(guessField.val());
    var userGuess = Number(guessField.val());

    if (userGuess > 99 || userGuess < 1 || isNaN(userGuess)) {
        console.log(userGuess);
        if (isNaN(userGuess)) {
            //lastResult.innerHTML = "Invalid input: not a number";
            lastResult.html("Invalid input: not a number");
        }
        else if (userGuess < 1) {
            //lastResult.innerHTML = "Invalid input: " + userGuess + " is below 1";
            lastResult.html("Invalid input: " + userGuess + " is below 1");
        }
        else {
            //lastResult.innerHTML = "Invalid input: " + userGuess + " is above 99";
            lastResult.html("Invalid input: " + userGuess + " is above 99");
        }

        //lastResult.style.background = 'yellow';
        lastResult.css('backgroundColor', 'yellow');
        //lowOrHi.innerHTML = "";
        lowOrHi.html("");
        //guessField.value = '';
        guessField.val("");
        guessField.focus();
    }
    else {

        if (guessCount === 1) {
            //guesses.innerHTML = 'Previous guesses: ';
            guesses.html('Previous guesses: ');
        }

        //guesses.innerHTML += userGuess + ' ';
        guesses.append((userGuess + " "));

        if (userGuess === randomNumber) {
            //lastResult.innerHTML = 'Congratulations! You got it Right!';
            lastResult.html('Congratulations! You got it Right!');
            //lastResult.style.background = 'green';
            lastResult.css('backgroundColor', 'green');
            //lowOrHi.innerHTML = '';
            lowOrHi.html('');
            wins++;
            setGameOver();
        }
        else if (guessCount === 7) {
            //lastResult.innerHTML = 'Sorry, you lost!';
            lastResult.html('Sorry, you lost!');
            losses++;
            setGameOver();
        }
        else {
            //lastResult.innerHTML = 'Wrong!';
            lastResult.html('Wrong!');
            //lastResult.style.backgroundColor = 'red';
            lastResult.css('backgroundColor', 'red');
            if (userGuess < randomNumber) {
                //lowOrHi.innerHTML = 'Last guess was too low!';
                lowOrHi.html('Last guess was too low!');
            }
            else if (userGuess > randomNumber) {
                //lowOrHi.innerHTML = 'Last guess was too high!';
                lowOrHi.html('last guess was too high!');
            }
        }

        guessCount++;
        //guessField.value = ' ';
        guessField.val(" ");
        guessField.focus();
    }

}

//guessSubmit.addEventListener('click', checkGuess);
guessSubmit.on('click', checkGuess);


function setGameOver() {
    games.html("Games: " + (losses + wins) + " | Wins: " + wins + " | Losses: " + losses);
    //guessField.disabled = true;
    guessField.attr('disabled', true);
    //guessSubmit.disabled = true;
    guessSubmit.attr('disabled', true);
    //resetButton.style.display = 'inline';
    resetButton.css('display', 'inline');
    //resetButton.addEventListener('click', resetGame);
    resetButton.on('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');

    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    //resetButton.style.display = 'none';
    resetButton.css('display', 'none');

    //guessField.disabled = false;
    guessField.attr('disabled', false);
    guessSubmit.attr('disabled', false);
    //guessField.value = '';
    guessField.val("");
    guessField.focus();
    games.html("Games: " + (losses + wins) + " | Wins: " + wins + " | Losses: " + losses);

    //lastResult.style.backgroundColor = 'white';
    lastResult.attr('backgroundColor', 'white');

    randomNumber = Math.floor(Math.random() * 99) + 1;
}

//document.getElementById('numberToGuess').innerHTML = randomNumber;
//console.log(randomNumber);