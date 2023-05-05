// const FuzzySet = require('fuzzyset')
// to circumvent calling 'document.getElementById('id');' a million times
function ID(elementId) {
    return document.getElementById(elementId);
};

// Tracks what puzzle the user is on
let currentPuzzle = 1;
// array with the questions
let questions = new Array(4);
questions[0] = "A father and son have a car accident and are both badly hurt. They are both taken to separate hospitals. When the boy is taken in for an operation, the surgeon (doctor) says 'I can not do the surgery because this is my son'. \n How is this possible?";
questions[1] = "A classic greek riddle: \nWhat goes on four legs in the morning, \ntwo legs in the afternoon, and \nthree legs in the evening?";
questions[2] = "What always runs but never walks. \nOften murmurs, never talks. \nHas a bed but never sleeps. \nAn open mouth that never eats. \nWhat is it?";
questions[3] = "I'm a thief that cannot be caught, \nStealing moments that cannot be bought. \nI'm the reason for the rising sun, \nAnd the setting of the day when it's done. \nWhat am I?"
// Correct answers nested array
let solutions = new Array(4);
solutions[0] = new Array("mom", "mother", "mum");
solutions[1] = new Array("human", "person", "man");
solutions[2] = new Array("river", "stream");
solutions[3] = new Array("time")
// The full explanations for the user
let explanations = new Array(4);
explanations[0] = "The answer is the <b>Mother:</b><hr>"
					+ "The difficulty in this riddle was that for some non-english speakers (like german and luxembourgish people), there is a masculine and feminine form of doctor.<br>"
					+ "And the masculine form sounds very close to 'doctor'. So it is easy to assume that the doctor has to be masculine."
explanations[1] = "The answer is a <b>Human:</b><hr>"
					+ "In this riddle the time of the day is a metaphor for the stages of life in a human. In greek myth, a sphinx asked Oedipus this riddle.<br>"
                    + "He answered the riddle correctly: 'The answer is `man`. A man crawls on all fours in the morning of his life, he walks on two feet in the midday of his life, and he uses a cane for extra support when he is old.'<hr>"
                    + "Note that, while inspired from it, the greek sphinx is not the same as the egyptian sphinx."
explanations[2] = "The answer to the riddle is a <b>River:</b><hr>"
                    + "<i>What always runs but never walks.</i>: A river is constantly flowing, or running, but it never walks since it is a body of water.<hr>"
                    + "<i>Often murmurs, never talks</i>: The sound of a river is often described as a murmur, as it makes a continuous low, soft sound."
                    + "However, a river doesn't talk because it doesn't have a voice or the ability to communicate.<hr>"
                    + "<i>Has a bed but never sleeps</i>: A river has a bed, which is the channel it flows through. However, a river doesn't sleep because it's always flowing.<hr>"
                    + "<i>An open mouth that never eats	</i>: A river has a mouth, which is the place where it empties into a larger body of water, such as a lake or ocean."
                    + "This mouth is typically wide open, but a river never eats because it's not alive and doesn't have a digestive system.<hr>"
explanations[3] = "The answer is <b>Time:</b><hr>"
                    + "<i>I'm a thief that cannot be caught</i>: This line suggests that the answer is something that takes something away, but is not tangible.<hr>"
                    + "<i>Stealing moments that cannot be bought</i>: Since it is impossible to regain lost time.<hr>"
                    + "<i>I'm the reason for the rising sun</i>: This line suggests that the answer is something that is closely related to the passage of time, and specifically to the cycle of day and night.\n<hr>"
                    + "<i>And the setting of the day when it's done</i>: This line completes the previous line and reinforces the idea that the answer is related to the passage of time and the cycle of day and night.<hr>"


// save the users answers
let answers = new Array(4).fill(null);
// set timer in seconds (required for the contdown timer)
// let timeLeft = 300;
// let countdownTimer;

// save user information
// let email = "None";
let prolificId = "None";
let userTime;
let userScore;

// use FuzzySet to account for missspelling of the words
// let solutions_fuzzy = new Array(5);
// solutions_fuzzy[0] = solutions[0].map(answer => FuzzySet([answer]));
// solutions_fuzzy[1] = solutions[1].map(answer => FuzzySet([answer]));
// solutions_fuzzy[2] = solutions[2].map(answer => FuzzySet([answer]));



// Hides the initial view on button click and displays the puzzle view.
function startPuzzle() {
	if (ID("prolificID").value != "") {
		prolificId = ID("prolificID").value;
	}
	initial.style.display = 'none';
    puzzle.style.display = 'block';
    updatePuzzle(currentPuzzle);
	userTime = new Date().getTime();
}

// changes the view based on the puzzle number.
function updatePuzzle(currentPuzzle) {
	switch (currentPuzzle) {
		case 1:
			ID("puzzle-number").innerText  = 'Let\'s start with a translation problem.\n Puzzle 1/4:';
			ID("puzzle-img").src = './data/hospital.png';
			ID("puzzle-text").innerText = questions[0];
			ID("answer").value = answers[currentPuzzle]
			ID("next-btn").style.display = 'none';
			ID("hidden-solution").style.display = 'none';
			ID("user-input").style.display = "block"
			ID("submit-btn").style.display = 'inline-block';
			break;
		case 2:
			ID("puzzle-number").innerText = 'El classico.\n Puzzle 2/4:';
			ID("puzzle-img").src = './data/sphinx.png';
			ID("puzzle-text").innerText = questions[1];
			ID("next-btn").style.display = 'none';
			ID("hidden-solution").style.display = 'none';
			ID("user-input").style.display = "block"
			ID("submit-btn").style.display = 'inline-block';
			break;
		case 3:
			ID("puzzle-number").innerText  = 'A bit more difficult.\n Puzzle 3/4:';
			ID("puzzle-img").src = './data/nguruvilu.png';
			ID("puzzle-text").innerText = questions[2];
			ID("next-btn").style.display = 'none';
			ID("hidden-solution").style.display = 'none';
			ID("user-input").style.display = "block"
			ID("submit-btn").style.display = 'inline-block';
			break;
		case 4:
			ID("puzzle-number").innerText  = 'Almost there.\n Puzzle 4/4:';
			ID("puzzle-img").src = './data/fox_thief.png';
			ID("puzzle-text").innerText = questions[3];
			ID("next-btn").style.display = 'none';
			ID("hidden-solution").style.display = 'none';
			ID("user-input").style.display = "block"
			ID("submit-btn").style.display = 'inline-block';
			break;
		default:
			break;
	}
}

// Checks if there is a next puzzle then calls saveSolution and updatePuzzle
function goNext() {
	if (currentPuzzle < 5) {
		currentPuzzle++;
		updatePuzzle(currentPuzzle);
	}
}

// Submit user answer, reveal solution, hide 'submit' button and reveal 'next' button
function submitAnswer() {
	answers[currentPuzzle - 1] = ID("answer").value;
	ID("hidden-solution").style.display = 'block';
	ID("puzzle-solution").innerHTML = explanations[currentPuzzle - 1];
	ID("submit-btn").style.display = "none";
	ID("next-btn").style.display = "inline-block"
	ID("user-input").style.display = "none"
	if (currentPuzzle == 4) {
		let endTime = new Date().getTime();
		let timeSpent = endTime - userTime;
		// miliseconds to seconds
		userTime = timeSpent / 1000;
		ID("finish-btn").style.display = 'inline-block';
		ID("next-btn").style.display = "none";
	}
}

// Checks how many of the answers are correct. (Sample implementation: 1 is always correct.) returns the number of correct answers as anm integer
function evaluateScore() {
	let score = 0;
	for (let i = 0; i < solutions.length; i++) {
		let answer_prep = prepare_answer(answers[i]);
		for (let j = 0; j < answer_prep.length; j++) {
			for (let m = 0; m < solutions[i].length; m++) {
				console.log("Check if answer_prep[j]" + answer_prep[j] + " == " + solutions[i][m]);
				if (answer_prep[j] == solutions[i][m]) {
					score++;
				}
			}
		}
	}
	return score;
	
}

//takes user score and reacts to it
function scoreReaction(userScore) {
	switch (userScore) {
		case 1:
			ID("modal-score").innerHTML = "<b>Result:</b> " + userScore.toString() + "/4. Could be better.";
			ID("modal-score").style.color = "#861407";
			break;
		case 2:
			ID("modal-score").innerHTML = "<b>Result:</b> " + userScore.toString() + "/4. You are getting there.";
			ID("modal-score").style.color = "#8cc9f0";
			break;
		case 3:
			ID("modal-score").innerHTML = "<b>Result:</b> " + userScore.toString() + "/4. Pretty Good.";
			ID("modal-score").style.color = "#04620b";
			break;
		case 4:
			ID("modal-score").innerHTML = "<b>Result:</b> " + userScore.toString() + "/4. Perfect. Good job!";
			ID("modal-score").style.color = "#04620b";
			break;
		default:
			ID("modal-score").innerHTML = "<b>Result:</b> " + userScore.toString() + "/4. Were you even trying?";
			ID("modal-score").style.color = "#861407";
			break;
	}
}

// split the user input into a list of words that were seperated by a space and put everything to lowercase
function prepare_answer(answer) {
	if (answer == null) {	
		return new Array()
	}
	console.log(answer)
	let prep = answer.toLowerCase();
	let prep_array = prep.split(" ");
	return prep_array
}


function emailPromt() {
	userScore = evaluateScore();
	scoreReaction(userScore);
	const modal = ID('email-prompt');
	modal.showModal();
}

function refuseEmail() {
	window.location.href = 'https://forms.gle/zn7w5S56PpZigtqo8';
	submitToFormspree("None-Refused");
}

// sets up the second part of the email promt modal
function modalEmailInput() {
	ID("modal-phase2").style.display = "block";
 	ID("modal-phase1").style.display = "none";
}

function submitEmail() {
	let email = ID("email").value;
	if (email == "") {
		email = "Empty-Submission";
	} else {
		email = "Submitted";
	}
	window.location.href = 'https://forms.gle/zn7w5S56PpZigtqo8';
	submitToFormspree(email);
}

function cancelEmail() {
	window.location.href = 'https://forms.gle/zn7w5S56PpZigtqo8';
	submitToFormspree("None-Canceled");
}


// Takes a string with the users email and submits it to Formspree.io 
function submitToFormspree(email) {
	// Define the form data as an object
	let formData = {
		prolific_Id: prolificId,
		email_address: email,
		correct_answers_nbr: userScore,
		time_spend: userTime
	};

	// Make an HTTP POST request to the Formspree endpoint
	fetch("https://formspree.io/xknayqpb", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(formData)
	})
	.then(response => {
		if (response.ok) {
			console.log("Form submitted successfully!");
		} else {
			console.error("Form submission failed:", response.status);
		}
	})
	.catch(error => {
		console.error("Form submission failed:", error);
	});
}