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
var playerCount = document.getElementById("playerCount");
var start = document.getElementById("start");

function welcome() {
    console.log("Welcome");
    game.style.display = "none";

    // load persistent store after the DOM has loaded
    // store = new Persist.Store('joker');

    if (typeof store == "undefined") {
        welcomeHeader.innerHTML = "Welcome, ";
        loadHeader.style.display = "none";
    } else {
        loadHeader.style.display = "inline";
    }
}

function newGame() {
    start.style.display = "none";
    playerCount.style.display = "inline";
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

