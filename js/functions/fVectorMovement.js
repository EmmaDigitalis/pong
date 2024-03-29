import { angleToRadial } from "../functions/fAngles.js";

///Vector-based Movement Code.
/*--------------------------------------
//input: 
param1 = distance
param2 = direction

//output:
movX
movY
*/

function vectorMovementX(distance, direction) {
    let dis = distance;
    let dir = angleToRadial(direction);

    let moveX;
    moveX = Math.cos(dir) * dis; 

    return moveX;
}

function vectorMovementY(distance, direction) {
    let dis = distance;
    let dir = angleToRadial(direction);

    let moveY;
    moveY = (Math.sin(dir) * dis); 

    return moveY;
}

export { vectorMovementX, vectorMovementY };