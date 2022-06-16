document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        const checkPageButton = document.getElementById('checkPage');
        if (tabs[0]['url'] !== 'https://www.superblablaland.com/tchat') {
            return false;
        }
        checkPageButton.addEventListener('click', function() {
            chrome.tabs.sendMessage(tabs[0]['id'],
                {
                    command: "triggerTchatMod",
                    title: "TchatMod"
                },
                function() {
                    console.log('Successfully started TchatMod');
                });
        });
    });
});
