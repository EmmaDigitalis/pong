//FPS Counter
const times = [];
let fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;

        refreshLoop();
    });
}

function frameDisplay() {
    let fpsDisplay = document.getElementById("fpsCounter");
    fpsDisplay.innerHTML = "FPS: " + String(fps);
    setTimeout(function() {
        frameDisplay();
    }, 100);

}


refreshLoop();
setTimeout(function() {
    frameDisplay();
}, 500);