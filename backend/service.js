// import helper functions
import { getStats, updateAllStats, updateHappyStat, updateLifeStat, updateHungerStat } from "./helper.mjs";
// Set base stats
async function initializeStats() {
    // TODO Change life level value to a higher value for later
    await chrome.storage.local.set({ happyLevel: 5, hungerLevel: 5, lifeLevel: 5 });
}

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





