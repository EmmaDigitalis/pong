function controlPlayer(self, dt){
    self.hb.y += self.spd * dt;

    self.move();
    self.stop();
    self.spd = self.dspd.up + self.dspd.down;
} 

export {controlPlayer};