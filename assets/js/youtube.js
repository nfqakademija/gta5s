// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        videoId: 'QkkoHAzjnUs',
        playerVars: {
            color: 'white',
            modestbranding: 1,
            rel: 0,
            showinfo: 0
        }
    });
}

window.tag = tag;
window.firstScriptTag = firstScriptTag;
window.player = player;
window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;