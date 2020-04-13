// app.js written by Jacob Schwartz
/*

const car = {
	model: 'Fiesta'
}

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
const startHeader = document.getElementById("startHeader");
const playerCountPage = document.getElementById("playerCountPage");
const start = document.getElementById("start");
const warnHeader = document.getElementById("warn");
const game = document.getElementById("game");
const row = document.getElementsByClassName("row");
var newRoundBtn = document.getElementById("newRoundBtn")


// CURRENT GAME ARRAY
var joker;

var playerCount;
var hasStarted = false;

// Opening Function, will run on load
function welcome() {
	console.log("Welcome");
	game.style.display = "none";
	playerCountPage.style.display = "none";

	if (window.localStorage.length == 0) {
		welcomeHeader.innerHTML = "Welcome, ";
		loadHeader.style.display = "none";
	} else {
		loadHeader.style.display = "inline";
	}
}

startHeader.addEventListener("click", startBtn);
var btnCounter=1;
function startBtn() {
	var newRoundBtnHTML = `<h4 id="newRoundBtn" onclick="newRound();">New Round</h4>`;
	if (btnCounter == 1) {
		confirm();
	} else if (btnCounter == 2) {
		nameEntry();
	} else if (btnCounter == 3) {
		playerCountPage.style.display = "none";
		game.style.display = "block";
		joker = jason();
		game.innerHTML = showNames();
		game.insertAdjacentHTML("afterend", newRoundBtnHTML)
	} else {
		// err ctrl
		alert("internal error")
		location.reload();
	}
}

// '+(i+1)+'
function confirm() {   
	var x = '';
	playerCount = document.getElementById("input").value;
	playerCount = parseInt(playerCount);

	if (isNaN(playerCount)){
		alert("Please enter a valid number");
	} else if ((playerCount < 2 ) || (playerCount > 9)) {
		alert("Please enter a number between 2-9");
	} else {

		for (let i = 0; i < playerCount; i++) {
			x += '<input class="nameInput" id="player'+(i+1)+'" type="text" placeholder="Player '+(i+1)+'" style="display: inline;"><br>'
		}
		x += '<br>'
		x += '<h2 id="startHeader" class="headerBtn" onclick="startBtn()" style="display: inline;">Start</h2>'
		playerCountPage.innerHTML = x;    
		btnCounter++;
	}
}

// name entry
var names = [];
var gameName = "";

// make function called next and call nameEntry and others
function nameEntry() {
	var allGood = [];

	for (let i = 0; i <playerCount; i++){
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

	/*
	#TODO FIX
	if (hasDuplicates(allGood)) {
		document.getElementById("extra").innerHTML = 'Warning, there are duplicate names!';
	}
	*/
	if (Object.values(allGood).every(item => item === true)){
		gameName = gameName.slice(0, -1); // Removes the final -
		btnCounter++
	}
}

// #TODO FIX
function hasDuplicates(array) {
	return (new Set(array)).size !== array.length;
}

newHeader.addEventListener("click", newGame);
function newGame() {
	welcomeHeader.style.display = "none";
	newHeader.style.display = "none";
	playerCountPage.style.display = "inline";
	// once Start is press change text to confirm then go
}    

function loadGame() {
	// Object.entries(localStorage) // to see all the keys
}

function jason() {
	var obj = {
		name: gameName, 
		lastPlayed: getDate(),
		roundCount: 0,
		playerCount: playerCount,
		player: names,
		round1: {}
	};
	
	return obj
}

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

function newRound() {
	var z = `<div class="row">`;
	joker.roundCount++
	/* 
	create a mini array for each round maybe and then run showGame again
	*/
	for (let i = 0; i < joker.playerCount; i++) {
		var id = joker.player[i].toLowerCase();
		id += joker.roundCount;
		var inputId = id+'input';
		var color;
		if (i % 2 == 0) {
			// even
			color = `#cfcfcf`;
		}else {
			// odd
			color = `#e8e8e8`;
		}
		z += `<div class="column" id="${id}" style="background-color:${color};"><input class="scoreInput" id="${id+'input'}" type="text" pattern="[0-9]*" inputmode="numeric"> <span onclick="inputConfirm(${id})" id="${id+'i'}">&#10003;</span></input></div>`
	//pattern="[0-9]*"
	}
	z += `</div>`;
	game.insertAdjacentHTML("beforeend", z);
	newRoundBtn = document.getElementById("newRoundBtn");
	newRoundBtn.style.display = "none";

}

function inputConfirm(id) {
	var spesh = id;
	var txt = document.getElementById(spesh);
	var inputScore = document.getElementById(spesh+"nput");
	var score = inputScore.value;
	var collum = spesh.slice(0, -1); // Removes the final 'i'
	collum = document.getElementById(collum);
	collum.innerHTML = score;
	inputScore.style.display = "none";
	txt.style.display = "none";
}

function getDate() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	return today;
}

/*
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
	var regex = /[0-9]|\./;
	if( !regex.test(key) ) {
	  theEvent.returnValue = false;
	  if(theEvent.preventDefault) theEvent.preventDefault();
	}
  }
*/