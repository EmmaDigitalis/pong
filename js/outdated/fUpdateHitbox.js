export function updateHitbox(positionX, positionY, offsetX, offsetY, width, height){
    let hitbox = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
    }
    let x = positionX, y = positionY, ox = offsetX, oy = offsetY, w = width, h = height;

    hitbox.x = x + ox;
    hitbox.y = y + oy;
    hitbox.w = w;
    hitbox.h = h;

    return hitbox;
}