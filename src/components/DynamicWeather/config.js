// https://codepen.io/Gerwinnz/pen/RVzrRG

export const animationId = false;
export const assets = [];

export const tempEl = false;
export const canvas = false;
export const context = false;
export const timers = {};

// weather params
export const condition = {
  clouds: true,
  lightning: false,
  rain: true,
  snow: false,
  wind: false,
};

export const spawnedClouds = false;
export const windSpeed = 30;
export const windDirection = 120;
export const temp = 0;
export const state = 'day';

// rain

// snow
export const snowColor = '';

export const prefix = 'https://s3.amazonaws.com/gerwins/weather/';
export const imageAssetsLoaded = false;
export const imageAssets = {
  leaf: {
    fileName: `${prefix}weather_leaf.png`,
  },
  cloud_02: {
    fileName: `${prefix}weather_cloud_02.png`,
    width: 1792,
    height: 276,
  },
};
export const randomRange = function (min, max, round) {
  round = round === undefined;
  const val = Math.random() * (max - min) + min;
  return round ? Math.floor(val) : val;
};
