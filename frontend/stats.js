const maxStatLvl = 5;
// Get stats from storage helper function
export function getStats() {
    return new Promise((resolve, reject) => {
        // get the stats from local storage
        chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }
            // parse int because they are strings at the moment
            const happyLevel = parseInt(result.happyLevel || 0);
            const hungerLevel = parseInt(result.hungerLevel || 0);
            resolve({ happyLevel, hungerLevel });
        }));
    });
}
// Logic for button interaction
export async function interact(id) {
    try {
        const { happyLevel, hungerLevel } = await getStats();
        let updatedStats = {};
        // Conditional logic to decide what button was pressed
        // If the current levels are at the max dont do anything
        if (id === 'play' && happyLevel < maxStatLvl) {
            updatedStats.happyLevel = happyLevel + 1;
        }

        if (id === 'feed' && hungerLevel < maxStatLvl) {
            updatedStats.hungerLevel = hungerLevel + 1;
        }
        // Update the storage to reflect the changes
        if (Object.keys(updatedStats).length > 0) {
            chrome.storage.local.set(updatedStats);
        }
    } catch (error) {
        console.error('Failed to interact:', error);
    }
}