import React from 'react';

import './DynamicWeather.css';
import moment from 'moment';
import Lightning from './Lighting/Lighting';
import randomRange from './Utility';
import Rain from './Rain/Rain';
import SnowFlake from './Snow/Snow';
import Cloud from './Cloud/Cloud';
import BlowingLeaf from './BlowingLeaf/BlowingLeaf';
import Sun from './Sun/Sun';

const assets = [];

let canvas = false;
let context = false;
const timers = {};

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

const prefix = 'https://s3.amazonaws.com/gerwins/weather/';
let imageAssetsLoaded = false;
const imageAssets = {
  leaf: {
    fileName: `${prefix}weather_leaf.png`,
  },
  cloud_02: {
    fileName: `${prefix}weather_cloud_02.png`,
    width: 1792,
    height: 276,
  },
};

/** ******************************** */

class DynamicWeather extends React.Component {
  constructor(props) {
    super(props);
    this.weatherMapping = {
      snow: this.spawnSnow,
      'clear-day': [this.spawnSun],
      'partly-cloudy-day': [this.spawnSun, this.spawnCloud],
      'partly-cloudy-night': [this.spawnSun, this.spawnCloud],
      cloudy: [this.spawnCloud],
      'clear-night': [this.spawnSun, this.spawnCloud],
      rain: [this.spawnRain],
      other: [this.spawnLightning],
      wind: [this.spawnLeaves],
    };
  }

  componentDidMount() {
    const { data } = this.props;

    const time = this.getShowTime(moment.unix(data.currently.time).format('H'));

    canvas = this.refs.canvas;
    context = canvas.getContext('2d');
    canvas.className = `canvas ${time} fade-in`;

    const self = this;
    this.preLoadImageAssets(() => {
      self.setConditionReady();
    });
    self.setConditionReady();
  }

  getShowTime(hours) {
    hours = parseInt(hours, 10);
    if (hours === 6) {
      return 'sunrise';
    }
    if (hours === 18) {
      return 'sunset';
    }
    if (hours > 6 && hours < 18) {
      return 'day';
    }
    return 'night';
  }

  preLoadImageAssets = (callback) => {
    let imageAssetsCount = 0;
    let imageAssetsLoadedCount = 0;

    if (imageAssetsLoaded) {
      if (callback) {
        callback();
      }
      return;
    }

    const loadedHandler = () => {
      imageAssetsLoadedCount += 1;
      if (imageAssetsLoadedCount === imageAssetsCount) {
        imageAssetsLoaded = true;
        if (callback) {
          callback();
        }
      }
    };

    for (const imageAssetName in imageAssets) {
      const imageAsset = imageAssets[imageAssetName];
      imageAssetsCount += 1;
      imageAsset.image = new Image();
      imageAsset.image.onload = loadedHandler;
      imageAsset.image.src = imageAsset.fileName;
    }
  };

  pause = () => {};

  setConditionReady = () => {
    // stop spawning
    this.pause();
    // clear assets
    for (let i = 0, n = assets.length; i < n; i++) {
      assets.splice(i, 1);
      n -= 1;
      i -= 1;
    }
    // start spawning
    this.beginSpawning();
  };

  spawnLightning = () => {
    const rand = randomRange(0, 10);
    if (rand > 7) {
      timers.secondFlash = setTimeout(() => {
        assets.push(new Lightning(canvas, context));
      }, 200);
    }
    assets.push(new Lightning(canvas, context));
    timers.lightning = setTimeout(this.spawnLightning, randomRange(500, 7000));
  };

  spawnRain = () => {
    timers.rain = setInterval(() => {
      assets.push(new Rain(canvas, context));
    }, 60);
  };

  spawnSnow = () => {
    timers.snow = setInterval(() => {
      assets.push(new SnowFlake(canvas, context, 1));
    }, 250);
  };

  spawnCloud = () => {
    assets.push(new Cloud({ x: -400 }, canvas, context, 1, imageAssets));
    assets.push(new Cloud({ x: 700 }, canvas, context, 1, imageAssets));
    assets.push(new Cloud({ x: 1400 }, canvas, context, 1, imageAssets));
  };

  spawnLeaves = () => {
    for (let i = 0, n = randomRange(0, 3); i < n; i += 1) {
      assets.push(new BlowingLeaf(canvas, context, imageAssets, 1));
    }
    timers.wind = setTimeout(this.spawnLeaves, randomRange(500, 1500));
  };

  spawnSun() {
    assets.push(new Sun(canvas, context, 700));
  }

  beginSpawning = () => {
    this.animate();
    this.spawnCloud();
    this.spawnSun();

    const weather = this.weatherMapping[this.props.data.currently.icon];
    for (let i = 0, n = weather.length; i < n; i += 1) {
      weather[i]();
    }
  };

  animate = () => {
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);
    // draw each asset, if false, remove particle from assets
    for (let i = 0, n = assets.length; i < n; i += 1) {
      if (!assets[i].draw()) {
        assets.splice(i, 1);
        n -= 1;
        i -= 1;
      }
    }

    window.requestAnimationFrame(this.animate);
  };

  render() {
    const { width, height } = this.props;
    return (
      <canvas ref="canvas" width={width} height={height} id="canvas" className="canvas night" />
    );
  }
}

export default DynamicWeather;
