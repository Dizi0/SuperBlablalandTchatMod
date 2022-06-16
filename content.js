/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command === "triggerTchatMod")) {
        const r = document.querySelector(':root');
        const navbar = document.querySelector('.nav');
        const nickname = document.querySelector('.nav-menu_right').innerText.toLowerCase();
        const mpNotifSound = new Audio('https://minosakali.fr/notif.mp3');

        document.querySelector('.simplebar-content-wrapper').setAttribute('id', 'msgBox');
        document.querySelector('.simplebar-content').setAttribute('id', 'scrollSensor');
        let sensor = document.getElementById('scrollSensor');

        sensor.addEventListener("DOMNodeInserted", function(e) {
            const objDiv = document.getElementById("msgBox");
            objDiv.scrollTop = objDiv.scrollHeight;
            const rawMsg =  e.target.innerText.toLowerCase().split(': ')
            const msgSender = rawMsg[0].replace(/^\s+|\s+$/g, '');
            const msgSent = rawMsg[1]

            if (msgSender === nickname) {
                e.target.style.color = '#00bcd4'
            } else if (msgSent.includes(nickname)) {
                e.target.style.color = '#18CB00FF';
                mpNotifSound.play();
            } else if (msgSender.includes('mp de ')) {
                mpNotifSound.play();
            }
        }, false);

        const sheet = new CSSStyleSheet();

        sheet.replaceSync('.text-blabla {color: white}');

        let body = document.querySelector('body');

        // Apply the stylesheet to a document:
        document.adoptedStyleSheets = [sheet];
        body.style.backgroundColor = '#263238'
        body.style.setProperty('background-image', 'unset');
        navbar.style.setProperty('position', 'unset');
        r.style.setProperty('--blue', 'lightblue');
        r.style.setProperty('--clr-white', '#303030');
        r.style.setProperty('--clr-black', '#b5b5b5');
        r.style.setProperty('--clr-input-error', '#eb77db');
        r.style.setProperty('--clr-input-error-transparent', 'rgba(199, 26, 14, .2)');
        r.style.setProperty('--clr-input-error-dark', '#270704');
        r.style.setProperty('--clr-input-error-transparent-dark', 'rgba(39, 7, 4, .2)');
        r.style.setProperty('--clr-gratos', '#0000ff');
        r.style.setProperty('--clr-classique', '#00c3ff');
        r.style.setProperty('--clr-fun', '#00bd00');
        r.style.setProperty('--clr-choc', '#ffd900');
        r.style.setProperty('--clr-style', '#ff0000');
        r.style.setProperty('--clr-super', '#ff24ff');
        r.style.setProperty('--clr-legendaire', '#8900ff');
        r.style.setProperty('--clr-staff', '#ff7900');
        r.style.setProperty('--clr-com', '#4BBF6B');
        r.style.setProperty('--clr-sm', '#1e88e5');
        r.style.setProperty('--clr-modo', '#009DDF');
        r.style.setProperty('--clr-pm', '#6cd3ff');
        r.style.setProperty('--clr-vip', '#ff24ff');
        r.style.setProperty('--clr-status-weird', '#bb196a');
        r.style.setProperty('--clr-status-danger', '#f44251');
        r.style.setProperty('--clr-status-ban', '#201b1b');
        r.style.setProperty('--tchat-border', 'rgb(0 0 0/80%');
        r.style.setProperty('--tchat-message-hover', '#3e3e3e');

    }
    return msg
});
