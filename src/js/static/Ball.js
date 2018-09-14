import React from 'react';

class Ball{
    constructor(x, y, bSize, bColor, mass){
        this.Init(x, y, bSize, bColor, mass);
    }

    Init(x, y, bSize, bColor, mass){
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.bSize = bSize;
        this.bColor = bColor;
        this.mass = mass;

        this.gravity = createVector(0, 0.3);

        this.t = 0;
    }

    Update(){
        this.t++;

        this.ApplyForce(this.gravity);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    Draw(){
        fill(this.bColor);
        stroke(this.bColor);
        ellipse(this.position.x, this.position.y, this.bSize, this.bSize);
        stroke(0); //reset stroke just in case
    }

    ApplyForce(force){
        force.div(this.mass);
        this.acceleration.add(force);
    }

    ApplyRandomForce(){
        var horizontalRange = 7, verticalRange = 8;
        var force = createVector(random(-horizontalRange, horizontalRange), random(-verticalRange, 0));
        force.div(this.mass);
        this.acceleration.add(force);
    }
}

export default Ball;