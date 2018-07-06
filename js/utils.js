function getCordFromURL(url) {
    if (!url) url = window.location.href;
    var regExCoord = /l[a|n][t|g]=\d+.\d+/g;
    var coords = [];
    var cord = {};
    var res = regExCoord.exec(url);

    while (res !== null) {
        coords.push(res)
        res = regExCoord.exec(url)
    }

    if (coords.length === 2) {
        for (var i = 0; i < coords.length; i++) {
            let getIdx = coords[i][0].indexOf('=');
            let cordName = coords[i][0].slice(0, getIdx);
            cord[cordName] = Number(coords[i][0].slice(getIdx + 1));
        }
        console.log('cord from URL is:', cord);
        return cord;
    }
    return false;
}

function getURL() {
    // let url = window.location.href;
    // http[s]?:\/\/[\w./]+\/
    var url = 'https://razielll.github.io/travelTip/';
    return url;
}


function closeModal() {
    document.querySelector('.modal').classList.remove('open')
}


function initDisplay() {
    document.querySelector('.start-content').classList.remove('center-content-start')
    document.querySelector('#map').classList.remove('opa')
};


export default {
    getCordFromURL,
    initDisplay,
    getURL,
    closeModal
}