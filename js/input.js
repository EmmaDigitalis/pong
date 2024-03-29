export default class InputHandler {
    constructor(player, ball, game) {
        document.addEventListener('keydown', (keyboardEvent) => {
            switch (event.keyCode) {
                case 38:
                    player.keys.ArrowUp = true;
                    break;
                case 40:
                    player.keys.ArrowDown = true;
                    break;
                case 32:
                    ball.shot();
                    break;
                case 27:
                    game.togglePause();
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 38:
                    player.keys.ArrowUp = false;
                    break;
                case 40:
                    player.keys.ArrowDown = false;
                    break;
            }
        });
    }
}