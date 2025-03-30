import { interact } from './stats.js';
import { initStats } from './ui.js';
import { startAnimation } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    // Interaction buttons
    document.getElementById('feed').addEventListener('click', () => interact('feed'));
    document.getElementById('play').addEventListener('click', () => interact('play'));
    
    // Call the initial functions
    initStats();
    startAnimation();

    // Check to see if the stats were changed in the service worker
    chrome.storage.onChanged.addListener((changes, areaName) => {
        console.log(' init changing stats')
        if (areaName === 'local') {
            initStats();
        }
    });
});

