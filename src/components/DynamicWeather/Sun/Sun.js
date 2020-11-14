import randomRange from "../Utility";

class Sun {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.y = 300;
        this.yVelocity = 1;
    }

    draw = function () {
        if (this.y > 0) {
            this.y -= this.yVelocity;
        }

        this.context.beginPath();
        this.context.arc(0, this.y, 50, 0, 2 * Math.PI);
        this.context.fillStyle = 'rgba(243, 210, 1, ' + 1 + ')';
        this.context.fill();

        return true;
    };
}

export default Sun;
