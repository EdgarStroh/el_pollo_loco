/**
 * Enters fullscreen mode for the entire document.
 * @returns {void}
 */
function fullscreen() {
    enterFullscreen(document.documentElement);
}

/**
 * Enters fullscreen mode for the specified element.
 * Tries to use different browser-specific methods for fullscreen.
 * @param {Element} element - The DOM element to display in fullscreen.
 * @returns {void}
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Toggles between entering and exiting fullscreen mode.
 * Updates the fullscreen button image based on the current fullscreen state.
 * @returns {void}
 */
function toggleFullscreen() {
    const buttonImage = document.querySelector('.fullscreen-btn img');
    if (document.fullscreenElement) {
        exitFullscreen();
        buttonImage.src = '/icons/fullscreenOpen.png';
    } else {
        enterFullscreen(document.documentElement);
        buttonImage.src = '/icons/fullscreenClose.png';
    }
}

/**
 * Exits fullscreen mode if currently in fullscreen.
 * Tries to use different browser-specific methods for exiting fullscreen.
 * @returns {void}
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Checks the current screen orientation and shows or hides a popup based on whether the device is in landscape mode.
 * The popup is displayed in portrait mode and hidden in landscape mode.
 * @returns {void}
 */
function checkLandscapeMode() {
    const popup = document.getElementById("orientationPopup");
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (popup) {
            popup.style.display = "none";
        }
    } else {
        if (popup) {
            popup.style.display = "flex";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("resize", checkLandscapeMode);
});
