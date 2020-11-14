import React from "react";

import './DynamicWeather.css';
import Lightning from "./Lighting/Lighting";
import randomRange from "./Utility";
import RainDrop from "./Rain/rainDrop";
import SnowFlake from "./Snow/Snow";
import Cloud from "./Cloud/Cloud";
import BlowingLeaf from "./BlowingLeaf/BlowingLeaf";
import Sun from "./Sun/Sun";

let assets = [];


let canvas = false;
let context = false;
let timers = {};

// weather params
// let condition = {
//     clouds: true,
//     lightning: false,
//     rain: true,
//     snow: false,
//     wind: false
// };

// let spawnedClouds = false;
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


/***********************************/

class DynamicWeather extends React.Component {
    constructor(props) {
        super(props);
        this.weatherMapping = {
            'snow': this.spawnSnow,
            'clear-day': '',
            'partly-cloudy-day': this.spawnCloud,
            'cloudy': this.spawnCloud,
            'clear-night': '',
            'rain': this.spawnRain,
            'other': this.spawnLightning,
            'wind': this.spawnLeaves
        };
    }

    getShowTime(hours) {
        console.log(hours);
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

        const time = this.getShowTime(new Date(this.props.data.currently.time).getUTCHours());
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
        //spawnedClouds = false;

        // clear assets
        for (let i = 0, n = assets.length; i < n; i++) {
            assets.splice(i, 1);
            n--;
            i--;
        }

        // start spawning
        this.beginSpawning();
    };


    spawnLightning = () => {
        var rand = randomRange(0, 10);
        if (rand > 7) {
            timers.secondFlash = setTimeout(function () {
                assets.push(new Lightning(canvas, context));
            }, 200);
        }
        assets.push(new Lightning(canvas, context));
        timers.lightning = setTimeout(this.spawnLightning, randomRange(500, 7000));
    };

    spawnRain = () => {
        timers.rain = setInterval(function () {
            assets.push(new RainDrop(canvas, context));
        }, 60);
    };

    spawnSnow = () => {
        timers.snow = setInterval(function () {
            assets.push(new SnowFlake(canvas, context, 1));
        }, 250);
    };

    spawnCloud = () => {
        assets.push(new Cloud({x: -400}, canvas, context, 1, imageAssets));
        assets.push(new Cloud({x: 700}, canvas, context, 1, imageAssets));
        assets.push(new Cloud({x: 1400}, canvas, context, 1, imageAssets));
    };

    spawnLeaves = () => {
        for (let i = 0, n = randomRange(0, 3); i < n; i++) {
            assets.push(new BlowingLeaf(canvas, context, imageAssets, 1));
        }
        timers.wind = setTimeout(this.spawnLeaves, randomRange(500, 1500));
    };

    spawnSun() {
        assets.push(new Sun(canvas, context));
    }

    beginSpawning = () => {
        this.animate();

        // this.weatherMapping[this.props.icon]();
        this.spawnSun();
        //this.spawnSnow();
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
