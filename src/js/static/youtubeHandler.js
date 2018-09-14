/////////////////////////////////////////////////
// Youtube Player API (load & play yt video)
/////////////////////////////////////////////////
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
if(typeof videoId === 'undefined') var videoId = 'FlsCjmMhFmw'; //youtube rewind inseted if no videoId found
var player;
function onYouTubeIframeAPIReady() {
    console.log("onYouTubeIframeAPIReady: setting screen size to > w:"+window.innerWidth+" h:"+window.innerHeight)
    player = new YT.Player('player', {
        width: window.innerWidth,
        height: window.innerHeight * 0.65,
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// params for new YT.Player()
//    playerVars: {
//        start: 25,
//        end: 30
//    },

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

//trying to load and play video
function onClickLoadVideo(startTime, duration){
    console.log("onClickLoadVideo called");
    player.loadVideoById({
        'videoId': videoId,
        'startSeconds': startTime,
        'endSeconds': startTime+duration,
        'suggestedQuality': 'default'
    });
}

/////////////////////////////////////////////////
// Communication with sketch.js (a p5js file)
/////////////////////////////////////////////////
// Callback every frame at 60 FPS
setInterval(onInterval, 1000 / 60);
function onInterval(){
    if(typeof player === 'undefined'){console.log("player obj not instantiated, interval callback cancelled"); return;}
    UpdateYoutubePlayerCurrentTime(player.getCurrentTime());
    // console.log("player get current times" + player.getCurrentTime());
}

// Callback every player state change
/*
== Youtube Player state list ==
-1 – unstarted
0 – ended
1 – playing
2 – paused
3 – buffering
5 – video cued
*/
function onPlayerStateChange(){
    // defined on sketch.js
    UpdateYoutubePlayerState(player.getPlayerState());
    // console.log("yt player state changed to: "+player.getPlayerState());
}