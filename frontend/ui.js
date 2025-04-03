const maxStatLvl = 5;
import { getStats, updateHappyStat, updateHungerStat } from '../backend/helper.mjs';
// Logic for button interaction
export async function interact(id) {
    try {
        const stats = await getStats();
        let updated = false;

        if (id === 'play' && stats.happy.level < maxStatLvl) {
            await updateHappyStat({ stats, happyLevel: stats.happy.level + 1 });
            updated = true;
        }

        if (id === 'feed' && stats.hunger.level < maxStatLvl) {
            await updateHungerStat({ stats, hungerLevel: stats.hunger.level + 1 });
            updated = true;
        }

        if (updated) {
            console.log("Stats updated successfully");
        }
    } catch (error) {
        console.error('Failed to interact:', error);
    }
}
// Initialize ui stats
export async function initStats() {
    console.log('changing stats')
    const happyParent = document.getElementById("happiness");
    const hungerParent = document.getElementById("hunger");

    happyParent.innerHTML = '';
    hungerParent.innerHTML = '';

    try {
        const stats = await getStats();

        for (let i = 1; i <= stats.happy.level; i++) {
            const div = document.createElement("div");
            div.classList.add("happybar");
            happyParent.appendChild(div);
        }

        for (let i = 1; i <= stats.hunger.level; i++) {
            const div = document.createElement("div");
            div.classList.add("hungerbar");
            hungerParent.appendChild(div);
        }
    } catch (e) {
        console.error('Error loading stats:', e);
    }
}

