// import helper functions
import { getStats, updateAllStats, updateHappyStat, updateLifeStat, updateHungerStat } from "./helper.mjs";
// Set base stats
async function initializeStats() {
    // TODO Change life level value to a higher value for later
    await chrome.storage.local.set({ happyLevel: 5, hungerLevel: 5, lifeLevel: 5 });
}



// // // Happiness & Hunger
// // Function to decide when stats should drop
// function updateStats() {
//     console.log('updateing')
//     chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
//         // Parse the ints!!!
//         let happyLevel = parseInt(result.happyLevel);
//         let hungerLevel = parseInt(result.hungerLevel);

//         // If these are zero, dont do anything else. Later on we can track this and decide when the pet dies rip
//         if (happyLevel === 0 && hungerLevel === 0) {
//             return;
//         }

//         let ran1 = Math.floor(Math.random() * 10);
//         let ran2 = Math.floor(Math.random() * 10);
//         // 70% chance to deduct a stat level from the character's stats
//         if (ran1 < 7) {
//             happyLevel = Math.max(0, happyLevel - 1);
//         }

//         if (ran2 < 7) {
//             hungerLevel = Math.max(0, hungerLevel - 1);
//         }
//         // Update the stats
//         // chrome.storage.local.set({ happyLevel, hungerLevel }, () => {
//         //     console.log('Stats updated:', { happyLevel, hungerLevel });
//         // });
//         chrome.storage.local.set({ happyLevel, hungerLevel });
//     });
// }

async function dropStats(){
    const stats = await getStats();
    console.log('dropping stats')
    console.log(stats)
    if(stats.happyLevel === 0 && stats.hungerLevel === 0){
        console.log('not dropping stats')
        // Later we will drop a life level if any of these are 0 for too long
        // Probably will have it check time stamps of when they were last updated to decide to drop life or not
        return;
    }

    let ran = Math.floor(Math.random() * 100);

    // If number is even drop happy level if odd drop hunger level
    if(ran % 2 == 0){
        console.log('drop happy')
        stats.happyLevel = Math.max(0, stats.happyLevel - 1);
        updateHappyStat(stats.happyLevel);
    }else{
        console.log('drop hunger')
        stats.hungerLevel = Math.max(0, stats.hungerLevel - 1);
        updateHungerStat(stats.hungerLevel);
    }
}

// On startup
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
        // if the stats are undefined or not there make sure to set them
        if (result.happyLevel === undefined || result.hungerLevel === undefined) {
            initializeStats();
        }
    })

    // Create the alarm to start updating the stats every x minutes
    chrome.alarms.create('stats-alarm', {
        delayInMinutes: .5,
        periodInMinutes: .5
    });

});
// On install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
        // if the stats are undefined or not there make sure to set them
        if (result.happyLevel === undefined || result.hungerLevel === undefined) {
            initializeStats();
        }
    })

    // Create the alarm to start updating the stats every x minutes
    chrome.alarms.create('stats-alarm', {
        delayInMinutes: .5,
        periodInMinutes: .5
    });
});

// Listen to alarm so the stats update
chrome.alarms.onAlarm.addListener((alarm) => {

    if (alarm.name === 'stats-alarm') {
        dropStats();
    }
});





