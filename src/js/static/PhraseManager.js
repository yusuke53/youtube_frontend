import React from 'react';

///////////////////////////////////////////
// === Const Declaration ==
///////////////////////////////////////////
const MYSHMEH_OUT_OF_INDEX = -1;
const BALL_NUM = 30;
const BALL_TIMEOUT = 150;

class PhraseManager{
    ///////////////////////////////////////////
    // === Init ===
    ///////////////////////////////////////////
    constructor(keyword){
        this.Init(keyword);
    }

    Init(keyword){
        this.indexSubs = -1;
        this.indexSubsPrev = -1;
        this.keyword = keyword;
        this.subs = '';

        this.txtColor = color(255);
        this.txtColorEmp = color(255, 120, 120);
        this.txtSize = 24;

        this.txtLayerColor = color(0, 0, 0, 190);

        this.balls = [];
    }

    ///////////////////////////////////////////
    // === Update ===
    ///////////////////////////////////////////
    Update(time, ytPlayerTime){
        this.indexSubsPrev = this.indexSubs;
        this.indexSubs = this.GetCurrentSub(this.subs, ytPlayerTime);

        //update balls only if there is any
        if(typeof this.balls !== 'undefined' && this.balls.length > 0){
            this.UpdateBalls();
        }

        //exception handling
        if(this.indexSubs == this.indexSubsPrev) return;

        //trigger down below right at the moment subs[index].text has keyword, once
        var regex = new RegExp('[\W]*'+this.keyword+'[\W]*');
        if(typeof this.subs[this.indexSubs] !== 'undefined' && this.subs[this.indexSubs].text.toLowerCase().match(regex) != null) {
            //trigger code here
            this.OnKeywordDetected();
            console.log("PhraseMgr: keyword found triggered!");
        }
    }

    OnKeywordDetected(){
        //instantiate balls
        for(var i=0; i<BALL_NUM; i++){
            this.balls[i] = new Ball(
                random(width * 0.2, width * 0.8), random(height * 0.7, height * 0.9),
                random(7, 30), color( random(125, 255), random(125, 255), random(125, 255) ),
                1
            );
            this.balls[i].ApplyRandomForce();
        }
    }

    UpdateBalls(){
        for(var i=0; i<this.balls.length; i++){
            this.balls[i].Update();

            //remove balls[i] is existing too long
            if(this.balls[i].t > BALL_TIMEOUT){
                this.balls.splice(i, 1);
                console.log("balls["+i+"] is removed");
            }
        }
    }

    //use case >> yttime: 10.5, subs.starts{0, 10, 12, 20};
    GetCurrentSub(subs, ytPlayerTime){
        for(var i=0; i<subs.length; i++){
            if(ytPlayerTime >= subs[i].start) continue;
            return (i - 1);
        }
        return subs.length-1;

        // == trying to be cool here, but not working great p(@.@) ==
        // var i = 0;
        // while( (typeof subs[i] !== 'undefined') && (ytPlayerTime >= subs[i++].start) );
        // return (i-1) - 1;
    }

    ///////////////////////////////////////////
    // === Draw ===
    ///////////////////////////////////////////
    Draw(){
        // === exception handling ===
        if(this.indexSubs == MYSHMEH_OUT_OF_INDEX) return;

        // === define some funcs ===
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };

        // === render main ===
        this.DrawTextBox();

        // === render original text (DEL IN PRODUCTION) ===

        // === render balls if any ===
        if(typeof this.balls !== 'undefined' && this.balls.length > 0){
            this.DrawBalls();
        }
    }

    DrawBalls(){
        for(var i=0; i<this.balls.length; i++){
            this.balls[i].Draw();
        }
    }

    DrawTextBox(){
        // === settings ===
        textSize(this.txtSize);

        // === main ===
        var words = this.subs[this.indexSubs].text.split(" ");
        var initPosition = createVector(width * 0.225, height * 0.9), position = initPosition;

        //draw text box
        fill(this.txtLayerColor);
        stroke(this.txtLayerColor);
        rect(0, initPosition.y - 60, width, 95);
        stroke(0);

        //draw text
        for(var i=0; i<words.length; i++){
            //pass words element to w
            var w = words[i];

            //set color if w is matched to keyword (lowercasesd)
            var regex = new RegExp('[\W]*'+this.keyword+'[\W]*');
            if(w.toLowerCase().match(regex) != null) {
                fill(this.txtColorEmp);
                textSize(this.txtSize*2);
                textStyle(BOLD);
            }
            else{
                fill(this.txtColor);
                textSize(this.txtSize);
                textStyle(NORMAL);
            }

            //cut off all the weird wording bug
            regex = /[^a-zA-Z0-9\!\?\(\)\"\'\&\,\.)\s]+/;
            var formattedW = w.replaceAll(regex, '');

            //render word
            text(formattedW, position.x, position.y);

            //update position
            position.x += textWidth(formattedW); //make space in text width of w
            position.x += textWidth(" "); //make sure to keep spaced between the words
        }
    }

    DrawDebug(){
        fill(0, 255, 0);
        text("ORIGINAL:", 50, height * 0.18);
        text(this.subs[this.indexSubs].text, 50, height * 0.25);
    }

    ///////////////////////////////////////////
    // === Getter and Setter ===
    ///////////////////////////////////////////
    //used in sketch.js ajax call (Init())
    SetSubs(val){
        console.log("subs set to PhraseManager.js");
        this.subs = JSON.parse(val);
        console.log(this.subs);

    }
}
export default PhraseManager;