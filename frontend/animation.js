const canvas = document.getElementById('pet');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = 120;
const canvasHeight = canvas.height = 120;

const petImage = new Image();
petImage.src = "assets/chick-sprite-sheets/IdleRight.png";
const spriteWidth = 240;
const spriteHeight = 240;
const scaledWidth = 60;
const scaledHeight = 60;

let frameX = 0;
let frameY = 0;
const xPos = (canvasWidth / 2) - scaledWidth / 2;
const yPos = 56
let count = 0;
let pauseCounter = 0;
const pauseFrames = 10; // number of frames to pause at (0,0)

export function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(
        petImage,
        frameX * spriteWidth,
        frameY * spriteHeight,
        spriteWidth, spriteHeight,
        xPos, yPos,
        scaledWidth, scaledHeight
    );

    if (count > 7) {
        if (frameX === 0 && frameY === 0 && pauseCounter < pauseFrames) {
            // Stay on (0,0) for extra frames
            pauseCounter++;
        } else {
            // Move to next frame
            pauseCounter = 0;
            if (frameX < 2) {
                frameX++;
            } else {
                frameX = 0;
                frameY++;
            }

            if (frameY === 5) {
                frameY = 0;
            }
        }
        count = 0;
    }

    count++;
    requestAnimationFrame(animate);
}

