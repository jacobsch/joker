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

//const videoplayer = videoPlayerTemplate(data);
//document.getElementById('myRandomElement').insertAdjacentHTML("afterbegin", videoplayer);
// global object

// HTML References
const newHeader = document.getElementById("newHeader");
const loadHeader = document.getElementById("loadHeader");
const welcomeHeader = document.getElementById("welcomeHeader");
const startHeader = document.getElementById("startHeader");
const confirmHeader = document.getElementById("confirmHeader");
const playerCountPage = document.getElementById("playerCountPage");
const start = document.getElementById("start");
const warnHeader = document.getElementById("warn");
const game = document.getElementById("game");
const row = document.getElementsByClassName("row");

// CURRENT GAME ARRAY
var joker;

var playerCount;
var hasStarted = false;

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

var btnCounter=1;
function startBtn() {
    if (btnCounter == 1) {
        btnCounter++
        startHeader.style.display = "none";
        confirmHeader.style.display = "inline";
    } else if (btnCounter == 2) {
        confirm();        
    } else if (btnCounter == 3) {
        nameEntry();
    } else if (btnCounter == 4) {
		playerCountPage.style.display = "none";
		game.style.display = "block";
		joker = jason();
        showGame();
    } else {
        // err ctrl
        alert("internal error")
        location.reload();
    }

}

// '+(i+1)+'
var x = '';
function confirm() {   
    playerCount = document.getElementById("input").value;
    playerCount = parseInt(playerCount);

    if (isNaN(playerCount)){
        alert("Please enter a valid number");
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
var allGood = [];
var names = [];
var gameName = "";

// make function called next and call nameEntry and others
function nameEntry() {
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
		gameName = gameName.slice(0, -1);
		btnCounter++
    }
}

// #TODO FIX
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

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
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;

	var obj = {
		name: gameName, 
		lastPlayed: today,
		roundCount: 1,
		playerCount: playerCount,
		player: names,
		round1: {}
	};

	return obj
}

var y = '';
function showGame() {
	for (let i = 0; i < joker.playerCount; i++) {
		// show names and create rows for numbers
		// <div class="column" style="background-color:#aaa;">Col1</div>
        // <div class="column" style="background-color:#bbb;">Col2</div>		
	}
}

function newRound() {
    // not used but for the future...
    /* 
    create a mini array for each round maybe and then run showGame again
    */
}

function template(data) {
    return `
        <h1>${data.header}</h1>
        <p>${data.subheader}</p>
        <a href="#" id="playButton">Play</a>
        <a href="javascript: void(0)" id="muteUnmute">Mute</a>
        <div id="progressBarOuter"> 
            <div id="bytesLoaded"></div>
            <div id="progressBar"></div>
        </div>
        <time id="currentTime">0:00</time>
        <time id="totalTime">0:00</time>
    `
}