// import { animationList } from "./animations";
const canvas = document.getElementById('pet');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const canvasWidth = canvas.width = 120;
const canvasHeight = canvas.height = 120;

const petImage = new Image();
petImage.src = "assets/chick-sprite-sheets/IdleRight.png";

let frameX = 0;
let frameY = 0;
let count = 0;
let pauseCounter = 0;
const pauseFrames = 10; // number of frames to pause at (0,0)
const currentAnimation = 'idleRight'

// load the animations into an object to easily use them later
export const animationList = {
    idleRight: {
        src: 'assets/chick-sprite-sheets/IdleRight.png',
        cols: 3,
        rows: 5,
        frameWidth: 240,
        frameHeight: 240,
        scale: 0.25,
        pauseOnStart: true
    },
    idleLeft: {
        src: 'assets/chick-sprite-sheets/IdleLeft.png',
        cols: 3,
        rows: 5,
        frameWidth: 240,
        frameHeight: 240,
        scale: 0.25,
        pauseOnStart: true
    },
    walkRight: {
        src: 'assets/chick-sprite-sheets/WalkCycleRight.png',
        cols: 3,
        rows: 3,
        frameWidth: 240,
        frameHeight: 240,
        scale: 0.25,
        pauseOnStart: false,
        shouldSkipFrame: (x, y) => x === 2 && y === 2
    },
    walkLeft: {
        src: 'assets/chick-sprite-sheets/WalkCycleLeft.png',
        cols: 3,
        rows: 3,
        frameWidth: 240,
        frameHeight: 240,
        scale: 0.25,
        pauseOnStart: false,
        shouldSkipFrame: (x, y) => x === 2 && y === 2
    },
    happyLeft: {
        src: 'assets/chick-sprite-sheets/HappyLeft.png',
        cols: 3,
        rows: 5,
        frameWidth: 240,
        frameHeight: 240,
        scale: 0.25,
        pauseOnStart: false
    },
    happyRight: {
        src: 'assets/chick-sprite-sheets/HappyRight.png',
        cols: 3,
        rows: 5,
        frameWidth: 240,
        frameHeight: 240,
        scale: 0.25,
        pauseOnStart: false
    }

}
// preload all images
Object.keys(animationList).forEach(key => {
    const img = new Image();
    img.src = animationList[key].src;
    img.onerror = () => console.error(`Failed to load ${key} from ${img.src}`);
    animationList[key].img = img;
});

// animate function
export function animate() {
    const anim = animationList[currentAnimation];
    const {
        img,
        cols,
        rows,
        frameWidth,
        frameHeight,
        scale,
        pauseOnStart
    } = anim;

    const scaledWidth = frameWidth * scale;
    const scaledHeight = frameHeight * scale;
    const xPos = (canvasWidth / 2) - scaledWidth / 2;
    const yPos = canvasHeight - scaledHeight;

    // clear everything before redrawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(
        img,
        frameX * frameWidth,
        frameY * frameHeight,
        frameWidth, frameHeight,
        xPos, yPos,
        scaledWidth, scaledHeight
    );
    // count describes how long each frame lasts
    if (count > 15) {
        // pause at the start of certain animations
        if (frameX === 0 && frameY === 0 && pauseOnStart && pauseCounter < pauseFrames) {
            pauseCounter++;
        } else {
            pauseCounter = 0;
            do {
                frameX++;
                if (frameX >= cols) {
                    frameX = 0;
                    frameY++;
                    if (frameY >= rows) {
                        frameY = 0;
                    }
                }
                // for certain animations i want to skip the last frame because its blank
            } while (anim.shouldSkipFrame && anim.shouldSkipFrame(frameX, frameY));
        }
        count = 0;
    }

    count++;
    requestAnimationFrame(animate);
}

