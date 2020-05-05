// app.js written by Jacob Schwartz
/*

#TODO
create function to generate name -> display a list of games
with names of players followed by recently played date

#TODO2
add first row position sticky so names stay

*/

// global object

// DOM References
const newHeader = document.getElementById("newHeader");
const loadHeader = document.getElementById("loadHeader");
const welcomeHeader = document.getElementById("welcomeHeader");
const playerCountPage = document.getElementById("playerCountPage");
const start = document.getElementById("start");
const warnHeader = document.getElementById("warn");
const game = document.getElementById("game");
const row = document.getElementsByClassName("row");
const startHeader = document.getElementById("startHeader");

// CURRENT GAME OBJ
let joker;
// #TODO -> Create function with parameter for option of style.display and element, class or tag
// Opening Function, will run on load
window.addEventListener('load',() => {
    document.getElementsByTagName("h1")
	game.style.display = "none";
	playerCountPage.style.display = "none";
	if (window.localStorage.length == 0) {
		welcomeHeader.innerHTML = "Welcome, ";
		loadHeader.style.display = "none";
	} else {
		loadHeader.style.display = "inline";
	}
});

var btnCounter=1;

// Player Count Page
// '+(i+1)+'
let playerCount;
function confirm() {   
	var x = '';
	playerCount = document.getElementById("input").value;
	playerCount = parseInt(playerCount);

	if (isNaN(playerCount)){
		alert("Please enter a valid number");
	} else if ((playerCount < 2 ) || (playerCount > 7)) {
		alert("Please enter a number between 2-7");
	} else {
		for (let i = 0; i < playerCount; i++) {
			x += '<input class="nameInput" id="player'+(i+1)+'" type="text" placeholder="Player '+(i+1)+'" style="display: inline;"><br>'
		}
		x += '<br>';
        x += '<h2 id="startHeader" class="headerBtn" onclick="startBtn()" style="display: inline;">Start</h2>';
        playerCountPage.innerHTML = x;
        //start.insertAdjacentHTML("beforeend", '<h2 id="startHeader" class="headerBtn" style="display: inline;">Start</h2>');
        btnCounter++;
	}
}

// NAME ENTRY
var names = [];
var gameName = "";

function nameEntry() {
	var allGood = [];

	for (let i = 0; i < playerCount; i++){
		playerNum = document.getElementById("player"+(i+1));
		if ((playerNum.value) == "") {
			allGood[i] = false;
			playerNum.style.borderColor = "red";
		} else {
			allGood[i] = true;
			names[i] = playerNum.value;
			gameName += playerNum.value + "-"; 
			playerNum.style.borderColor = "green";
		}
	}	
	if ((hasDuplicates(names).length) > 0) {
		start.innerHTML += '<br> Please use unique names!';
	} else if (Object.values(allGood).every(item => item === true)){
		gameName = gameName.slice(0, -1); // Removes the final -
		btnCounter++
	} else {
		// err control, shouldn't happen though
	}
}

// #TODO FIX
// Duplicate Check
let hasDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)

// NEW GAME
newHeader.addEventListener("click", () => {
	welcomeHeader.style.display = "none";
	newHeader.style.display = "none";
	loadHeader.style.display = "none";
    playerCountPage.style.display = "inline";
    startHeader.addEventListener("click", startBtn);
	// once Start is press change text to confirm then go
});

// LOAD GAME
loadHeader.addEventListener("click", () =>{	
	// Object.entries(localStorage) // to see all the keys
});




function showNames() {
	var y = `<div class="row">`;
	for (let i = 0; i < joker.playerCount; i++) {
		var id = joker.player[i].toLowerCase();
		// Easter Egg Start
		if (id == "jana") {
			joker.player[i] += "🍌"
		}
		// EE End
		id += joker.roundCount;
		var color;
		if (i % 2 == 0) {
			// even
			color = "#cfcfcf";
		}else {
			// odd
			color ="#e8e8e8";
		}
		y += `<div class="column" id="${id}" style="background-color:${color};">${joker.player[i]}</div>`;
	}
	y += `</div>`
	return y;
}

var roundName;
var allClicked = 1;
var spans;
function newRound() {
    var z = `<div class="row">`;
	joker.roundCount++ // Round Count goes up
    joker["round"+joker.roundCount] = makeRound(); // Creating an object to put this rounds scores into
	for (let i = 0; i < joker.playerCount; i++) {
		var id = getId(i);
		var color;
		if (i % 2 == 0) {
			// even
			color = `#cfcfcf`;
		}else {
			// odd
			color = `#e8e8e8`;
		}
		z += `<div class="column" id="${id}" style="background-color:${color};"><input class="scoreInput" id="${id+'input'}" type="text" onkeypress='validate(event)' inputmode="numeric"> <span `/*onclick="inputConfirm(${id})" */+`>&#10003;</span></input></div>`;
		//pattern="[0-9]*"
	}
	z += `</div>`;
    game.insertAdjacentHTML("beforeend", z); // Injecting HTML Row

    // Adding Functionality to checkmarks
		for (let l = 0; l < joker.playerCount; l++) {
            spans = row[joker.roundCount].getElementsByTagName('span');
            
			spans[l].addEventListener('click', function () {
                var input = this.previousElementSibling;
                var onlyName = this.parentNode.id.replace(/[0-9]/g, '');
				if ((input.value == "") || (input.value == undefined)) {
					input.style.borderColor = "red";
				} else {
                input.style.display = "none";
                this.style.display = "none";

                if (joker.roundCount > 1) {
                    // after round 1
                    this.parentNode.innerText = joker.currentRound[onlyName];
                } else {
                    // round 1
                    this.parentNode.innerText = input.value;
                }
                
                // Last Clicked
				if (allClicked == joker.playerCount){
					newRoundBtn.style.display = "inline-block";
				} else {
					allClicked++;
					
				}
                // if not round 1 than add it onto
				// return score
			} // end of else 
			});
	}
	newRoundBtn = document.getElementById("newRoundBtn");
	newRoundBtn.style.display = "none";
	allClicked = 1;

    joker.lastPlayed = getDate(); // Update Last Played Date
    // roundName = "round"+joker.roundCount;
	// joker = addToObject(joker, roundName, makeRound(), 0);
}

// function inputConfirm(id) {
// }

const startBtn = () => {
	if (btnCounter == 1) {
		confirm();
	} else if (btnCounter == 2) {
        nameEntry();
	} else if (btnCounter == 3) {
		playerCountPage.style.display = "none";
		game.style.display = "block";
		joker = jason();
		game.innerHTML = showNames();
		game.insertAdjacentHTML("afterend", `<h4 id="newRoundBtn">New Round</h4>`)
        newRoundBtn.addEventListener("click", newRound);
        for (let i = 0; i < joker.playerCount; i++) {
			// T O D O	F I X 
			//joker.currentScorejoker.player[i]
            // push joker.currentScore equals 0 or scores, maybe make function
        }
	} else {
		// err ctrl
		alert("internal error")
		location.reload();
	}
}

// call this by appending it to round+roundCount
const makeRound = () => {
    var obj = {};
    for (let i = 0; i < joker.playerCount; i++) {
        obj[joker.player[i]] = 0;
    }
    return obj;
}

const jason = () => {
    var obj = {
        name: gameName, 
		lastPlayed: getDate(),
		roundCount: 0,
		playerCount: playerCount,
        player: names,
        currentScore: new Object()
    };
    for (let i = 0; i < obj.playerCount; i++) {
        // addToObject(obj.currentScore, obj.player[i], 0, 0);
       obj.currentScore[obj.player[i]] = 0;
    }
	return obj;
}

const getRoundCount = (offset) => {
    var roundCount = 'round';
    var off = (joker.roundCount) + offset;
    roundCount += off;
    return roundCount;
}

function getId(index) {
	var id = joker.player[index].toLowerCase();
	id += joker.roundCount;
	return id;
}

function getDate() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	return today;
}

function validate(evt) {
	var theEvent = evt || window.event;
  
	// Handle paste
	if (theEvent.type === 'paste') {
		key = event.clipboardData.getData('text/plain');
	} else {
	// Handle key press
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
	}
	var regex = /^[\d-]+$/;
	if( !regex.test(key) ) {
	  theEvent.returnValue = false;
	  if(theEvent.preventDefault) theEvent.preventDefault();
	}
}

var addToObject = function (obj, key, value, index) {

	// Create a temp object and index variable
	var temp = {};
	var i = 0;

	// Loop through the original object
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {

			// If the indexes match, add the new item
			if (i === index && key && value) {
				temp[key] = value;
			}

			// Add the current item in the loop to the temp obj
			temp[prop] = obj[prop];

			// Increase the count
			i++;

		}
	}

	// If no index, add to the end
	if (!index && key && value) {
		temp[key] = value;
	}

	return temp;

};