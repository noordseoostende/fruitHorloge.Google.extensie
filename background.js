chrome.alarms.create( "fruitTimer", {
  periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "fruitTimer") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1
        let isRunning = true
        if (timer === 60 * 25) {
          this.ServiceWorkerRegistration.showNotification("Fruit Timer", {
            body: "25 minuten zijn verstreken",
            icon: "icon.png",
          })
          timer = 0
          isRunning = false
        }

        chrome.storage.local.set({
          timer,
          isRunning,
        })
      }
    })
  }
})

chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  })
})