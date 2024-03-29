//imports
import Paddle from './objects/oPlayer.js';
import InputHandler from './input.js';
import Ball from './objects/oBall.js';

//setup game state
const GAMESTATE = {
    PAUSED: 0,
    DEFAULT: 1,
    MENU: 2
}

//game logic class
export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.p1 = new Paddle(this.gameWidth, this.gameHeight, Math.round((this.gameWidth / 2) - (480)), Math.round((this.gameHeight / 2) + 50), 0, this);
        this.p2 = new Paddle(this.gameWidth, this.gameHeight, Math.round((this.gameWidth / 2) + (480)), Math.round((this.gameHeight / 2) + 50), 1, this);
        this.ball = new Ball(this.gameWidth, this.gameHeight, Math.round((this.gameWidth / 2)), Math.round((this.gameHeight / 2) + 50), this);

        this.gamestate = GAMESTATE.DEFAULT;

        this.players = [this.p1, this.p2];
        this.gameObjects = [this.p1, this.p2, this.ball];

        new InputHandler(this.p1, this.ball, this);

        this.score = [0, 0];
    };

    drawbg(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    }

    update(deltaTime) {
        if (
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU
        ) return;

        if (this.gamestate === GAMESTATE.DEFAULT){
            this.gameObjects.forEach((object) => object.update(deltaTime));
        }
    }

    togglePause(){
        if (this.gamestate === GAMESTATE.DEFAULT){
            this.gamestate = GAMESTATE.PAUSED;
        }else{
            this.gamestate = GAMESTATE.DEFAULT;
        }
    }

    draw(ctx) {
        this.gameObjects.forEach((object) => object.draw(ctx));
        
        //Pause screen
        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = '26px courier';
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
            ctx.fillText("PAUSA", this.gameWidth / 2 - 32, this.gameHeight / 2);
        }

        //Debugging
        ctx.font = '14px courier';
        ctx.fillStyle = "white";
        ctx.fillText("STT: " + String(this.gamestate), 2, 116);
        ctx.fillText("TMR: " + String(this.ball.timer), 2, 128);
        ctx.fillText("TPC: " + String(this.p2.aiTapCount), 2, 140);
        ctx.fillText("LTM: " + String(this.ball.launchTmr), 2, 152);
        ctx.fillText("LCH: " + String(this.ball.nextLaunch), 2, 164);
    }
}