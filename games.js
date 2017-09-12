
    function playGame() {

        var guessesRemaining = 12;
        var lettersGuessed = [];
        var points = 0;
        var wins = 0;
        var losses = 0;
        var correctGuesses = []
        var keyOptions = ["a", "b", "c", "d", "e", "f", "g",
            "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
            "u", "v", "w", "x", "y", "z"
        ];
            playWord();
        function playWord() {
            

            var words = ["jordan", "kobe", "magic", "wade", "lebron", "shaq", "iverson", "mcgrady", "durant", ];
            var computerChoice = words[(Math.floor(Math.random() * (9)))]; //Math.floor(Math.random() * (max - min + 1)) + min
            var currentWordArray = computerChoice.split("");
            console.log(currentWordArray);

            var letterSpace = new Array(currentWordArray.length);
            console.log(letterSpace.length);
            var letterPosition = -1;


            function endGame() {
                
                clearCurrentWord();
                guessesRemaining = 12;
                lettersGuessed = [];
                points = 0;
                losses++
                correctGuesses = []
                setTimeout(alert("you lose"), 500); 
                alert("play again");
                playWord();


            }

            function nextRound() {
                setTimeout(clearCurrentWord, 1350);
                guessesRemaining = 12;
                lettersGuessed = [];
                points = 0;

            }

            function clearCurrentWord() {
                for (var i = 0; i < letterSpace.length; i++) {

                    var item = document.getElementById("position" + i);
                    item.parentNode.removeChild(item);
                }
            }

            

            function blankSpaces() {
                for (var i = 0; i < letterSpace.length; i++) {
                    letterPosition++;
                    letterSpace[i] = "__"
                    var node = document.createElement("span");
                    node.setAttribute("id", "position" + letterPosition)
                    var textnode = document.createTextNode(letterSpace[i]);
                    node.appendChild(textnode);
                    document.getElementById('wordSpace').appendChild(node);
                }
            }

            setTimeout(blankSpaces, 1351);


            document.onkeyup = function(event) {
                var userChoice = event.key.toLowerCase();
                //prevents user from choosing anything besides a letter.
                if (keyOptions.indexOf(userChoice) === -1) {
                    alert("letters only please");
                } else if (correctGuesses.indexOf(userChoice) > -1) {

                    alert("You got that already, genius!!");
                }

                //if user chooses a correct letter that letter appears in the appropriate position. adds a point. 
                else if (currentWordArray.indexOf(userChoice) > -1) {
                    correctGuesses.push(userChoice);
                    console.log(correctGuesses);
                    points++;
                    document.getElementById("position" + currentWordArray.indexOf(userChoice)).innerHTML = event.key;

                    //if user chooses incorrectly the letter is placed in the lettersGuessed array and the user loses one guess.
                } else if (lettersGuessed.indexOf(userChoice) === -1) {
                    lettersGuessed.push(userChoice);
                    guessesRemaining--;

                } 



                //point systsem helped me determine a "win". Each correct letter is worth one point. To win you must earn all possible points in a given word. This also replenishes the users guesses and clears the correct guesses array to make room for the new word. 
                if (points === letterSpace.length) {
                    correctGuesses = [];
                    wins++
                    nextRound();
                    playWord();
                }
                //This alerts the user that they have lost the game. User failed to earn all possible points in within alloted # of guesses.
                if (guessesRemaining === 0) {
                    endGame();                    
                    console.log("losses" + losses);
                }


                //fills the div with id = "stats". 
                var html =
                    "<p>Guesses Remaining: " + guessesRemaining + "</p>" +
                    "<p> Letters Guessed: " + lettersGuessed +
                    "<p>wins: " + wins + "</p>" +
                    "<p>losses: " + losses + "</p>";
                document.getElementById("stats").innerHTML = html;


            }
        }
    };
    playGame();
    