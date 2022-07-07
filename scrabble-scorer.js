// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  0: [' '],
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// let newPointStructure = {
//   // A: 1,
//   // B: 3,
//   // C: 3,
//   // D: 2,
//   // E: 1,
//   // F: 4,
//   // G: 2,
//   // H: 4,
//   // I: 1,
//   // J: 8,
//   // K: 5,
//   // L: 1,
//   // M: 3,
//   // N: 1,
//   // O: 1,
//   // P: 3,
//   // Q: 10,
//   // R: 1,
//   // S: 1, 
//   // T: 1,
//   // U: 1,
//   // V: 4,
//   // W: 4,
//   // X: 8,
//   // Y: 4,
//   // Z: 10
// } 

function newScrabbleScorerFunction(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (const letter of word) {
    letterPoints += newPointStructure[letter];
  }
  return letterPoints;
}



function oldScrabbleScorerFunction(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!");
  console.log('')
  let wordToScore = input.question('Please enter a word to score! ');
  // let result = oldScrabbleScorerFunction(wordToScore);
  // console.log(result);
  return wordToScore;
};

function simpleScoreFunction(word) {
  scoring = word.replace(' ', '').length;
  return scoring;
}

function vowelBonusScoreFunction(word) {
  let totalScore = 0;
  let vowelArr = ['a', 'e', 'i', 'o', 'u']
  for (let i = 0; i < word.length; i++) {
   let currentLetter = word[i];
    if (vowelArr.includes(currentLetter)) {
      totalScore += 3;
    }
    else if (currentLetter != ' ') {
      totalScore += 1;
    }
  } 
  return totalScore;
}

// console.log(vowelBonusScore('Floof'));

let scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: newScrabbleScorerFunction
}

let vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScoreFunction
}

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScoreFunction
}

const scoringAlgorithms = [
  simpleScore,
  vowelBonusScore,
  scrabbleScore
];

function scorerPrompt(word) {
  let selectObject = input.question('Which scoring algorithm would you like to use? \n \n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points \n 2 - Scrabble: Uses scrabble point system \n Enter 0, 1, or 2: ');
  if (selectObject.trim() == '0') {
    console.log('algorithm name: ', scoringAlgorithms[0].name);
    console.log('scoringFunction result: ', scoringAlgorithms[0].scoringFunction(word));
  }
  else if (selectObject.trim() == '1') {
    console.log('algorithm name: ', scoringAlgorithms[1].name);
    console.log('scoringFunction result: ', scoringAlgorithms[1].scoringFunction(word));
  }
  else if (selectObject.trim() == '2') {
    console.log('algorithm name: ', scoringAlgorithms[2].name);
    console.log('scoringFunction result: ', scoringAlgorithms[2].scoringFunction(word));
  }
  else {
    console.log('Incorrect input, try again');
    scorerPrompt(word);
  }
}

function transform(pointStructure) {
  const newPointStructure = {
    
  };
  // Declaring an empty object 
  for (let key in pointStructure) {
    const letters = pointStructure[key];
    // this for loop is looping through our keys, I.E; 1, 2, 3 with arrays in them.
    for (const letter of letters) {
      newPointStructure[letter] = key;
      // this for loop is looping through the items in the array that our above for loop is returning and then assigning it to our new point structure object with the key it had before. 
    }
  }
  const letters = Object.keys(newPointStructure).sort();
  const sortedStructure = {
    
  };
  for (const letter of letters) {
    sortedStructure[letter] = parseInt(newPointStructure[letter]);
  }
  // this is a really weird way of alphabetizing our newPointStructure cause I didn't like it not sorted. 
  return sortedStructure;
}

let newPointStructure = transform(oldPointStructure);

// console.log(newPointStructure);

function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

