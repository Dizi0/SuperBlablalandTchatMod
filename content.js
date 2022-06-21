/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    let preferences = msg.data.Preferences

    if (localStorage.getItem('SbblTchatModPreferences') === undefined) {
        localStorage.setItem('SbblTchatModPreferences', JSON.stringify(preferences));
    } else if (JSON.stringify(preferences) !== localStorage.getItem('SbblTchatModPreferences') ) {
        localStorage.setItem('SbblTchatModPreferences', JSON.stringify(preferences))
    }

    if (msg.command && (msg.command === "triggerTchatMod")) {
        const navbar = document.querySelector('.nav');
        const nickname = document.querySelector('.nav-menu_right').innerText.toLowerCase();
        const mpNotifSound = new Audio('https://minosakali.fr/notif.mp3');

        document.querySelector('.simplebar-content-wrapper').setAttribute('id', 'msgBox');
        document.querySelector('.simplebar-content').setAttribute('id', 'scrollSensor');

        let sensor = document.getElementById('scrollSensor');

        sensor.addEventListener("DOMNodeInserted", function(e) {
            if (preferences.autoScroll === true) {
                const objDiv = document.getElementById("msgBox");
                objDiv.scrollTop = objDiv.scrollHeight;
            }

            const rawMsg =  e.target.innerText.toLowerCase().split(': ')
            const msgSender = rawMsg[0].replace(/^\s+|\s+$/g, '');
            const msgSent = rawMsg[1]

            if (msgSender === nickname) {
                e.target.style.color = preferences.myMsgColor
            } else if (msgSender.includes('mp de ')) {
                if (preferences.notifSound === true) {
                    mpNotifSound.play();
                }
            } else if (msgSent.includes(nickname)) {
                e.target.style.color = preferences.pingMsg;
                if (preferences.notifSound === true) {
                    mpNotifSound.play();
                }
            }
        }, false);


        if (preferences.nightMode === true) {
            const sheet = new CSSStyleSheet();

            sheet.replaceSync('.text-blabla {color: white}');

            let body = document.querySelector('body');
            let root = document.querySelector(':root');
            let contentSite = document.querySelector('.content-site');

            // Apply the stylesheet to a document:
            document.adoptedStyleSheets = [sheet];
            body.style.backgroundColor = '#263238'

            body.style.setProperty('background-image', 'unset');

            navbar.style.setProperty('position', 'unset');

            contentSite.style.setProperty('padding' , 'unset');
            contentSite.style.setProperty('margin-bottom' , '70px');

            root.style.setProperty('--blue', 'lightblue');
            root.style.setProperty('--clr-white', '#303030');
            root.style.setProperty('--clr-black', '#b5b5b5');
            root.style.setProperty('--clr-input-error', '#eb77db');
            root.style.setProperty('--clr-input-error-transparent', 'rgba(199, 26, 14, .2)');
            root.style.setProperty('--clr-input-error-dark', '#270704');
            root.style.setProperty('--clr-input-error-transparent-dark', 'rgba(39, 7, 4, .2)');
            root.style.setProperty('--clr-gratos', '#0000ff');
            root.style.setProperty('--clr-classique', '#00c3ff');
            root.style.setProperty('--clr-fun', '#00bd00');
            root.style.setProperty('--clr-choc', '#ffd900');
            root.style.setProperty('--clr-style', '#ff0000');
            root.style.setProperty('--clr-super', '#ff24ff');
            root.style.setProperty('--clr-legendaire', '#8900ff');
            root.style.setProperty('--clr-staff', '#ff7900');
            root.style.setProperty('--clr-com', '#4BBF6B');
            root.style.setProperty('--clr-sm', '#1e88e5');
            root.style.setProperty('--clr-modo', '#009DDF');
            root.style.setProperty('--clr-pm', '#6cd3ff');
            root.style.setProperty('--clr-vip', '#ff24ff');
            root.style.setProperty('--clr-status-weird', '#bb196a');
            root.style.setProperty('--clr-status-danger', '#f44251');
            root.style.setProperty('--clr-status-ban', '#201b1b');
            root.style.setProperty('--tchat-border', 'rgb(0 0 0/80%');
            root.style.setProperty('--tchat-message-hover', '#3e3e3e');

        }
    }

    sendResponse('Success');
});
