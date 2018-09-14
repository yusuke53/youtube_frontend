import React from 'react';

class DeltaTimeManager {
    constructor() {
        this.deltaTime = 0;
        this.currentTime = this.GetTime();
        this.previousTime = this.GetTime();
    }

    Update() {
        this.currentTime = this.GetTime();
        this.deltaTime = this.currentTime - this.previousTime;

        this.previousTime = this.currentTime;
    }

    GetTime() {
        return new Date().getTime();
    }

    MilliSec2Sec(milli) {
        return milli * 0.001;
    }
}
export default DeltaTimeManager;