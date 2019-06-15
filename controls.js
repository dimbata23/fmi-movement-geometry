
// Used for key press checks
keyboard = [];
const keys = { 'left': 65, 'down': 83, 'right': 68, 'up': 87, 'jump': 32 };

document.addEventListener('keydown', function (event) {
    keyboard[event.keyCode] = true;
});

document.addEventListener('keyup', function (event) {
    keyboard[event.keyCode] = false;
});
