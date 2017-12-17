import {Spinner} from 'spin.js';
import "../css/spinner.scss";

var opts = {
    lines: 20, // The number of lines to draw
    length: 0, // The length of each line
    width: 26, // The line thickness
    radius: 19, // The radius of the inner circle
    scale: 0.5, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#bc719e', // CSS color or array of colors
    fadeColor: '#483B4C', // CSS color or array of colors
    opacity: 0.15, // Opacity of the lines
    rotate: 31, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 1.6, // Rounds per second
    trail: 48, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '44%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: null, // Box-shadow for the lines
    position: 'absolute' // Element positioning
};

var target = document.querySelector('.loading-screen');
var spinner = new Spinner(opts).spin(target);

// Activate spinner

window.addEventListener("load", function() {
    document.querySelector(".loading-screen").style.display = "none";
    document.querySelector(".wrap").style.visibility = "visible";
    document.querySelector("footer").style.visibility = "visible";
});
