import React from "react";

import './DynamicWeather.css';

let animationId = false;
let assets = [];


let tempEl = false;
let canvas = false;
let context = false;
let timers = {};

// weather params
let condition = {
    clouds: true,
    lightning: false,
    rain: true,
    snow: false,
    wind: false
};

let spawnedClouds = false;
let windSpeed = 30;
let windDirection = 120;
let temp = 0;
let state = 'day';

// rain
let rainColor = 'rgba(255, 255, 255, .4)';

// snow
let snowColor = '';

let prefix = 'https://s3.amazonaws.com/gerwins/weather/';
let imageAssetsLoaded = false;
let imageAssets = {
    'leaf': {
        fileName: prefix + 'weather_leaf.png'
    },
    'cloud_02': {
        fileName: prefix + 'weather_cloud_02.png',
        width: 1792,
        height: 276
    }
};

// var randomRange = function(min, max, round)
// {
//     round = round === undefined ? true : false;
//     var val = Math.random() * (max - min) + min;
//     return round ? Math.floor(val) : val;
// };
//
// var rainDrop = function()
// {
//     this.type = 'rain_drop';
//     this.width = 3;
//     this.height = randomRange(15, 25);
//
//     this.x = randomRange(0, canvas.width);
//     this.y = -10;
//
//     this.xVelocity = 0;
//     this.yVelocity = 8;
// };
//
// rainDrop.prototype.draw = function()
// {
//     this.y += this.yVelocity;
//     context.fillStyle = rainColor;
//     context.fillRect(this.x, this.y, this.width, this.height);
//     return true;
// };




var snowFlake = function()
{
    this.type = 'snow_flake';
    this.width = randomRange(10, 30);
    this.height = this.width;

    this.x = randomRange(-200, canvas.width + 200);
    this.y = -30;

    this.xVelocity = (windSpeed - randomRange(0, 10)) / 60;
    this.yVelocity = randomRange(.8, 1.4, false);

    this.opacity = randomRange(.3, .7, false);
    this.settleLength = 500;
    this.settled = 0;
};

snowFlake.prototype.draw = function()
{
    this.y += this.yVelocity;
    this.x += this.xVelocity;

    context.beginPath();
    context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI, false);
    context.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    context.fill();

    if(this.y > canvas.height)
    {
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.settled ++;

        if(this.settled > this.settleLength)
        {
            return false;
        }
    }

    return true;
};

/************************************/
/*
|
| Lightning particle
|
*/
var lightning = function()
{
    this.type = 'lightning';
    this.x = randomRange(0, canvas.width);
    this.age = 0;
    this.life = 20;
    this.drawFrom = 0;
    this.drawTo = 0;
    this.points = [
        [this.x, 0]
    ];
    this.totalPoints = 0;
    this.opacity = .7;

    this.flashed = false;
    this.flashOpacity = 0;

    var nextPointX = 0;
    var nextPointY = 0;
    while(nextPointY < canvas.height)
    {
        var lastPoint = this.points[this.points.length - 1];
        nextPointX = lastPoint[0] > this.x ? randomRange(this.x, this.x + 15) : randomRange(this.x + 15, this.x);
        nextPointY = lastPoint[1] + randomRange(10, 50);

        if(nextPointY > canvas.height)
        {
            nextPointY = canvas.height;
        }

        this.totalPoints ++;
        this.points.push([nextPointX, nextPointY]);
    }
};

lightning.prototype.draw = function()
{
    if(this.drawTo < this.points.length)
    {
        this.drawTo = this.drawTo + 2;
        if(this.drawTo > this.points.length)
        {
            this.drawTo = this.points.length;
        }
    }
    else
    {
        this.opacity = this.opacity - .02;

        if(!this.flashed)
        {
            this.flashed = true;
            this.flashOpacity = 1;
        }
    }

    if(this.opacity < 0)
    {
        return false;
    }

    if(this.flashOpacity > 0)
    {
        context.fillStyle = 'rgba(255, 255, 255, ' + this.flashOpacity + ')';
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.flashOpacity = this.flashOpacity - .1;
    }

    context.beginPath();
    context.moveTo(this.points[this.drawFrom][0], this.points[this.drawFrom][1]);

    for(var i = this.drawFrom; i < this.drawTo; i ++)
    {
        context.lineTo(this.points[i][0], this.points[i][1]);
    }

    context.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    context.lineWidth = 3;
    context.stroke();

    return true;
};

/***********************************/



class DynamicWeather extends React.Component {
    componentDidMount() {
        canvas = this.refs.canvas;
        context = canvas.getContext("2d");

        let cityEl = '';
        let tempEl = '';


        let updateConditions = function (event) {

        };


        cityEl = 'Loading clouds...';
        let self = this;
        this.preLoadImageAssets(function () {
            cityEl = 'Dunedin, New Zealand';
            tempEl = '3&deg;';
            self.setConditionReady();
        });
    }

    preLoadImageAssets = (callback) => {
        callback();
    };


    pause = () => {

    };

    setConditionReady = () => {
        // stop spawning
        this.pause();

        // clear flags
        spawnedClouds = false;

        // clear assets
        for (let i = 0, n = assets.length; i < n; i++) {
            assets.splice(i, 1);
            n--;
            i--;
        }

        // start spawning
        this.beginSpawning();
    };

    beginSpawning = () => {
        this.animate();

        // timers.rain = setInterval(function()
        // {
        //     assets.push(new rainDrop());
        // }, 60);

        // timers.snow = setInterval(function()
        // {
        //     assets.push(new snowFlake());
        // }, 250);


        var spawnLightning = function()
        {
            var rand = randomRange(0, 10);
            if(rand > 7)
            {
                timers.secondFlash = setTimeout(function()
                {
                    assets.push(new lightning());
                }, 200);
            }
            assets.push(new lightning());
            timers.lightning = setTimeout(spawnLightning, randomRange(500, 7000));
        };

        spawnLightning();
    };

    animate = () => {
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw each asset, if false, remove particle from assets
        for (let i = 0, n = assets.length; i < n; i++) {
            if (!assets[i].draw()) {
                assets.splice(i, 1);
                n--;
                i--;
            }
        }

        // continue
        animationId = window.requestAnimationFrame(this.animate);
    };

    render() {




        return (
            <canvas ref="canvas" width="600" height="350" id="canvas" className="canvas day"/>
        );
    }
}

export default DynamicWeather;
