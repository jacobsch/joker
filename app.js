// app.js written by Jacob Schwartz
/*

#TODO
create function to generate name -> display a list of games
with names of players followed by recently played date

#TODO2
add first row position sticky so names stay

#TODO3 
finish converting DOM display changes to changeDisplay

*/

// DOM References
const newHeader = document.getElementById("newHeader");
const loadHeader = document.getElementById("loadHeader");
const welcomeHeader = document.getElementById("welcomeHeader");
const playerCountPage = document.getElementById("playerCountPage");
const start = document.getElementById("start");
const warnHeader = document.getElementById("warn");
const game = document.getElementById("game");
const startHeader = document.getElementById("startHeader");
const row = document.getElementsByClassName("row");

// CURRENT GAME OBJ
let joker;
// #TODO -> Create function with parameter for option of style.display and element, class or tag
// Opening Function, will run on load
window.addEventListener('load',() => {
	document.getElementsByTagName("h1")
	changeDisplay(game, "none");
	changeDisplay(playerCountPage, "none");
	if (window.localStorage.length == 0) {
		welcomeHeader.innerHTML = "Welcome, ";
		changeDisplay(loadHeader, "none");
	} else {
		changeDisplay(loadHeader, "inline");
	}
});

var btnCounter=1;

// Player Count Page
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
var gameKey = ""

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
			gameKey += playerNum.value + "-"; 
			playerNum.style.borderColor = "green";
		}
		if (i === (playerCount-1)){

		}
	}	
	if ((hasDuplicates(names).length) > 0) {
		start.innerHTML += '<br> Please use unique names!';
	} else if (Object.values(allGood).every(item => item === true)){
		gameKey = gameKey.slice(0, -1); // Removes the final -
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
	playerCountPage.style.display = "inline-block";
	startHeader.addEventListener("click", startBtn);
});

const startBtn = () => {
	if (btnCounter == 1) {
		confirm();
	} else if (btnCounter == 2) {
		nameEntry();
	} else if (btnCounter == 3) {
		playerCountPage.style.display = "none";
		game.style.display = "block";
		joker = jason();
		//window.GLOBAL_CONSTANT = jason(); // global game obj
		game.innerHTML = showNames();
		game.insertAdjacentHTML("afterend", `<h4 id="newRoundBtn">New Round</h4>`)
		newRoundBtn.addEventListener("click", newRound);
		saveGame();
	} else {
		// err ctrl
		alert("internal error")
		location.reload();
	}
}

// LOAD GAME
loadHeader.addEventListener("click", () => {	
	changeDisplay(newHeader, "none");
	//changeDisplay(loadHeader, "none");
	var q = `<div id="loadedGames">`;
	for (let i = 0; i < localStorage.length; i++) {
		var tempLoad = loadGame(localStorage.key(i));
		q += `<button type="button" id="${tempLoad.key}" class="collapsible">${tempLoad.name}</button>`;
		q += `<div class="content">Last Played: ${tempLoad.lastPlayed} <i id="${`remove`+i}" class="fa fa-trash-o"></i><i id="${`play`+i}"class="fa fa-play" aria-hidden="true"></i></div>`;
	}
	q += `</div>`
	loadHeader.insertAdjacentHTML("afterend", q); // Injecting HTML
	// Collapsible Elements Functionality
	changeDisplay(loadHeader, "none");
	var coll = document.getElementsByClassName("collapsible");
	for (let i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content.style.display === "inline-block") {
				changeDisplay(content, "none");
			} else {
				changeDisplay(content, "inline-block")
			}
		});
		// Remove Game Btn
		var tempRemoveElement = document.getElementById(`remove`+i);
		tempRemoveElement.addEventListener("click", function(){
			localStorage.removeItem(this.parentElement.previousElementSibling.innerText.toString());
			location.reload();
		});
		// Play Game Btn
		var tempPlayElement = document.getElementById(`play`+i);
		tempPlayElement.addEventListener("click", function(){
			document.getElementById('loadedGames').style.display = 'none';
			joker = JSON.parse(localStorage.getItem(this.parentElement.previousElementSibling.innerText.toString()));
			changeDisplay(game, 'block');
			game.innerHTML = showNames();
			game.insertAdjacentHTML("afterend", `<h4 id="newRoundBtn">New Round</h4>`)
			let newRoundBtn = document.getElementById('newRoundBtn');
			newRoundBtn.style.display = 'block';
			newRoundBtn.addEventListener("click", newRound);
		});
	}
}); // END OF LOAD GAME
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

// NEW ROUND FUNCTION START
var roundName;
var allClicked = 1;
var spans;
function newRound() {
	joker.roundCount++ // Round Count goes up
	joker[getRoundCount()] = makeRound(); // Creating an object to put this rounds scores into
	// HTML Round Injection
	var z = `<div class="row">`;
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
	}
	z += `</div>`;
	if ((joker.roundCount % joker.playerCount) == 0){
		z += `<br>`
		// even
	} else {
		// odd
	}
	game.insertAdjacentHTML("beforeend", z); // Injecting HTML Row
	
	// Adding Functionality to Checkmarks once clicked
		for (let l = 0; l < joker.playerCount; l++) {
			spans = row[joker.roundCount].getElementsByTagName('span');
			
			spans[l].addEventListener('click', function () {
				var input = this.previousElementSibling;
				var onlyName = this.parentNode.id.replace(/[0-9]/g, '').toLowerCase();
				if ((input.value == "") || (input.value == undefined)) {
					input.style.borderColor = "red";
				} else {
				input.style.display = "none";
				this.style.display = "none";
				joker.currentScore[onlyName] += parseInt(input.value);
				joker[getRoundCount()][onlyName] = parseInt(input.value);
				this.parentNode.innerText = joker.currentScore[onlyName]; // populate cell with value
				// Display New Round After Last Clicked Checkmark
				if (allClicked == joker.playerCount){
					saveGame();
					console.log(joker.name+', '+JSON.stringify(joker));
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
} // end of newRound function

// Learning Arrow Functions
const jason = () => {
	var obj = {
		key : gameKey.toLowerCase(),
		lastPlayed: getDate(),
		roundCount: 0,
		playerCount: playerCount, /* could use player.length but this value comes first */
		player: names,
		currentScore: {}
	};
	// Would use makeRound exept joker is not declared yet (until now)
	var temp = ''
	for (let i = 0; i < playerCount; i++) {
		if(i === playerCount-1){
			// Last name
			temp += obj.player[i];
		} else if (i === playerCount-2){
			// Second last name
			temp += obj.player[i]+' and '
		} else {
			// Anything else
			temp += obj.player[i]+', ';
		}
		obj.currentScore[obj.player[i].toLowerCase()] = 0;
	}
	obj.name = temp;
	return obj;
}

const makeRound = () => {
	var obj = {};
		for (let i = 0; i < joker.playerCount; i++) {
			obj[joker.player[i].toLowerCase()] = 0;
		}
	return obj;
}

function saveGame(){
	localStorage.setItem(joker.name, JSON.stringify(joker));
}

const loadGame = (key) => {
	var tempObj = JSON.parse(localStorage.getItem(key.toString()));
	return tempObj;
}

const getRoundCount = (offset = 0) => {
	var roundCount = 'round';
	var off = (joker.roundCount) + offset;
	roundCount += off;
	return roundCount;
}

function changeDisplay(DOMreference, state){
	DOMreference.style.display = state;
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

const loadHtml = function(parentElementId, filePath) {
	const init = {
		method : "GET",
		headers : { "Content-Type" : "text/html" },
		mode : "cors",
		cache : "default"
	};
	const req = new Request(filePath, init);
	fetch(req)
		.then(function(response) {
			return response.text();
		})
		.then(function(body) {
			// Replace `#` char in case the function gets called `querySelector` or jQuery style
			if (parentElementId.startsWith("#")) {
				parentElementId.replace("#", "");
			}
			document.getElementById(parentElementId).innerHTML = body;

		});
};