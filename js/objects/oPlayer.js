import {
    drawRect
} from "../functions/fDrawRect.js";
import {
    aiReady,
    aiChase,
    aiWait,
    aiTap,
    aiSlide,
    aiMistake
} from "../functions/player/ai.js";
import {
    controlPlayer
} from "../functions/player/control.js";

export default class Paddle {
    constructor(gameWidth, gameHeight, spawnX, spawnY, aiType, game) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.hb = {
            w: 8,
            h: 68,
            x: spawnX,
            y: spawnY
        };

        this.game = game;

        this.AITYPES = {
            PLAYER: 0,
            READY: 1,
            CHASE: 2,
            WAIT: 3,
            TAP: 4,
            SLIDE: 5,
            MISTAKE: 6
        }
        this.control = aiType;

        this.angle = 0

        this.maxspd = 1.6;
        this.accel = 0.16;

        this.dspd = {
            up: 0,
            down: 0,
        }
        this.spd = 0;

        this.col = '#ffffff';

        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            anykey: false,
        };

        this.aiDecider = 0;     //Decides which AI will be used
        this.aiTimer = 0;       //How long the AI will keep to a specific AI type
        this.aiTapCount = 0;    //Used for the "TAP" AI type, to determine amount of taps
        this.aiMoveUp = true;   //Move the AI up (true) or down (false)
    };

    move() {
        if (this.keys.ArrowUp) {
            if (this.dspd.up > -this.maxspd) {
                this.dspd.up -= this.accel;
            }
        }
        if (this.keys.ArrowDown) {
            if (this.dspd.down < this.maxspd) {
                this.dspd.down += this.accel;
            }
        }
    }

    stop() {
        if (!this.keys.ArrowUp) {
            this.dspd.up = 0;
        }
        if (!this.keys.ArrowDown) {
            this.dspd.down = 0;
        }
    }

    update(dt) {
        switch (this.control) {
            //Player control
            case (this.AITYPES.PLAYER):
                break;

                //Ball stands at the ball's position when needing to be launched
            case (this.AITYPES.READY):
                aiReady(this, dt);
                break;

                //AI follows the ball
            case (this.AITYPES.CHASE):
                aiChase(this, dt);
                break;

                //AI waits shortly
            case (this.AITYPES.WAIT):
                aiWait(this, dt);
                break;

                //AI taps toward the ball
            case (this.AITYPES.TAP):
                aiTap(this, dt);
                break;

                //AI Beelines to the ball
            case (this.AITYPES.SLIDE):
                aiSlide(this, dt);
                break;

                //AI shortly moves the wrong direction
            case (this.AITYPES.MISTAKE):
                aiMistake(this, dt);
                break;
        }

        this.move();
        this.stop();
        this.spd = this.dspd.up + this.dspd.down;
        this.hb.y += this.spd * dt;

        if (this.hb.y > (this.gameHeight - (this.hb.h/2) - 1)) {
            this.hb.y = (this.gameHeight - (this.hb.h/2));
        }
    
        if (this.hb.y < (this.hb.h/2) + 105) {
            this.hb.y = this.hb.h/2 + 104;
        }

        if (this.control != this.AITYPES.PLAYER && this.control != this.AITYPES.READY) {
            if (this.aiTimer < 1 && this.aiTapCount < 1) {
                this.aiDecider = Math.random()*100;
                if (this.aiDecider < 3){
                    //mistake
                    this.aiTimer = 4;
                    this.control = this.AITYPES.MISTAKE;
                }else if (this.aiDecider > 2 && this.aiDecider < 28){
                    //chase
                    this.aiTimer = 80 + Math.round(Math.random() * 164);
                    this.control = this.AITYPES.CHASE;
                }else if (this.aiDecider > 27 && this.aiDecider < 70){
                    //slide
                    this.aiTimer = 112 + Math.round(Math.random() * 138);
                    if (this.hb.y > this.game.ball.hb.y){
                        this.aiMoveUp = true;
                    }else{
                        this.aiMoveUp = false;
                    }
                    this.control = this.AITYPES.SLIDE;
                }else if (this.aiDecider > 69 && this.aiDecider < 90){
                    //tap
                    this.aiTimer = 5;
                    this.aiTapCount = 12 + Math.round(Math.random() * 10);
                    this.control = this.AITYPES.TAP;
                }else{
                    //wait
                    this.aiTimer = 20;
                    this.control = this.AITYPES.WAIT;
                }
            }
        }

    }

    draw(ctx) {
        drawRect(ctx, this.col, this.hb.x, this.hb.y, this.hb.w, 64, this.angle, 'center', 0);
        //drawRect(ctx, "rgba(255, 0, 0, 0.5)", this.hb.x, this.hb.y, this.hb.w, this.hb.h, this.hb.angle, 'center', 0);
    }
}