// import helper functions
import { getStats, updateHappyStat, updateLifeStat, updateHungerStat} from "./helper.mjs";
// Set base stats
async function initializeStats() {
    // TODO Change life level value to a higher value for later
    await chrome.storage.local.set({ happyLevel: 5, hungerLevel: 5, lifeLevel: 5 });

    const date = Date.now();
    const stats = {
        happy: {
            level: 5,
            lastUpdated: date
        },
        hunger: {
            level: 5,
            lastUpdated: date
        },
        life:{
            level: 5,
            lastUpdated: date
        }
    }

    await chrome.storage.local.set({stats: stats});
}

async function dropStats(){
    const stats = await getStats();
    console.log('dropping stats')
    console.log(stats)
    if(stats.happy.level === 0 && stats.hunger.level === 0){
        console.log('not dropping stats')
        // Later we will drop a life level if any of these are 0 for too long
        // Probably will have it check time stamps of when they were last updated to decide to drop life or not
        return;
    }

    let ran = Math.floor(Math.random() * 100);

    let happyLevel = stats.happy.level;
    let hungerLevel = stats.hunger.level;

    // If number is even drop happy level if odd drop hunger level
    if(ran % 2 == 0){
        console.log('drop happy')
        happyLevel = Math.max(0, happyLevel - 1);
        await updateHappyStat({stats, happyLevel});
    }else{
        console.log('drop hunger')
        hungerLevel = Math.max(0, hungerLevel - 1);
        await updateHungerStat({stats, hungerLevel});
    }
}
async function dropLife(){
    const stats = await getStats();
    console.log(stats);

}
// On startup
chrome.runtime.onStartup.addListener(async() => {
    // chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
    //     // if the stats are undefined or not there make sure to set them
    //     if (result.happyLevel === undefined || result.hungerLevel === undefined) {
    //         initializeStats();
    //     }
    // })

    chrome.storage.local.get(['stats'], (result) => {
        if (!result.stats){
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
chrome.runtime.onInstalled.addListener(async () => {
    // chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
    //     // if the stats are undefined or not there make sure to set them
    //     if (result.happyLevel === undefined || result.hungerLevel === undefined) {
    //         initializeStats();
    //     }
    // })

    chrome.storage.local.get(['stats'], (result) => {
        if (!result.stats){
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





