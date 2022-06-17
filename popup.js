document.addEventListener('DOMContentLoaded', function() {
    const coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        const checkPageButton = document.getElementById('checkPage');
        if (tabs[0]['url'] !== 'https://www.superblablaland.com/tchat') {
            return false;
        }
        if (localStorage.getItem('SbblTchatModPreferences')) {
            const OldPrefs = JSON.parse(localStorage.getItem('SbblTchatModPreferences')).Preferences

            Object.entries(OldPrefs).forEach(([key, value]) => {
                if (typeof value === "boolean") {
                    document.getElementById(key).checked = value;
                } else {
                    document.getElementById(key).value = value;
                }
            });
        } else {
            document.getElementById('nightMode').checked = true;
            document.getElementById('autoScroll').checked = true;
            document.getElementById('notifSound').checked = true;

            document.getElementById('myMsgColor').value = '#00bcd4';
            document.getElementById('pingMsg').value = '#1bc104';
        }

        checkPageButton.addEventListener('click', function() {
            let nightMode = document.getElementById('nightMode').checked;
            let autoScroll = document.getElementById('autoScroll').checked;
            let notifSound = document.getElementById('notifSound').checked;
            let myMsgColor = document.getElementById('myMsgColor').value;
            let pingMsg = document.getElementById('pingMsg').value;

            let preferences = {
                "Preferences" : {
                    "nightMode" : nightMode,
                    "autoScroll" : autoScroll,
                    "notifSound" : notifSound,
                    "myMsgColor" : myMsgColor,
                    "pingMsg" : pingMsg,
                }
            }

            chrome.tabs.sendMessage(tabs[0]['id'],
                {
                    command: "triggerTchatMod",
                    title: "TchatMod",
                    data: preferences
                },

                function() {
                    if (localStorage.getItem('SbblTchatModPreferences') === undefined) {
                        localStorage.setItem('SbblTchatModPreferences', JSON.stringify(preferences));
                    } else if (JSON.stringify(preferences) !== localStorage.getItem('SbblTchatModPreferences') ) {
                        localStorage.setItem('SbblTchatModPreferences', JSON.stringify(preferences))
                    }
                    console.log('Successfully started TchatMod');
                });
        });
    });
});
