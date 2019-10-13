import * as  config from '../config';


var randomRange = function (min, max, round) {
    round = round === undefined ? true : false;
    var val = Math.random() * (max - min) + min;
    return round ? Math.floor(val) : val;
};


var splashDrop = function (x) {
    this.type = 'splash_drop';
    this.width = 3;
    this.height = 3;

    this.x = x;
    this.y = config.canvas.height;

    this.yVelocity = randomRange(-1, -3, false);
    this.xVelocity = randomRange(-2, 2, false);

    this.age = 0;
    this.maxAge = 30;
};

splashDrop.prototype.draw = function () {
    this.y += this.yVelocity;
    this.x += this.xVelocity;

    config.context.fillStyle = config.rainColor;
    config.context.fillRect(this.x, this.y, this.width, this.height);

    this.yVelocity += 0.1;

    this.age++;
    if (this.age > this.maxAge) {
        return false;
    }

    return true;
};

class rainDrop {
    constructor() {
        this.type = 'rain_drop';
        this.width = 3;
        this.height = randomRange(15, 25);

        this.x = randomRange(0, config.canvas.width);
        this.y = -10;

        this.xVelocity = 0;
        this.yVelocity = 8;
    }

    draw() {
        this.y += this.yVelocity;
        config.context.fillStyle = config.rainColor;
        config.context.fillRect(this.x, this.y, this.width, this.height);
        if (this.y > config.canvas.height) {
            // occasionally, make a splash!
            if (Math.floor(Math.random() * 10) > 7) {
                for (var i = 0, n = randomRange(3, 5); i < n; i++) {
                    config.assets.push(new splashDrop(this.x));
                }
            }
            return false;
        }

        return true;
    };
}

export default rainDrop;
