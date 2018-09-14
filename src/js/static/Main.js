import React from 'react';

class Main{
    ///////////////////////////////////////////
    // === Init ===
    ///////////////////////////////////////////
    constructor(keyword_, vId_){
        this.Init(keyword_, vId_);
    }

    Init(keyword_, vId_){
        //from back end (java)
        this.keyword = keyword_;
        this.vId = vId_;

        //youtube player state
        var ytState = -1;

        //milli sec since starting this obj (milli sec)
        this.time = 0;

        //youtube player current time (sec)
        this.ytPlayerTime = 0;

        //delta time manager
        this.deltaTimeMgr = new DeltaTimeManager();

        //phrase manager
        this.phraseManager = new PhraseManager(this.keyword);
    }

    ///////////////////////////////////////////
    // === Update ===
    ///////////////////////////////////////////
    Update(){
        this.UpdateTime();

        this.phraseManager.Update(this.deltaTimeMgr.MilliSec2Sec(this.time), this.ytPlayerTime);
    }

    UpdateTime(){
        this.deltaTimeMgr.Update();
        this.time += this.deltaTimeMgr.deltaTime;
    }

    ///////////////////////////////////////////
    // === Draw ===
    ///////////////////////////////////////////
    Draw(){
        // fill(255);
        // ellipse(mouseX, mouseY, 20, 20);
        // text("time: "+this.time, 50, height * 0.7);
        // text("ytPlayerTime: "+this.ytPlayerTime, 50, height * 0.8);
        // text("ytState: "+this.ytState, 50, height * 0.9);

        this.phraseManager.Draw();
    }

    ///////////////////////////////////////////
    // === Getter and Setter ===
    ///////////////////////////////////////////
    /*
    == Youtube Player state list ==
    -1 – unstarted
    0 – ended
    1 – playing
    2 – paused
    3 – buffering
    5 – video cued
    */
    SetYtState(val){
        // console.log("Main.js received yt player state as: " + val);
        this.ytState = val;
    }

    SetYtPlayerTime(val){
        // console.log("Main.js received yt player time as: " + val);
        this.ytPlayerTime = val;
    }

    //used in sketch.js ajax call (Init())
    SetSubs(val){
        console.log("subs set to Main.js");
        this.subs = JSON.parse(val);
        console.log(this.subs);

    }
}
export default Main;