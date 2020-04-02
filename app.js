//app.js written by Jacob Schwartz
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
var game = document.getElementById("game");
var newHeader = document.getElementById("newHeader");
var loadHeader = document.getElementById("loadHeader");
var welcomeHeader = document.getElementById("welcomeHeader");
var startHeader = document.getElementById("startHeader");
var confirmHeader = document.getElementById("confirmHeader");
var playerCountPage = document.getElementById("playerCountPage");
var start = document.getElementById("start");
var playerCount;
var hasStarted = false;

function welcome() {
    console.log("Welcome");
    game.style.display = "none";
    playerCountPage.style.display = "none";
    // load persistent store after the DOM has loaded
    // store = new Persist.Store('joker');

    if (typeof store == "undefined") {
        welcomeHeader.innerHTML = "Welcome, ";
        loadHeader.style.display = "none";
    } else {
        loadHeader.style.display = "inline";
    }
}

function startGame() {
    if (hasStarted === false){
        hasStarted = true;
        startHeader.style.display = "none";
        confirmHeader.style.display = "inline";
    } else {
        confirm();
    }
}

var x = '';
var warnHeader = document.getElementById("warn");

function confirm() {   
    playerCount = document.getElementById("input").value;
    playerCount = parseInt(playerCount);

    if (isNaN(playerCount)){
        alert("Please enter a valid number");
    } else {
    for (let i = 0; i < playerCount; i++) {
        x += '<input class="nameInput" type="text" style="display: inline;"><br>'
        
    }
    x += '<h2 id="startHeader" class="headerBtn" onclick="nameEntry()" style="display: inline-block;">Start</h2>'
        playerCountPage.innerHTML = x;    
    }
}

function newGame() {
    welcomeHeader.style.display = "none";
    newHeader.style.display = "none";
    playerCountPage.style.display = "inline";
    // once Start is press change text to confirm then go
}    

function loadGame() {

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