function radialToAngle(input){  
    let angle = input * (180 / Math.PI);
    
    return angle;
}

function angleToRadial(input){
    let angle = (input * Math.PI) / 180;
    
    return angle;
}

export {radialToAngle, angleToRadial};