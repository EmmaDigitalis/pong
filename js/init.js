//import game
import Game from './game.js';

//DEBUGGING
let debug = false;
if (debug == true) {
    var debugWindow = document.getElementById('gameArea');
    debugWindow.classList.add('gameAreaDebug');
    document.getElementById('debugWindow').classList.remove('hidden');
}

//Setup & get contexts
let canvasBG = document.getElementById('gameBG');
let canvasGame = document.getElementById('gamePlay');

let bg = canvasBG.getContext('2d', {
    alpha: false
});
let ctx = canvasGame.getContext('2d');

bg.imageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

//Game Meta info
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

//Run the game logic
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

function gameStart() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.drawbg(bg);
}

requestAnimationFrame(gameLoop);
requestAnimationFrame(gameStart);

/*
$(window).resize(function() {
    windowScaler([bg, ctx])
});

$(window).on("load", function() {
    windowScaler([bg, ctx])
});

//window scaler
function windowScaler(arrayOfContexts) {
    let ctxList = arrayOfContexts;
    let winw = $("#gameArea").width();
    let winh = $("#gameArea").height();

    let mapw = 320;
    let maph = 180;

    let scalew = Math.floor(winw / mapw);
    let scaleh = Math.floor((winh - 48) / maph);

    let scalevalue = Math.min(scalew, scaleh);

    $(":root").get(0).style.setProperty("--scaler", Math.max(scalevalue, 1));
    ctxList.forEach((object) => object.canvas.width = (mapw * Math.max(scalevalue, 1)));
    ctxList.forEach((object) => object.canvas.height = (maph * Math.max(scalevalue, 1)));
    ctxList.forEach((object) => object.scale(Math.max(scalevalue, 1), Math.max(scalevalue, 1)));
}*/