import {
    vectorMovementX,
    vectorMovementY
} from "../functions/fVectorMovement.js";
import {
    collide
} from "../functions/fCollision.js";
import {
    drawRect
} from "../functions/fDrawRect.js";
import {
    angleBetween
} from "../functions/fAngleBetween.js";

import {
    angleToRadial,
    radialToAngle
} from "../functions/fAngles.js";

export default class Ball {
    constructor(gameWidth, gameHeight, spawnX, spawnY, game) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.hb = {
            w: 8,
            h: 8,
            x: spawnX,
            y: spawnY
        };

        this.game = game;

        this.STATES = {
            START: 0, //When the game starts
            NORMAL: 1, //During normal gameplay
            LAUNCH: 2, //When a player launches the ball
            WAIT: 3 //Right after a player scores
        }
        this.state = this.STATES.START;

        this.colors = {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
        this.angle = 0;
        this.col = 'rgba(' + String(this.colors.r) + ', ' + String(this.colors.g) + ', ' + String(this.colors.b) + ', ' + String(this.colors.a) + ')';

        this.maxSpd = 1.8;
        this.accel = 1.08;
        this.launchSpd = 0.4;
        this.spd = 0;
        this.dir = 0;
        this.maxDir = 60;

        this.timer = 120 + Math.round(Math.random() * 100);
        this.rotation = 1;
        this.nextLaunch = 0;
        this.launchTmr = 0;

        this.hspd = vectorMovementX(this.spd, this.dir);
        this.vspd = vectorMovementY(this.spd, this.dir);
    };

    update(dt) {
        switch (this.state) {
            case (this.STATES.START):
                this.init(dt);
                break;
            case (this.STATES.NORMAL):
                this.running(dt);
                break;
            case (this.STATES.LAUNCH):
                this.launch(dt);
                break;
            case (this.STATES.WAIT):
                this.wait(dt);
                break;
        }

        if (this.colors.r < 255) {
            this.colors.r += 3;
        } else {
            this.colors.r = 255;
        }
        if (this.colors.g < 255) {
            this.colors.g += 3;
        } else {
            this.colors.g = 255;
        }
        if (this.colors.b < 255) {
            this.colors.b += 3;
        } else {
            this.colors.b = 255;
        }
        this.col = 'rgba(' + String(this.colors.r) + ', ' + String(this.colors.g) + ', ' + String(this.colors.b) + ', ' + String(this.colors.a) + ')';
    }

    init(dt) {
        this.dir += (this.rotation * dt);
        if (this.dir > 360) {
            this.dir -= 360;
        } else if (this.dir < 0) {
            this.dir += 360;
        }
        if (this.timer > 0) {
            this.timer -= 0.1 * dt;
        } else {
            if (this.rotation > 0.05) {
                this.rotation *= 0.98;
            } else {
                if (((this.dir > 60) && (this.dir < 120)) || ((this.dir > 240) && (this.dir < 300))) {
                    this.timer = 55 + Math.round(Math.random() * 200);
                } else {
                    //Set initial values for the ball
                    this.rotation = 0;
                    if ((this.dir) > 90 && (this.dir < 270)) {
                        this.dir -= 180;
                        this.spd = -this.launchSpd;
                    } else {
                        this.spd = this.launchSpd;
                    }
                    this.hspd = vectorMovementX(this.spd, this.dir);
                    this.vspd = vectorMovementY(this.spd, this.dir);
                    this.state = this.STATES.NORMAL;
                }
            }
        }
    }

    running(dt) {
        if (this.hb.y > (this.gameHeight - (this.hb.h / 2) - 1)) {
            this.hb.y = (this.gameHeight - (this.hb.h / 2) - 1);
            this.vspd *= -1;
        }

        if (this.hb.y < (this.hb.h / 2) + 105) {
            this.hb.y = (this.hb.h / 2) + 104;
            this.vspd *= -1;
        }


        if (this.hb.x > (this.gameWidth - (this.hb.w / 2) - 1)) {
            this.colors.a = 0;
            this.game.score[0] += 1;
            $("#p1").html(String(this.game.score[0]));
            this.nextLaunch = 0;
            this.timer = 30;
            this.state = this.STATES.WAIT;
        }

        if (this.hb.x < (this.hb.w / 2 + 1)) {
            this.colors.a = 0;
            this.game.score[1] += 1;
            $("#p2").html(String(this.game.score[1]));
            this.nextLaunch = 1;
            this.timer = 30;
            this.state = this.STATES.WAIT;
        }


        for (let i = 0; i < this.game.players.length; i++) {
            if (collide(this, this.game.players[i])) {
                this.colors.r = 55 + Math.round(Math.random() * 200);
                this.colors.g = 55 + Math.round(Math.random() * 200);
                this.colors.b = 55 + Math.round(Math.random() * 200);

                if ((this.spd < this.maxSpd) && (this.spd > -this.maxSpd)) {
                    this.spd *= -this.accel;
                } else {
                    this.spd *= -1;
                }

                if (this.game.players[i] == this.game.p1) {
                    this.hb.x = this.game.players[i].hb.x + (this.game.players[i].hb.w / 2) + (this.hb.w / 2);
                } else {
                    this.hb.x = this.game.players[i].hb.x - (this.game.players[i].hb.w / 2) - (this.hb.w / 2);
                }

                let colAngle = angleBetween(this, this.game.p1);


                this.dir *= 0.4;
                this.dir += ((colAngle / 2) - (this.game.players[i].spd) * 5);
                if (this.dir > this.maxDir) {
                    this.dir = this.maxDir;
                } else if (this.dir < -this.maxDir) {
                    this.dir = -this.maxDir;
                }
                this.hspd = vectorMovementX(this.spd, this.dir);
                this.vspd = vectorMovementY(this.spd, this.dir);
            }
        }

        this.hb.x += this.hspd * dt;
        this.hb.y += this.vspd * dt;
    }

    wait(dt) {
        this.timer -= 1 * (dt / 60);
        if (this.timer < 1) {
            this.hb.y = (this.gameHeight / 2) + 50;
            this.rotation = 0.8;
            if (this.nextLaunch === 1) {
                this.hb.x = (this.gameWidth / 2) - 360;
                this.dir = 0;
            } else {
                this.hb.x = (this.gameWidth / 2) + 360;
                this.dir = 180;
                this.launchTmr = (15 + Math.round(Math.random() * 10));
            }
            this.state = this.STATES.LAUNCH;
        }
    }

    shot() {
        if (this.state == this.STATES.LAUNCH) {
            if ((this.nextLaunch === 1) || (this.nextLaunch === 0 && this.launchTmr < 1)) {
                this.rotation = 0;
                this.launchSpd += 0.05;
                if (this.nextLaunch === 1) {
                    this.spd = this.launchSpd;
                } else {
                    this.spd = -this.launchSpd;
                }
                this.hspd = vectorMovementX(this.spd, this.dir);
                this.vspd = vectorMovementY(this.spd, this.dir);
                this.state = this.STATES.NORMAL;
            }
        }
    }


    launch(dt) {
        this.dir += ((this.rotation / 2) * dt);
        if (this.dir > this.maxDir) {
            this.dir = this.maxDir - 1;
            this.rotation *= -1;
        } else if (this.dir < -this.maxDir) {
            this.dir = -this.maxDir + 1;
            this.rotation *= -1;
        }
        if (this.colors.a != 1) {
            this.colors.a = 1;
        }
        if (this.nextLaunch === 0) {
            this.launchTmr -= 1 * (dt / 60);
            if (this.launchTmr < 1) {
                this.shot();
            }
        }
    }

    draw(ctx) {
        if (this.state === this.STATES.START || this.state === this.STATES.LAUNCH) {
            if (this.state === this.STATES.LAUNCH && this.nextLaunch === 0) {
                drawRect(ctx, 'rgba(255, 255, 255, 0.4', this.hb.x, this.hb.y, 64, 8, this.dir+180, 'point', 32);
                drawRect(ctx, 'rgba(0, 255, 255, 1', this.hb.x, this.hb.y, 56, 2, this.dir+180, 'point', 36);
            } else {
                drawRect(ctx, 'rgba(255, 255, 255, 0.4', this.hb.x, this.hb.y, 64, 8, this.dir, 'point', 32);
                drawRect(ctx, 'rgba(0, 255, 255, 1', this.hb.x, this.hb.y, 56, 2, this.dir, 'point', 36);
            }
        }

        drawRect(ctx, this.col, this.hb.x, this.hb.y, this.hb.w, this.hb.h, 0, 'center', 0);
        //drawRect(ctx, "rgba(255, 0, 0, 0.5)", this.hb.x, this.hb.y, this.hb.w, this.hb.h, this.hb.angle, 'center', 0);
    }
}