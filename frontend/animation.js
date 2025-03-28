// canvas & animation constants
const canvas = document.getElementById('pet');
const context = canvas.getContext('2d');
const width = canvas.width = 315;
const height = canvas.height = 405;
const frameWidth = 64;
const frameHeight = 100;
const xPos = 100;
const yPos = 225;
const scale = 2;
let frameIndex = 0;
let count = 0;

canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";

// sprite sheets
const idleSpriteSheet = new Image();
idleSpriteSheet.src = "img/64x64/2d/idle.png";

export function animate() {
    context.drawImage(
        idleSpriteSheet,
        frameIndex * frameWidth,
        0,
        frameWidth,
        frameHeight,
        xPos,
        yPos,
        frameWidth * scale,
        frameHeight * scale
    );
    count++;
    if (count > 10) {
        frameIndex++;
        count = 0;
    }
    if (frameIndex > 6) {
        frameIndex = 0;
    }
}

export function startAnimation() {
    function frame() {
        context.clearRect(0, 0, width, height);
        animate();
        requestAnimationFrame(frame);
    }
    frame();
}