export let  animationId = false;
export let  assets = [];


export let  tempEl = false;
export let  canvas = false;
export let  context = false;
export let  timers = {};

// weather params
export const  condition = {
    clouds: true,
    lightning: false,
    rain: true,
    snow: false,
    wind: false
};

export let  spawnedClouds = false;
export let  windSpeed = 30;
export let  windDirection = 120;
export let  temp = 0;
export let  state = 'day';

// rain

// snow
export let  snowColor = '';

export const prefix = 'https://s3.amazonaws.com/gerwins/weather/';
export const  imageAssetsLoaded = false;
export const  imageAssets = {
    'leaf': {
        fileName: prefix + 'weather_leaf.png'
    },
    'cloud_02': {
        fileName: prefix + 'weather_cloud_02.png',
        width: 1792,
        height: 276
    }
};
export const randomRange = function(min, max, round)
{
    round = round === undefined ? true : false;
    var val = Math.random() * (max - min) + min;
    return round ? Math.floor(val) : val;
};
