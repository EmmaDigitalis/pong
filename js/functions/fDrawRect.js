import {
    angleToRadial
} from "../functions/fAngles.js";

export function drawRect(context, color, posX, posY, width, height, angle, moveAround, distance) {
    let ctx = context,
        a = angle,
        c = color,
        x = posX,
        y = posY,
        w = width,
        h = height,
        o = moveAround,
        d = distance;

    ctx.save();

    if (o == 'center') {
        ctx.translate(Math.round(x), Math.round(y));
        ctx.rotate(angleToRadial(a));
        ctx.fillStyle = c;
        ctx.fillRect(Math.round(-w / 2), Math.round(-h / 2), Math.round(w), Math.round(h));
    }else if (o == 'point'){
        ctx.translate(Math.round(x), Math.round(y));
        ctx.rotate(angleToRadial(a));
        ctx.fillStyle = c;
        ctx.fillRect(d, Math.round(-(h/2)), Math.round(w), Math.round(h));
    }

    ctx.restore();
}