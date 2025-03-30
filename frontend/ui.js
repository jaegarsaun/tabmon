import { getStats } from './stats.js';

export async function initStats() {
    console.log('changing stats')
    // Get the parent containers from the dom
    const happyParent = document.getElementById("happiness");
    const hungerParent = document.getElementById("hunger");
    
    // Make sure we completely clear the dom first before doing anything else to prevent duplicates
    happyParent.innerHTML = '';
    hungerParent.innerHTML = '';

    try {
        const stats = await getStats();
        // Create a new bar element for each level. ex: Level = 5; Create 5 bar elements
        for (let i = 1; i <= stats.happyLevel; i++) {
            const div = document.createElement("div");
            div.classList.add("happybar");
            happyParent.appendChild(div);
        }

        for (let i = 1; i <= stats.hungerLevel; i++) {
            const div = document.createElement("div");
            div.classList.add("hungerbar");
            hungerParent.appendChild(div);
        }
    } catch (e) {
        console.error('Error loading stats:', e);
    }
}
