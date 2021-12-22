const gameContainer = document.getElementById('game');

const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// setting default background color for each newDiv
		newDiv.style.backgroundColor = 'cyan';

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// seclecting main div content.
const div = document.querySelector('div');

// selecting all children of the main div content.
const children = div.children;

// setting first and second card variables
let firstCard, secondCard;

// setting variable to track whether or not a card is clicked.
let isClicked = false;

// setting variable to revert cards back to default color if their color class does not match.
let disableClick = false;

let lockBoard = false;

// TODO: Implement this function!
function handleCardClick(event) {
	// setting count of class list to be the length +1 (resolved issue with cards starting at 0 whenclicked)
	let count = document.querySelectorAll('div .flip').length + 1;

	// you can use event.target to see which element was clicked
	// console.log('you just clicked', event.target);

	// changing backgroundColor of each card to the clicked card's class
	event.target.style.backgroundColor = event.target.className;

	// adding the 'flip' class to identify if a card has been flipped or not.
	event.target.classList.add('flip');

	if (!isClicked) {
		// identifying first card that is clicked.
		isClicked = true;
		firstCard = this;
	} else {
		// identifying the second card that is clicked.
		isClicked = false;
		secondCard = this;
		// setting lockBoard to true for second card in the event that the color class does not match so that the cards are allowed to reset.
		lockBoard = true;
	}
	// if the length of the count NodeList is less than 2 (cards clicked), background colors will be returned.
	if (count < 2) {
		return;
	}

	// if the count of the cards is exactly 2 AND first/second cards, first list item match, remove the class 'flip' (match)
	if (count === 2 && firstCard.classList[0] === secondCard.classList[0]) {
		function pair() {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
		}
		return pair();
	} else {
		// otherwise turn off the click on the cards and run resetCards function which will flip cards back over and set the background color to cyan.
		disableClick = true;
		function resetCards() {
			firstCard.classList.remove('flip');
			secondCard.classList.remove('flip');
			firstCard.style.backgroundColor = 'cyan';
			secondCard.style.backgroundColor = 'cyan';
			disableClick = false;

			if (lockBoard) {
				return;
			}
		}
		setTimeout(resetCards, 1000);
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
