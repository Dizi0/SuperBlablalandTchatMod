document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.getSelected(null, function(tab){
        var checkPageButton = document.getElementById('checkPage');
        checkPageButton.addEventListener('click', function() {
            chrome.tabs.sendMessage(tab.id,
            {
                command: "triggerTchatMod",
                title: "TchatMod"
            },
            function(msg) {
                console.log('Successfully started script' , msg);
            });
        });
    });
});
