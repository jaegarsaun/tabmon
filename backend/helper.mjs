// helper functions

// get stats from storage
export function getStats() {
    return new Promise((resolve, reject) => {
        // get the stats from local storage
        chrome.storage.local.get(['happyLevel', 'hungerLevel', 'lifeLevel'], (result => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }
            // parse int because they are strings at the moment
            const happyLevel = parseInt(result.happyLevel || 0);
            const hungerLevel = parseInt(result.hungerLevel || 0);
            const lifeLevel = parseInt(result.lifeLevel || 0);
            resolve({ happyLevel, hungerLevel, lifeLevel });
        }));
    });
}

// Update stats functions
export async function updateAllStats(hungerLevel, happyLevel, lifeLevel) {
    try {
        await chrome.storage.local.set({ happyLevel, hungerLevel, lifeLevel });
        return true;
    } catch (e) {
        return e;
    }
}

export async function updateHappyStat(happyLevel) {
    console.log('update happy')
    try {
        await chrome.storage.local.set({happyLevel});
        return true;
    } catch (e) {
        return e;
    }
}

export async function updateHungerStat(hungerLevel) {
    console.log('update hunger')
    try {
        await chrome.storage.local.set({hungerLevel});
        return true;
    } catch (e) {
        return e;
    }
}

export async function updateLifeStat(lifeLevel) {
    try {
        await chrome.storage.local.set({lifeLevel});
        return true;
    } catch (e) {
        return e;
    }
}