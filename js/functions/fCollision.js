export function collide(self, other) {
    let s = {
        t: self.hb.y - (self.hb.h / 2),
        r: self.hb.x + (self.hb.w / 2),
        b: self.hb.y + (self.hb.h / 2),
        l: self.hb.x - (self.hb.w / 2),
    }

    let o = {
        t: other.hb.y - (other.hb.h / 2),
        r: other.hb.x + (other.hb.w / 2),
        b: other.hb.y + (other.hb.h / 2),
        l: other.hb.x - (other.hb.w / 2),
    }

    if (
        Math.round(s.t) <= Math.round(o.b) &&
        Math.round(s.b) >= Math.round(o.t) &&
        Math.round(s.l) <= Math.round(o.r) &&
        Math.round(s.r) >= Math.round(o.l)
    ) {
        return true;
    } else {
        return false;
    }
}