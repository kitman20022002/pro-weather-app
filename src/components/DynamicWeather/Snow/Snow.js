import randomRange from "../Utility";

class SnowFlake
{
    constructor(canvas,context, windSpeed)
    {
        this.type = 'snow_flake';
        this.width = randomRange(10, 30);
        this.height = this.width;
        this.windSpeed = this.windSpeed;
        this.canvas = canvas;
        this.context = context;

        this.x = randomRange(-200, canvas.width + 200);
        this.y = -30;

        this.xVelocity = (windSpeed - randomRange(0, 10)) / 60;
        this.yVelocity = randomRange(.8, 1.4, false);

        this.opacity = randomRange(.3, .7, false);
        this.settleLength = 500;
        this.settled = 0;
    }

    draw()
    {
        this.y += this.yVelocity;
        this.x += this.xVelocity;

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
        this.context.fill();

        if (this.y > this.canvas.height) {
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.settled++;

            if (this.settled > this.settleLength) {
                return false;
            }
        }

        return true;
    };
};

export default SnowFlake;


