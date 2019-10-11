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


class DynamicWeather extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
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


        let cityEl = '';
        let tempEl = '';


        let updateConditions = function (event) {

        };


        cityEl = 'Loading clouds...';
        this.preLoadImageAssets(function () {
            cityEl = 'Dunedin, New Zealand';
            tempEl = '3&deg;';
            // this.setConditionReady();
        });

        return (
            <canvas ref="canvas" width="600" height="350" id="canvas" className="canvas day"/>
        );
    }
}

export default DynamicWeather;
