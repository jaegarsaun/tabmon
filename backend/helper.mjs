// helper functions

// get stats from storage
// export function getStats() {
//     return new Promise((resolve, reject) => {
//         // get the stats from local storage
//         chrome.storage.local.get(['happyLevel', 'hungerLevel', 'lifeLevel'], (result => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//                 return;
//             }
//             // parse int because they are strings at the moment
//             const happyLevel = parseInt(result.happyLevel || 0);
//             const hungerLevel = parseInt(result.hungerLevel || 0);
//             const lifeLevel = parseInt(result.lifeLevel || 0);
//             resolve({ happyLevel, hungerLevel, lifeLevel });
//         }));
//     });
// }

export function getStats(){
    // create a new promise to get the stats
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['stats'], (result => {
            // say no to errors and leave!!
            if(chrome.runtime.lastError){
                reject(chrome.runtime.lastError);
                return;
            }
            const stats = result.stats;
            resolve(stats);
        }))
    })
}

export async function updateHappyStat({stats, happyLevel}) {
    console.log('update happy')

    if(stats.happy){
        stats.happy.level = happyLevel;
        stats.happy.lastUpdated = Date.now();
    }

    try {
        await chrome.storage.local.set({stats});
        return true;
    } catch (e) {
        return e;
    }
}

export async function updateHungerStat({stats, hungerLevel}) {
    console.log('update hunger')
    if(stats.hunger){
        stats.hunger.level = hungerLevel;
        stats.hunger.lastUpdated = Date.now();
    }

    try {
        await chrome.storage.local.set({stats});
        return true;
    } catch (e) {
        return e;
    }
}

export async function updateLifeStat({stats, lifeLevel}) {
    if(stats.life){
        stats.life.level = lifeLevel;
        stats.life.lastUpdated = Date.now();
    }

    try {
        await chrome.storage.local.set({stats});
        return true;
    } catch (e) {
        return e;
    }
}