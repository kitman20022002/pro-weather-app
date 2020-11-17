class Sun {
    constructor(canvas, context, y) {
        this.canvas = canvas;
        this.context = context;
        this.y = y;
        this.yVelocity = 5;
    }

    draw = function () {
        if (this.y > 0) {
            this.y -= this.yVelocity;
        }

        this.context.beginPath();
        this.context.arc(0, this.y, 100, 0, 50 * Math.PI);
        this.context.fillStyle = 'rgba(243, 210, 1, ' + 1 + ')';
        this.context.fill();

        return true;
    };
}

export default Sun;
