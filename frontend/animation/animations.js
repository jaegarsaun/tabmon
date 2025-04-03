const animationList = {
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

Object.keys(animationList).forEach(key => {
    const img = new Image();
    img.src = animationList[key].src;
    img.onerror = () => console.error(`Failed to load ${key} from ${img.src}`);
    animationList[key].img = img;
});

export default animationList;
