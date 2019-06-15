// A lot of constats/parameters containing
// information about the size of mario
// and about the animation rotations
const BODY_SIZE = 2;
const UPPER_BODY_SIZE = BODY_SIZE * .75;
const UPPER_BODY_HEIGHT = BODY_SIZE * .26;
const THIGH_LENGHT = BODY_SIZE * .5;
const THIGH_DIAMETER = BODY_SIZE * .40;
const CALF_LENGHT = BODY_SIZE * .4;
const CALF_DIAMETER = BODY_SIZE * .40;
const SHOE_LENGTH = BODY_SIZE * .75;
const SHOE_WIDTH = CALF_DIAMETER * 1.2;
const LEGS_SPREAD = 6;
const SHOULDER_DIAMETER = CALF_DIAMETER * .6;
const SHOULDER_LENGTH = BODY_SIZE * .4;
const ARM_DIAMETER = CALF_DIAMETER * .6;
const ARM_LENGTH = BODY_SIZE * .375;
const ARMS_SPREAD = LEGS_SPREAD * 6;
const HAND_SIZE = ARM_DIAMETER * 1.67;
const HEAD_WIDTH = BODY_SIZE * .9;
const HEAD_HEIGHT = BODY_SIZE * 1.07;
const NOSE_WIDTH = HEAD_WIDTH * .4
const NOSE_HEIGHT = NOSE_WIDTH * .8
const EYE_WIDTH = HEAD_WIDTH * .25;
const EYE_HEIGHT = EYE_WIDTH * 1.3;
const MOUSTACHE_WIDTH = HEAD_WIDTH * .85;
const MOUSTACHE_HEIGHT = NOSE_HEIGHT * .65;
const HAT_WIDTH = HEAD_WIDTH * 1.2;
const HAT_HEIGHT = HEAD_HEIGHT * .6;
const VISOR_WIDTH = HAT_WIDTH * .9;
const VISOR_HEIGHT = HAT_HEIGHT * .15;
const MAX_LEG_ROT = 45;
const MIN_LEG_ROT = -45;
const MAX_CALF_ROT = 45;
const MIN_CALF_ROT = 0;
const MAX_SHOULDER_ROT = 45;
const MIN_SHOULDER_ROT = -45;
const MAX_ARM_ROT = 45;
const MIN_ARM_ROT = 0;


class Mario {

    constructor(pos) {

        // used for animating
        this.lastTime = 0;

        // A big list of the body parts
        // adjusting their position and rotation
        this.body = ball([pos.x, pos.y, pos.z + BODY_SIZE * 1.25], BODY_SIZE);
        this.body.material = Texture.MARIO_BODY;
        this.body.tiles = [2];

        this.upperBody = disk([0, 0, BODY_SIZE * .4], UPPER_BODY_SIZE, UPPER_BODY_HEIGHT);
        this.upperBody.parent = this.body;
        this.upperBody.material = Texture.MARIO_UPPER_BODY;
        this.upperBody.tiles = [2, 0.1];

        this.leftThigh = disk([-BODY_SIZE * .25, 0, -BODY_SIZE * .40 + BODY_SIZE * .2], THIGH_DIAMETER, THIGH_LENGHT);
        this.leftThigh.parent = this.body;
        this.leftThigh.material = Texture.MARIO_LEG;
        this.leftThigh.centerOffset = [0, 0, BODY_SIZE * .25];
        this.leftThigh.rotV = -LEGS_SPREAD;
        this.leftThigh.tiles = [2, 1];

        this.rightThigh = disk([BODY_SIZE * .25, 0, -BODY_SIZE * .40 + BODY_SIZE * .2], THIGH_DIAMETER, THIGH_LENGHT);
        this.rightThigh.parent = this.body;
        this.rightThigh.material = Texture.MARIO_LEG;
        this.rightThigh.centerOffset = [0, 0, BODY_SIZE * .25];
        this.rightThigh.rotV = LEGS_SPREAD;
        this.rightThigh.tiles = [2, 1];

        this.leftCalf = disk([0, 0, -BODY_SIZE * .2], CALF_DIAMETER, CALF_LENGHT);
        this.leftCalf.parent = this.leftThigh;
        this.leftCalf.material = Texture.MARIO_LEG;
        this.leftCalf.centerOffset = [0, 0, BODY_SIZE * .2];
        this.leftCalf.tiles = [2, 1];

        this.rightCalf = disk([0, 0, -BODY_SIZE * .2], CALF_DIAMETER, CALF_LENGHT);
        this.rightCalf.parent = this.rightThigh;
        this.rightCalf.material = Texture.MARIO_LEG;
        this.rightCalf.centerOffset = [0, 0, BODY_SIZE * .2];
        this.rightCalf.tiles = [2, 1];

        this.leftShoe = ellipsoid([0, SHOE_LENGTH * .15, -CALF_LENGHT * .6], SHOE_WIDTH, SHOE_LENGTH, SHOE_WIDTH);
        this.leftShoe.parent = this.leftCalf;
        this.leftShoe.material = Texture.MARIO_SHOE;
        this.leftShoe.tiles = [1, 2];

        this.rightShoe = ellipsoid([0, SHOE_LENGTH * .15, -CALF_LENGHT * .6], SHOE_WIDTH, SHOE_LENGTH, SHOE_WIDTH);
        this.rightShoe.parent = this.rightCalf;
        this.rightShoe.material = Texture.MARIO_SHOE;
        this.rightShoe.tiles = [1, 2];

        this.leftShoulder = disk([-UPPER_BODY_SIZE * .4, 0, 0], SHOULDER_DIAMETER, SHOULDER_LENGTH);
        this.leftShoulder.parent = this.upperBody;
        this.leftShoulder.rotV = -ARMS_SPREAD;
        this.leftShoulder.centerOffset = [0, 0, SHOULDER_LENGTH * .2];
        this.leftShoulder.material = Texture.MARIO_ARM;
        this.leftShoulder.tiles = [0.5, 0.25];

        this.rightShoulder = disk([UPPER_BODY_SIZE * .4, 0, 0], SHOULDER_DIAMETER, SHOULDER_LENGTH);
        this.rightShoulder.parent = this.upperBody;
        this.rightShoulder.rotV = ARMS_SPREAD;
        this.rightShoulder.centerOffset = [0, 0, SHOULDER_LENGTH * .2];
        this.rightShoulder.material = Texture.MARIO_ARM;
        this.rightShoulder.tiles = [0.5, 0.25];

        this.leftArm = disk([0, 0, -SHOULDER_LENGTH * .5], ARM_DIAMETER, ARM_LENGTH);
        this.leftArm.parent = this.leftShoulder;
        this.leftArm.centerOffset = [0, 0, ARM_LENGTH * .5];
        this.leftArm.material = Texture.MARIO_ARM;
        this.leftArm.tiles = [0.5, 0.25];

        this.rightArm = disk([0, 0, -SHOULDER_LENGTH * .5], ARM_DIAMETER, ARM_LENGTH);
        this.rightArm.parent = this.rightShoulder;
        this.rightArm.centerOffset = [0, 0, ARM_LENGTH * .5];
        this.rightArm.material = Texture.MARIO_ARM;
        this.rightArm.tiles = [0.5, 0.25];

        this.leftHand = ball([0, 0, -ARM_LENGTH * .5], HAND_SIZE);
        this.leftHand.parent = this.leftArm;
        this.leftHand.material = Texture.MARIO_HAND;
        this.leftHand.tiles = [1, 2];


        this.rightHand = ball([0, 0, -ARM_LENGTH * .5], HAND_SIZE);
        this.rightHand.parent = this.rightArm;
        this.rightHand.material = Texture.MARIO_HAND;
        this.rightHand.tiles = [1, 2];

        this.head = ellipsoid([0, 0, HEAD_HEIGHT * .35], HEAD_WIDTH, HEAD_WIDTH, HEAD_HEIGHT);
        this.head.parent = this.upperBody;
        this.head.material = Texture.MARIO_FACE;
        this.head.tiles = [2, 1];

        this.nose = ellipsoid([0, HEAD_HEIGHT * .4, -HEAD_HEIGHT * .1], NOSE_WIDTH, NOSE_WIDTH, NOSE_HEIGHT);
        this.nose.parent = this.head;
        this.nose.material = Texture.MARIO_FACE;

        this.leftEye = ellipsoid([-HEAD_WIDTH * .19, HEAD_HEIGHT * .36, HEAD_HEIGHT * .03], EYE_WIDTH, EYE_WIDTH * .5, EYE_HEIGHT);
        this.leftEye.parent = this.head;
        this.leftEye.rotS = -30;
        this.leftEye.material = Texture.MARIO_LEFT_EYE;
        this.leftEye.tiles = [2, 1];

        this.rightEye = ellipsoid([HEAD_WIDTH * .19, HEAD_HEIGHT * .36, HEAD_HEIGHT * .03], EYE_WIDTH, EYE_WIDTH * .5, EYE_HEIGHT);
        this.rightEye.parent = this.head;
        this.rightEye.rotS = 30;
        this.rightEye.material = Texture.MARIO_RIGHT_EYE;
        this.rightEye.tiles = [2, 1];

        this.moustache = gear([0, HEAD_HEIGHT * .1, -HEAD_HEIGHT * .1], MOUSTACHE_WIDTH, MOUSTACHE_HEIGHT * .4, MOUSTACHE_WIDTH * .1, MOUSTACHE_HEIGHT);
        this.moustache.gears = 0.75;
        this.moustache.parent = this.head;
        this.moustache.rotT = 25;
        this.moustache.material = Texture.MARIO_MOUSTACHE;
        this.moustache.tiles = [6, 0.5];

        this.hat = ellipsoid([0, 0, HEAD_HEIGHT * .3], HAT_WIDTH, HAT_WIDTH, HAT_HEIGHT);
        this.hat.parent = this.head;
        this.hat.rotT = -25;
        this.hat.material = Texture.MARIO_ARM;
        this.hat.tiles = [1, 2];

        this.visor = ellipsoid([0, HAT_WIDTH * .15, -HAT_HEIGHT * .3], VISOR_WIDTH, VISOR_WIDTH, VISOR_HEIGHT);
        this.visor.parent = this.hat;
        this.visor.material = Texture.MARIO_ARM;
        this.visor.tiles = [1, 0.2];
        this.visor.rotT = 7;


    }


    animateRunning() {

        // using time to calculate the angle of rotation
        // thus animating realtime and not dependant on PC speed
        this.lastTime += Mecho.dTime * SPEED_MULTIPLIER * .75;
        if (this.lastTime >= 2 * Math.PI)
            this.lastTime -= 2 * Math.PI;

        this.leftThigh.rotT = Math.sin(this.lastTime) * MAX_LEG_ROT;
        this.rightThigh.rotT = -this.leftThigh.rotT;
        this.leftShoulder.rotT = this.rightThigh.rotT;
        this.rightShoulder.rotT = this.leftThigh.rotT;

        if (this.leftThigh.rotT > 0)
            this.leftCalf.rotT = this.leftThigh.rotT;
        else
            this.leftCalf.rotT = 0

        if (this.rightThigh.rotT > 0)
            this.rightCalf.rotT = this.rightThigh.rotT;
        else
            this.rightCalf.rotT = 0

        this.leftArm.rotT = -this.leftCalf.rotT;
        this.rightArm.rotT = -this.rightCalf.rotT;

    }

    retractAnimation() {

        // returning the time back to 0
        // and thus stopping the animation
        // smootly instead of instantly
        if (Math.abs(this.leftThigh.rotT) > 5) {
            if (this.lastTime < Math.PI / 2 || (this.lastTime > Math.PI && this.lastTime < 3 * Math.PI / 2)) {
                this.lastTime -= Mecho.dTime * 2 * SPEED_MULTIPLIER * .75;
            }

            this.animateRunning();
        }
        else if (this.lastTime != 0) {
            this.lastTime = -Mecho.dTime * SPEED_MULTIPLIER * .75;
            this.animateRunning();
        }

    }



}
