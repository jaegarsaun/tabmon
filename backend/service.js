
// Set base stats
async function initializeStats() {
    await chrome.storage.local.set({ happyLevel: 5, hungerLevel: 5 });
    const result = await chrome.storage.local.get(['happyLevel', 'hungerLevel']);
    console.log(result);
}



// // Happiness & Hunger
// Function to decide when stats should drop
function updateStats() {
    console.log('updateing')
    chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
        // Parse the ints!!!
        let happyLevel = parseInt(result.happyLevel);
        let hungerLevel = parseInt(result.hungerLevel);

        // If these are zero, dont do anything else. Later on we can track this and decide when the pet dies rip
        if (happyLevel === 0 && hungerLevel === 0) {
            return;
        }

        // Crud way of deciding if the pet should lose a point on their stats
        // Lets change this later. Ideally I would want that on average every 15-20 minutes their pet loses a stat
        // But reminder this whole file will go inactive if something doesnt run every 30s

        let ran1 = Math.floor(Math.random() * 10);
        let ran2 = Math.floor(Math.random() * 10);
        // If the random num is below 3 then deduct a level
        if (ran1 < 3) {
            happyLevel = Math.max(0, happyLevel - 1);
        }

        if (ran2 < 3) {
            hungerLevel = Math.max(0, hungerLevel - 1);
        }
        // Update the stats
        chrome.storage.local.set({ happyLevel, hungerLevel }, () => {
            console.log('Stats updated:', { happyLevel, hungerLevel });
        });
    });
}

// On startup
chrome.runtime.onStartup.addListener(() => {
    console.log('start')
    chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
        if (result.happyLevel === undefined || result.hungerLevel === undefined) {
            console.log('undefined')
            initializeStats();
        }
    })

    // Create the alarm to start updating the stats every x minutes
    chrome.alarms.create('stats-alarm', {
        delayInMinutes: 1,
        periodInMinutes: 1
    });

    // // Start updating stats 
    // updateStats();
    // // Then repeat every 15 seconds
    // setInterval(updateStats, 15000);
});

chrome.runtime.onInstalled.addListener(() => {
    console.log('install')
    chrome.storage.local.get(['happyLevel', 'hungerLevel'], (result) => {
        if (result.happyLevel === undefined || result.hungerLevel === undefined) {
            console.log('undefined')
            initializeStats();
        }
    })

    // Create the alarm to start updating the stats every x minutes
    console.log('created alarm')
    chrome.alarms.create('stats-alarm', {
        delayInMinutes: 0.5,
        periodInMinutes: 0.5
    });

    // Start updating stats 
    // console.log('update now')
    // updateStats();
    // Then repeat every 15 seconds
    // TODO MAKE THIS AN ALARM IN THE FUTURE.
    // ALARM WILL WAKE SERVICE WORKER UP AFTER INACTIVITY.
});

// Listen to alarm so the stats update
chrome.alarms.onAlarm.addListener((alarm) => {

    if (alarm.name === 'stats-alarm') {
        console.log('update now')
        updateStats();
    }
});





