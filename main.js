// some constants..
SPEED_MULTIPLIER_DEFAULT = 8;
ROTATE_SPEED_DEFAULT = 1.5;
VIEW_DISTANCE_TO_OBJ_DEFAULT = 25;
VIEW_ABOVE_OBJ_DEFAULT = 0.2;
CAMERA_ANGLE = 0.2;
SPEED_MULTIPLIER = SPEED_MULTIPLIER_DEFAULT;
ROTATE_SPEED = ROTATE_SPEED_DEFAULT;
VIEW_DISTANCE_TO_OBJ = VIEW_DISTANCE_TO_OBJ_DEFAULT;
VIEW_ABOVE_OBJ = VIEW_ABOVE_OBJ_DEFAULT;


function main() {

    // Scene creating
    scene = new Mecho();
    scene.ground = Mecho.WOOD;
    scene.onTime = animate;
    scene.viewObject.beta = CAMERA_ANGLE;

    button('show', 'V', changeView, 4);

    // Mario creation
    mario = new Mario([0, 0, 0]);
    mario.body.rotH = scene.viewObject.alpha;
    mainObj = mario.body;
    mainObj.grounded = true;

}


function animate() {

    moveAndView(mainObj);

}


function moveAndView(obj) {

    // setting the camera angle and distance
    scene.viewObject.follow = obj;
    scene.viewObject.distance = VIEW_DISTANCE_TO_OBJ;
    scene.viewObject.target.z += VIEW_ABOVE_OBJ;

    // If Mario is grounded and W/S is pressed then move
    if (obj.grounded && (keyboard[keys.up] || keyboard[keys.down])) {
        let tempAngle = (180 + obj.rotH) * Math.PI / 180;

        // moving forwards or backwards
        // depending on which key is pressed
        // and on time and not on PC speed
        obj.center.x +=
            Mecho.dTime * Math.sin(tempAngle) *
            SPEED_MULTIPLIER * (keyboard[keys.up] ? -1 : 1);
        obj.center.y +=
            Mecho.dTime * Math.cos(tempAngle) *
            SPEED_MULTIPLIER * (keyboard[keys.up] ? -1 : 1);

        // run the animation
        mario.animateRunning();
    }
    else {
        mario.retractAnimation();
    }

    // If Mario is grounded and A/D is pressed then rotate
    if (obj.grounded && keyboard[keys.right] || keyboard[keys.left]) {
        // Simple rotation depending on time and not PC speed
        let tempVar = Mecho.dTime * ROTATE_SPEED * (keyboard[keys.left] ? -1 : 1);
        scene.viewObject.alpha += tempVar;
        obj.rotH += tempVar * 180 / Math.PI;
    }

    if (keyboard[keys.jump]) {
        alert("Feature not implemented :(");
        alert("But at least there's a cute little favicon :)");
        keyboard = [];
    }

}


/// Buttons

function changeView() {
    switch (this.state) {
        case 0:
            scene.viewObject.alpha = Math.PI + Math.PI * mario.body.rotH / 180;
            scene.viewObject.beta = CAMERA_ANGLE;
            break;
        case 1:
            scene.viewObject.alpha = Math.PI * mario.body.rotH / 180;;
            scene.viewObject.beta = CAMERA_ANGLE;
            break;
        case 2:
            scene.viewObject.alpha = 9 * Math.PI / 4 + Math.PI * mario.body.rotH / 180;
            scene.viewObject.beta = 0.138;
            break;
        case 3:
            scene.viewObject.alpha = Math.PI / 2 + Math.PI * mario.body.rotH / 180;
            scene.viewObject.beta = 0;
            break;
    }
}


/// Slider controls

function changePlayerSpeed(obj) {
    SPEED_MULTIPLIER = obj.value;
    document.getElementById("playerSpeedVal").innerHTML = obj.value;
}

function changeCameraSpeed(obj) {
    ROTATE_SPEED = obj.value * .1;
    document.getElementById("cameraSpeedVal").innerHTML = obj.value;
}

function changeCameraDistance(obj) {
    VIEW_DISTANCE_TO_OBJ = obj.value;
    document.getElementById("cameraDistanceVal").innerHTML = obj.value;
}
