///////////////////////////////////////////
// === Variable Declaration ===
///////////////////////////////////////////
var main;
var canvas;

//subs
var subs = '';
var keyword = _keyword;
var vId = videoId;

///////////////////////////////////////////
// === p5js Main ===
///////////////////////////////////////////
function setup(){
    // === main ===
    InitCanvas();
    Init();
}

function draw(){
    // === exception handling ===
    if(subs == ''){console.log("sketch.js: waiting for subs loaded by ajax call..."); return;}

    // === main ===
    Update();
    Flip();
    Draw();
}

///////////////////////////////////////////
// === Main ===
///////////////////////////////////////////
/* === Required DOM structure ===
    <div id="video-wrapper">
        <!-- youtube player -->
        <div id="player"></div>
        <script th:src="youtubeHandler.js"></script>
        <!-- p5js sketch -->
        <div id="sketch-holder"></div>
    </div>
*/
function InitCanvas(){
    //create canvas
    var playerElement = document.getElementById("player");
    var canvasSize = createVector(playerElement.offsetWidth, playerElement.offsetHeight * 0.925);
    canvas = createCanvas(canvasSize.x, canvasSize.y);

    //insert this sketch where 'sketch-holder' id is located
    canvas.parent("sketch-holder");

    //modify video-wrapper style (position relative)
    var videoWrapperElement = document.getElementById("video-wrapper");
    videoWrapperElement.setAttribute("style", "position: relative;");

    //modify canvas style (adjust the position)
    var canvasElement = document.getElementById("sketch-holder");
    canvasElement.setAttribute("style", "position: absolute; top: " + 0 + "px; left: 0;");
}

function Init(){
    //instantiate Main class
    main = new Main();
    main.Init(keyword, vId);

    //ajax to get the full subtitles
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log("sketch.js: ajax went right!!! (you prob saw ERR but no worries)");

            subs = this.responseText;
            main.SetSubs(subs);
            main.phraseManager.SetSubs(subs);
        }
        else{
            console.log("sketch.js: ERR> ajax went wronnnnnnnnnnng. "+"readyState:"+this.readyState+" status:"+this.status);
        }
    };
    xhr.open("GET", "http://localhost:8080/api/subtitle?v="+vId, true);
    xhr.send();
}

function Update(){
    main.Update();
}

function Flip(){
    clear();
    background(255, 0, 0, 0);
}

function Draw(){
    main.Draw();
}


//////////////////////////////////////////////
// === Communication w/ youtubeHandler.js ===
//////////////////////////////////////////////
/*
== Youtube Player state list ==
-1 – unstarted
0 – ended
1 – playing
2 – paused
3 – buffering
5 – video cued
*/
function UpdateYoutubePlayerState(state){
    console.log("sketch.js received yt player state as: " + state);
    if(main == null){
        console.log("Main obj is not ready for receiving: " + state);
    }
    else{
        main.SetYtState(state);
    }
}

function UpdateYoutubePlayerCurrentTime(time){
    // console.log("sketch.js received yt player time as: " + time);
    if(main == null){
        console.log("Main obj is not ready for receiving: " + time);
    }
    else{
        main.SetYtPlayerTime(time);
    }
}