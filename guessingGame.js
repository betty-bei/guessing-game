(function() {

	/* **** Global Variables **** */

	var playersGuess,
	    winningNumber = generateWinningNumber(),
	    prevGuessesArray = [],
	    hintArray = generateHintArray(),
	    numOfGuesses = 5;


	/* **** Guessing Game Functions **** */

	// Generate the Winning Number
	function generateWinningNumber(){
		return Math.floor(Math.random()*100)+1;
	}

	function generateHintArray() {
		var hintArray = [];
		for (var i = 0; i < 5; i++) {
			hintArray.push(Math.floor(Math.random()*100)+1);
		}
		var randomIndex = Math.floor(Math.random()*5);
		hintArray[randomIndex] = winningNumber;
		return hintArray;
	}

	// Fetch the Players Guess
	function playersGuessSubmission(){
		playersGuess = +$('#inputGuess').val();
		$("#inputGuess").val("");
	}

	// Determine if the next guess should be a lower or higher number
	function lowerOrHigher(){
		if(playersGuess > winningNumber) {
			return "too high";
		}
		if (playersGuess < winningNumber) {
			return "too low";
		}
	}

	// Determine if the abs value of the distance b/t guess and winning number
	function guessDistance() {
		var difference = Math.abs(playersGuess-winningNumber);
		if (difference <=5) {
			return "within 5 digits of";
		}
		else if (difference <=10) {
			return "within 10 digits of";
		}
		else if (difference <=20) {
			return "within 20 digits of";
		}
		else {
			return "more than 20 digits away from"
		}
	}

	// Check if the Player's Guess is the winning number 
	function checkGuess(){
		if (playersGuess === winningNumber) {
			$('#box1').text("YOU WINNNNN!!!!!!!!!!!");
			$('#box2').text("Play Again?");
			$('body').css('background-image', 'url(https://media.giphy.com/media/120ErahsQyf1q8/giphy.gif)')
		}
		else {
			if(contains(prevGuessesArray, playersGuess)) {
				$('#box1').text(guessMessage());
				$('#box2').text("You already guessed that!")
			}
			else {
				if (numOfGuesses <= 1) {
					prevGuessesArray.push(playersGuess);
					$('#box1').text("You lost!!\nThe number was " + winningNumber + ".");
					$('#box2').text("Sorry :( Play Again?");
					$('#box3').text("Your previous guesses: " + prevGuessesArray);
					$('body').css('background-image', 'url(http://rs717.pbsrc.com/albums/ww173/prestonjjrtr/Weather/06.gif~c200)');
				}
				else {
					numOfGuesses--;
					prevGuessesArray.push(playersGuess);
					$('#box1').text(guessMessage());
					$('#box2').text(numOfGuesses + " guess(es) left.");
					$('#box3').text("Your previous guesses: " + prevGuessesArray);
				}
			}
		}
	}

	function guessMessage() {
		var direction = lowerOrHigher();
		var distance = guessDistance();
		return "Try Again. Your guess is " + direction + " and " + distance + " the winning number!";
	}

	// Create a provide hint button that provides additional clues to the "Player"
	function provideHint() {
		$('#box2').text("My number is one of the following: " + hintArray);
	}

	// Allow the "Player" to Play Again
	function playAgain(){
		winningNumber = generateWinningNumber();
		prevGuessesArray = [];
		hintArray = generateHintArray();
	    numOfGuesses = 5;
	    $('#box1').text('Play Again: the winning number is reset!');
		$('#box2').text('');
		$('#box3').text('');
		$('body').css('background-image', '');

	}


	function contains(array, val) {
		for (var i = 0; i < array.length; i++) {
			if(array[i] === val) {
				return true;
			}
		};
		return false;
	}

	/* **** Event Listeners/Handlers ****  */

	$(document).ready(function() {
		$('#submit').click(function() {
			playersGuessSubmission();
			checkGuess();
		});

		$('#inputGuess').keypress(function(event) {
			var key = event.which;
			if (key == 13) {
				playersGuessSubmission();
				checkGuess();
			}
		})

		$('#hint').click(function() {
			provideHint();
		})

		$('#playAgain').click(function() {
			playAgain();
		})
	});


}());