let audio = new Audio('http://listen.vo.llnwd.net/g3/4/1/9/1/5/1302051914.mp3');
audio.play();

let muteButton = document.querySelector('button.mute');
let muteButtonIcon = muteButton.querySelector('i');
let volumeBar = document.querySelector('.volume-bar');
let fillBar = volumeBar.querySelector('.fill');

let mouseDown = false;

function chooseIcon(audioPlayer) {
    if (audioPlayer < 0.5) {
        return muteButtonIcon.innerHTML = "volume_down";
    } else {
        return muteButtonIcon.innerHTML = "volume_up";
    }
}

muteButton.addEventListener('click', function() {
    if (audio.muted) {
        audio.muted = false;
        chooseIcon(audio.volume);
    } else {
        audio.muted = true;
        muteButtonIcon.innerHTML = "volume_muted";
    }
});

function clamp(min, val, max) {
    return Math.min(Math.max(min, val), max);
}

function getP(e) {
    let p = (e.clientX - volumeBar.offsetLeft) / volumeBar.clientWidth;
    p = clamp(0, p, 1);

    return p;
}

volumeBar.addEventListener('mousedown', function(e) {
    mouseDown = true;

    let p = getP(e);

    fillBar.style.width = p * 100 + '%';

    audio.muted = false;
    chooseIcon(p);

});

window.addEventListener('mousemove', function(e) {
    if (!mouseDown) return;

    let p = getP(e);

    fillBar.style.width = p * 100 + '%';

    audio.muted = false;
    audio.volume = p;
    chooseIcon(p);
});


window.addEventListener('mouseup', function(e) {
    if (!mouseDown) return;

    mouseDown = false;
});
