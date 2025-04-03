import { initStats, interact } from './ui.js';
import { animate } from './animation/sprite.js';

document.addEventListener('DOMContentLoaded', () => {
    // Interaction buttons
    document.getElementById('feed').addEventListener('click', () => interact('feed'));
    document.getElementById('play').addEventListener('click', () => interact('play'));
    
    // Call the initial functions
    initStats();
    animate();

    // Check to see if the stats were changed in the service worker
    chrome.storage.onChanged.addListener((changes, areaName) => {
        console.log(' init changing stats')
        if (areaName === 'local') {
            initStats();
        }
    });
});

