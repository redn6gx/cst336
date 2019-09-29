// Your JavaScript goes here
            // var randomNumber = 5 + 6;
            // console.log(randomNumber);
            
            var invalidInput = document.querySelector('#invalidInput');
            var gamesWon = 0;
            var gamesLost = 0;
            
            
            var randomNumber = Math.floor(Math.random() * 99) + 1;
            var guesses = document.querySelector('#guesses');
            var lastResult = document.querySelector('#lastResult');
            var lowOrHi = document.querySelector('#lowOrHi');
            
            var guessSubmit = document.querySelector('.guessSubmit');
            var guessField = document.querySelector('.guessField');
            
            var guessCount = 1;
            var resetButton = document.querySelector('#reset');
            resetButton.style.display = 'none';
            
            guessField.focus();
            
            function checkGuess() {
                // alert('I am a placeholder');
                
                var userGuess = Number(guessField.value);
                if (guessCount === 1) {
                    guesses.innerHTML = 'Previous guesses: ';
                }
                if ((userGuess <= 99) && (isNaN(userGuess)==false)) {
                    guesses.innerHTML += userGuess + ' ';
                }
                
                if (userGuess === randomNumber) {
                    lastResult.innerHTML = 'Congratulations! You got it right!';
                    lastResult.style.backgroundColor = 'green';
                    lowOrHi.innerHTML = '';
                    
                    gamesWon++;
                    
                    setGameOver();
                }
                else if (guessCount === 7) {
                    lastResult.innerHTML = 'Sorry you lost!';
                   
                    gamesLost++;
                    
                    setGameOver();
                }
                else {
                    lastResult.innerHTML = 'Wrong!';
                    lastResult.style.backgroundColor = 'red';
                    if(userGuess < randomNumber) {
                        lowOrHi.innerHTML = 'Last guess was too low!';
                    }
                    else if(userGuess > randomNumber) {
                        lowOrHi.innerHTML = 'Last guess was too high!';
                    }
                }
                
                if (userGuess > 99) {
                    invalidInput.innerHTML = 'Your entered a number higher than 99!';
                    return;
                }
                    else {
                        invalidInput.innerHTML = '';
                    }
                if (isNaN(userGuess)) {
                    invalidInput.innerHTML = 'You did not enter a number';
                    return;
                }
                    else {
                        invalidInput.innerHTML = '';
                    }
                    
                guessCount++;
                guessField.value = '';
                guessField.focus();
            }
            
            guessSubmit.addEventListener('click',checkGuess);
            
            function setGameOver(){
                gamesWon.innerHTML=("Games Won: " + gamesWon);
                gamesLost.innerHTML=( "Games Lost:" + gamesLost);
                
                guessField.disabled = true;
                guessSubmit.disabled = true;
                resetButton.style.display = 'inline';
                resetButton.addEventListener('click',resetGame);
            }
            
            function resetGame() {
                guessCount = 1;
            
            
            var resetParas = document.querySelectorAll('.resultParas p');
            for (var i = 0; i < resetParas.length; i++) {
                resetParas[i].textContent = '';
            }
            
            resetButton.style.display = 'none';
            
            guessField.disabled = false;
            guessSubmit.disabled = false;
            guessField.value = '';
            guessField.focus();
            
            lastResult.style.backgroundColor = 'white';
            
            randomNumber = Math.floor(Math.random() * 99) + 1;
        }
            
            // console.log(randomNumber);
            // document.getElementById("numberToGuess").innerHTML = randomNumber;