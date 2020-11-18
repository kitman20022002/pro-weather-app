import randomRange from "../Utility";

class Cloud {
    constructor(options, canvas, context, windSpeed, imageAssets) {
        this.windSpeed = windSpeed;
        this.canvas = canvas;
        this.context = context;
        this.options = options;


        this.type = 'cloud';
        this.img = options.img || imageAssets.cloud_02;

        this.width = this.img.width; //randomRange(200, 500);
        this.height = this.img.height; //50;

        var max = 10;
        this.xVelocity = (windSpeed - randomRange(0, max)) / 60;
        this.yVelocity = 0;

        this.x = options.x || randomRange(-100, canvas.width + 100);
        this.y = randomRange(0 - (this.height / 2), -60);

    }

    draw = function () {
        this.x += this.xVelocity;
        this.context.drawImage(this.img.image, 0, 0, this.img.width, this.img.height, this.x, this.y, this.img.width, this.img.height);
        if (this.xVelocity > 0) {
            // >>>
            if (this.x > this.canvas.width) {
                this.x = 0 - this.width;
            }
        }
        else {
            // <<<
            if (this.x < 0 - this.width) {
                this.x = this.canvas.width;
            }
        }


        return true;
    };

};

export default Cloud;
