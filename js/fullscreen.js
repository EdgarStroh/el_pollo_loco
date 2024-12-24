function fullscreen() {
    enterFullscreen(document.documentElement);  // Setzt den gesamten HTML-Body auf Fullscreen
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();  // Modernere Browser
    } else if (element.msRequestFullscreen) {  // Für IE11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // Für Safari (iOS)
        element.webkitRequestFullscreen();
    }
}
function toggleFullscreen() {
    const buttonImage = document.querySelector('.fullscreen-btn img');

    if (document.fullscreenElement) {
        // Wenn der Bildschirm im Fullscreen-Modus ist, verlasse den Fullscreen-Modus
        exitFullscreen();
        // Ändere das Bild zurück zu 'fullscreenOpen'
        buttonImage.src = 'icons/fullscreenOpen.png';
    } else {
        // Wenn der Bildschirm nicht im Fullscreen-Modus ist, aktiviere den Fullscreen-Modus
        enterFullscreen(document.documentElement);
        // Ändere das Bild zu 'fullscreenClose'
        buttonImage.src = 'icons/fullscreenClose.png';
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
