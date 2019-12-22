import React from "react";

import './DynamicWeather.css';
import RainDrop from "./Rain/RainDrop";
import Lightning from "./Lighting/Lighting";
import randomRange from "./Utility";

let assets = [];


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
// let windSpeed = 30;
// let windDirection = 120;
// let temp = 0;
// let state = 'day';



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


const weatherMapping = {
    'clear-day': '',
    'partly-cloudy-day': 'cloud',
    'cloudy': 'cloud',
    'clear-night': '',
};

/***********************************/

class DynamicWeather extends React.Component {
    getShowTime(hours) {
        if (hours === 6) {
            return 'sunrise';
        } else if (hours === 18) {
            return 'sunset';
        } else if (hours > 6 && hours < 18) {
            return 'day';
        } else {
            return 'night';
        }
    }

    componentDidMount() {

        const time = this.getShowTime(new Date(1569328703).getHours());
        canvas = this.refs.canvas;
        context = canvas.getContext("2d");
        canvas.className = "canvas " + time;

        let self = this;
        this.preLoadImageAssets(function () {
            self.setConditionReady();
        });
        self.setConditionReady();

    }

    preLoadImageAssets = (callback) => {
        var imageAssetsCount = 0;
        var imageAssetsLoadedCount = 0;

        if (imageAssetsLoaded) {
            if (callback) {
                callback();
            }
            return;
        }

        var loadedHandler = function () {
            imageAssetsLoadedCount++;
            if (imageAssetsLoadedCount === imageAssetsCount) {
                imageAssetsLoaded = true;
                if (callback) {
                    callback();
                }
            }
        };

        for (var imageAssetName in imageAssets) {
            var imageAsset = imageAssets[imageAssetName];
            imageAssetsCount++;
            imageAsset.image = new Image();
            imageAsset.image.onload = loadedHandler;
            imageAsset.image.src = imageAsset.fileName;
        }
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
        //
        // timers.rain = setInterval(function () {
        //     assets.push(new RainDrop(canvas, context));
        // }, 60);

        // timers.snow = setInterval(function()
        // {
        //     assets.push(new SnowFlake(canvas, context, windSpeed));
        // }, 250);


        var spawnLightning = function()
        {
            var rand = randomRange(0, 10);
            if(rand > 7)
            {
                timers.secondFlash = setTimeout(function()
                {
                    assets.push(new Lightning(canvas,context));
                }, 200);
            }
            assets.push(new Lightning(canvas,context));
            timers.lightning = setTimeout(spawnLightning, randomRange(500, 7000));
        };

        spawnLightning();


        // assets.push(new Cloud({x: -400}, canvas, context, windSpeed, imageAssets));
        // assets.push(new Cloud({x: 700}, canvas, context, windSpeed, imageAssets));
        // assets.push(new Cloud({x: 1400}, canvas, context, windSpeed, imageAssets));

        // var spawnLeaves = function()
        // {
        //     for(var i = 0, n = randomRange(0, 3); i < n; i ++)
        //     {
        //         assets.push(new BlowingLeaf(canvas, context, imageAssets, windSpeed ));
        //     }
        //
        //     timers.wind = setTimeout(spawnLeaves, randomRange(500, 1500));
        // };
        //
        // spawnLeaves();
        //
        //
        // spawnedClouds = true;
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
        window.requestAnimationFrame(this.animate);
    };

    render() {

        return (
            <canvas ref="canvas" width="600" height={this.props.height} id="canvas" className="canvas night"/>
        );
    }
}

export default DynamicWeather;
