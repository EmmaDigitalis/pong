///Setup different AI Types. AI will always start set to READY

//AI used when the ball needs to be launched
function aiReady(self, dt) {
    self.hb.y = self.game.ball.hb.y;
    if (self.game.ball.state == self.game.ball.STATES.NORMAL){
        self.aiTimer = 240;
        self.control = self.AITYPES.CHASE;
    }
}

//AI just goes after the ball
function aiChase(self, dt) {
    self.aiTimer -= 1;
    if (self.game.ball.hb.y < self.hb.y - 64){
        self.keys.ArrowUp = true;
    }else if (self.game.ball.hb.y > self.hb.y + 24){
        self.keys.ArrowUp = false;
    }
    if (self.game.ball.hb.y > self.hb.y + 64){
        self.keys.ArrowDown = true;
    }else if (self.game.ball.hb.y < self.hb.y - 24){
        self.keys.ArrowDown = false;
    }
}

//AI will wait a second
function aiWait(self, dt) {
    self.keys.ArrowUp = false;
    self.keys.ArrowDown = false;
    self.aiTimer -= 1;
}

//AI will tap in direction of ball
function aiTap(self, dt) {
    self.aiTimer -= 1;
    
    if (self.aiTapCount % 2 == 0){
        if (self.game.ball.hb.y < self.hb.y ){
            self.keys.ArrowUp = true;
            self.keys.ArrowDown = false;
        }else{
            self.keys.ArrowUp = false;
            self.keys.ArrowDown = true;
        }
    }else{
        self.keys.ArrowUp = false;
        self.keys.ArrowDown = false;
    }
    if (self.aiTimer < 0){
        self.aiTapCount -= 1;
        self.aiTimer = 5;
    }
}

//AI will slide towards ball. Might overshoot.
function aiSlide(self, dt) {
    self.aiTimer -= 1;
    
    self.aiTimer -= 1;
    if (self.aiMoveUp = true){
        self.keys.ArrowUp = true;
        self.keys.ArrowDown = false;
        if (self.hb.y < self.game.ball.hb.y && self.aiTimer > 5){
            self.aiTimer = Math.round(Math.random() * 5);
        }
    }else{
        self.keys.ArrowUp = false;
        self.keys.ArrowDown = true;
        if (self.hb.y > self.game.ball.hb.y && self.aiTimer > 5){
            self.aiTimer = Math.round(Math.random() * 5);
        }
    }
}

//AI will move in the wrong direction for a short while
function aiMistake(self, dt) {
    self.aiTimer -= 1;
    if (self.game.ball.spd < (self.game.ball.maxSpd * 0.8)){
        self.aiTimer = 0;
    }else{
        self.aiTimer -= 1;
        if (self.game.ball.hb.y < self.hb.y){
            self.keys.ArrowUp = false;
            self.keys.ArrowDown = true;
        }else{
            self.keys.ArrowUp = true;
            self.keys.ArrowDown = false;
        }
    }
}

export {
    aiReady,
    aiChase,
    aiWait,
    aiTap,
    aiSlide,
    aiMistake
};