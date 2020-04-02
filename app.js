//app.js written by Jacob Schwartz
/*

const car = {
    model: 'Fiesta'
}

#TODO
create function to generate name -> display a list of games
with names of players followed by recently played date
*/

//const videoplayer = videoPlayerTemplate(data);
//document.getElementById('myRandomElement').insertAdjacentHTML("afterbegin", videoplayer);
// global object

// HTML References
var game = document.getElementById("game");
var loadHeader = document.getElementById("loadHeader");
var welcomeHeader = document.getElementById("welcomeHeader");

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

}    

function loadGame() {

}