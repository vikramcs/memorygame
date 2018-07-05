// Variables.
const cards = Array.from(document.getElementsByClassName('card'));
const deck = document.querySelector('.deck');
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
const movesCounter = document.querySelector('.moves');
const stars = Array.from(document.getElementsByClassName('fa-star'));
const totalTime = document.querySelector(".time");
const htmlSec = document.querySelector('.pSec');
const htmlMin = document.querySelector('.pMin');
let moves = 0;
let opened = [];
let matchedTotal = [];
let sec = 0;
let min = 0;
let interval;

const start = function() {

    // Shuffles cards and displays on board.
    const shuffling = function() {
        const shuffled = shuffle(cards);
        for (let i = 0; i < shuffled.length; i++) {
            [].forEach.call(shuffled, function(item) {
                deck.appendChild(item);
            });
        }
    }

    // Function created to disable clicking when cards are temporary shown.
    const disabled = function() {
        deck.style.pointerEvents = 'none';
    };

    // Function to reenable pointer events when the cards 'flip back'.
    const enabled = function() {
        deck.style.pointerEvents = 'auto';
    };

    // Function that runs if both cards have same type. Removed open and show classes, adds match class and empties opened array.
    const matched = function() {
        opened[0].classList.add('match');
        opened[1].classList.add('match');
        opened[0].classList.remove('open', 'show');
        opened[1].classList.remove('open', 'show');
        matchedTotal.push(this);
        opened = [];
    };

    // Function to remove the open and show classes and places them face down again.
    const remove = function() {
        disabled();
        // Timeout setup for .900 second to display cards and then turn them back over.
        setTimeout(() => {
            opened[0].classList.remove('open', 'show');
            opened[1].classList.remove('open', 'show');
            enabled();
            opened = [];
        }, 900);
    };


    // Function to give clicked card open and show classes, indicating flipped.
    const flipped = function() {
        this.classList.add('open');
        this.classList.add('show');
        opened.push(this);
        match();
        if (matchedTotal.length === 8) {
            stahp();
            winnerWinnerChickenDinner();
            rating();
        }
    };

    // For loop to run flipped() for every card clicked.
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', flipped);
    };

    // Function that sees what is placed within the opened array. If two cards are clicked, they are compared and either matched() or remove() is ran.
    const match = function() {
        if (opened.length === 2) {
            if (opened[0].type === opened[1].type) {
                matched();
                movesFunction();
            } else {
                remove();
                movesFunction();
            }
        }
    };

    // Function counting moves made.
    const movesFunction = function() {
        moves++;
        movesCounter.innerHTML = moves;
        starPop();
        if (moves === 1) {
            timer();
        }
    };

    // Stars counter
    const starPop = function() {
        if (moves > 10 && moves < 20){
            for(let i = 0; i < 3; i++) {
                if (i > 1) {
                    stars[i].style.display = "none";
                }
            }
        } else if (moves >= 20) {
            for(let i = 0; i < 3; i++){
                if (i > 0) {
                    stars[i].style.display = "none";
                }
            }
        }
    };

    // Star counter on modal
    const rating = function() {
        var starRating = document.querySelector(".stars").innerHTML;
        document.querySelector('.starRating').innerHTML = starRating;
    };

    // Congrats!!
    const winnerWinnerChickenDinner = function() {
        document.querySelector('.winnerMoves').innerHTML = 'It only took you ' + moves + ' moves!';
        modal.style.display = 'block';
    };

    // Closes modal when x is clicked.
    const closeModal = function() {
        modal.style.display = 'none';
    };

    // Closes modal when clicked outside.
    document.onclick = function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Timer function and variables
    function timer(){
        interval = setInterval(function(){
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            totalTime.innerHTML = min + ' minutes ' + sec + ' seconds';
            htmlSec.innerHTML = sec;
            htmlMin.innerHTML = min;
        }, 1000);
    };

    // Stop Timer function
    const stahp = function() {
        clearInterval(interval);
    };

    shuffling();

};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// Restart game, reloads page. Executed by clicking restart button on page (function attached to restart div and winning modal).
const restart = function() {
    location.reload();
};